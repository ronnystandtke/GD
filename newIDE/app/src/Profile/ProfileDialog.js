// @flow

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from '../UI/Dialog';
import { Column } from '../UI/Grid';
import CreateProfile from './CreateProfile';
import ProfileDetails from './ProfileDetails';
import EmptyMessage from '../UI/EmptyMessage';
import HelpButton from '../UI/HelpButton';
import UsagesDetails from './UsagesDetails';
import SubscriptionDetails from './SubscriptionDetails';
import {
  withUserProfile,
  type WithUserProfileProps,
} from './UserProfileContainer';
import LimitDisplayer from './LimitDisplayer';

type Props = {|
  open: boolean,
  onClose: Function,
  onChangeSubscription: Function,
|} & WithUserProfileProps;

type State = {|
  currentTab: string,
|};

class ProfileDialog extends Component<Props, State> {
  state = {
    currentTab: 'profile',
  };

  _onChangeTab = (newTab: string) =>
    this.setState({
      currentTab: newTab,
    });

  _onChangeSubscription = () => {
    const { onChangeSubscription, onRefreshUserProfile } = this.props;

    onChangeSubscription(() => {
      onRefreshUserProfile();
    });
  };

  render() {
    const {
      authenticated,
      profile,
      usages,
      subscription,
      limits,
      open,
      onClose,
      onLogout,
      onLogin,
    } = this.props;
    const actions = [
      <FlatButton
        label="Close"
        key="close"
        primary={false}
        onClick={onClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        secondaryActions={[
          <HelpButton key="help" helpPagePath="/interface/profile" />,
          authenticated &&
            profile && (
              <FlatButton label="Logout" key="logout" onClick={onLogout} />
            ),
        ]}
        onRequestClose={onClose}
        open={open}
        noMargin
        autoScrollBodyContent
      >
        <Tabs value={this.state.currentTab} onChange={this._onChangeTab}>
          <Tab label="My Profile" value="profile">
            {authenticated ? (
              <Column noMargin>
                <ProfileDetails profile={profile} />
                <SubscriptionDetails
                  subscription={subscription}
                  onChangeSubscription={this._onChangeSubscription}
                />
              </Column>
            ) : (
              <Column>
                <CreateProfile onLogin={onLogin} />
              </Column>
            )}
          </Tab>
          <Tab label="Online services usage" value="usage">
            {authenticated ? (
              <Column noMargin>
                <Column>
                  <LimitDisplayer
                    subscription={subscription}
                    limit={limits ? limits['cordova-build'] : null}
                    onChangeSubscription={this._onChangeSubscription}
                  />
                </Column>
                <UsagesDetails usages={usages} />
              </Column>
            ) : (
              <EmptyMessage>
                Register to see the usage that you've made of the online
                services
              </EmptyMessage>
            )}
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

export default withUserProfile({
  fetchUsages: true,
  fetchLimits: true,
  fetchSubscription: true,
})(ProfileDialog);
