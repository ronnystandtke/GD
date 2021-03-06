import React, { Component } from 'react';
import Dialog from '../UI/Dialog';
import HelpButton from '../UI/HelpButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  icon: { width: 40, height: 40 },
  disabledItem: { opacity: 0.6 },
  content: { padding: 24 },
};

export default class ExportDialog extends Component {
  state = {
    chosenExporterKey: '',
    showExperimental: false,
  };

  chooseExporter = key => {
    this.setState({
      chosenExporterKey: key,
    });
  };

  _showExperimental = (show = true) => {
    this.setState({
      showExperimental: show,
    });
  };

  _renderExporterListItem = (exporter, index) => {
    return (
      <ListItem
        key={exporter.key}
        disabled={exporter.disabled}
        style={exporter.disabled ? styles.disabledItem : undefined}
        leftAvatar={exporter.renderIcon({ style: styles.icon })}
        primaryText={exporter.name}
        secondaryText={<p>{exporter.description}</p>}
        secondaryTextLines={2}
        onClick={() => this.chooseExporter(exporter.key)}
      />
    );
  };

  render() {
    const {
      project,
      open,
      onClose,
      authentification,
      onChangeSubscription,
      exporters,
    } = this.props;
    const { showExperimental, chosenExporterKey } = this.state;
    if (!open || !project) return null;

    const exporter = exporters.find(
      exporter => exporter.key === chosenExporterKey
    );

    return (
      <Dialog
        title="Export project to a standalone game"
        onRequestClose={onClose}
        actions={[
          chosenExporterKey && (
            <FlatButton
              label="Back"
              key="back"
              primary={false}
              onClick={() => this.chooseExporter('')}
            />
          ),
          <FlatButton
            label="Close"
            key="close"
            primary={false}
            onClick={onClose}
          />,
        ]}
        secondaryActions={[
          <HelpButton
            key="help"
            helpPagePath={(exporter && exporter.helpPage) || '/publishing'}
          />,
          !chosenExporterKey &&
            (!showExperimental ? (
              <FlatButton
                key="toggle-experimental"
                icon={<Visibility />}
                primary={false}
                onClick={() => this._showExperimental(true)}
                label="Show experimental exports"
              />
            ) : (
              <FlatButton
                key="toggle-experimental"
                icon={<VisibilityOff />}
                primary={false}
                onClick={() => this._showExperimental(false)}
                label="Hide experimental exports"
              />
            )),
        ]}
        open={open}
        noMargin
        autoScrollBodyContent
      >
        {!exporter && (
          <List>
            {exporters
              .filter(exporter => !exporter.advanced && !exporter.experimental)
              .map((exporter, index) =>
                this._renderExporterListItem(exporter, index)
              )}

            <Subheader>Advanced</Subheader>
            {exporters
              .filter(exporter => exporter.advanced)
              .map((exporter, index) =>
                this._renderExporterListItem(exporter, index)
              )}

            {showExperimental && <Subheader>Experimental</Subheader>}
            {showExperimental &&
              exporters
                .filter(exporter => exporter.experimental)
                .map((exporter, index) =>
                  this._renderExporterListItem(exporter, index)
                )}
          </List>
        )}
        {exporter && (
          <div style={styles.content}>
            <exporter.ExportComponent
              project={project}
              authentification={authentification}
              onChangeSubscription={onChangeSubscription}
            />
          </div>
        )}
      </Dialog>
    );
  }
}
