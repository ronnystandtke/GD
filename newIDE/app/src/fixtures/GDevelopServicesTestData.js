// @flow
import {
  type Usages,
  type Subscription,
  type Limits,
} from '../Utils/GDevelopServices/Usage';
import { type Profile } from '../Utils/GDevelopServices/Authentification';

export const profileForIndieUser: Profile = {
  uid: 'indie-user',
  providerId: 'fake-provider.com',
  email: 'indie-user@example.com',
  emailVerified: true,
};

export const usagesForIndieUser: Usages = [
  {
    id: '1',
    userId: 'indie-user',
    type: 'cordova-build',
    createdAt: 1515084391000,
  },
  {
    id: '56',
    userId: 'indie-user',
    type: 'cordova-build',
    createdAt: 1515084351000,
  },
  {
    id: '75',
    userId: 'indie-user',
    type: 'cordova-build',
    createdAt: 1515084311000,
  },
];

export const subscriptionForIndieUser: Subscription = {
  planId: 'gdevelop-indie',
  createdAt: 1515084011000,
  updatedAt: 1515084011000,
  userId: 'indie-user',
};

export const noSubscription: Subscription = {
  planId: null,
  createdAt: 1515084011000,
  updatedAt: 1515084011000,
  userId: 'no-subscription-user',
};

export const limitsForIndieUser: Limits = {
  'cordova-build': {
    current: 2,
    max: 10,
    limitReached: false,
  },
};

export const limitsReached: Limits = {
  'cordova-build': {
    current: 10,
    max: 10,
    limitReached: true,
  },
};
