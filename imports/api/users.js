import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const profileSchema = new SimpleSchema ({
  name: {
    type: String,
    label: 'Name'
  },
  list: {
    type: Array,
    label: 'list',
    defaultValue: []
  },
  'list.$': {
    type: Object,
    blackbox: true,
  }
});

const accountSchema = new SimpleSchema ({
  emails: {
    type: Array,
    blackbox: true,
  },
  'emails.$': {
    type: Object,
    blackbox: true,
  },
  'emails.$.address': {
    type: String,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  profile: {
    type: profileSchema
  },
  services: {
    type: Object,
    blackbox: true
  },
});

Meteor.users.attachSchema(accountSchema);
