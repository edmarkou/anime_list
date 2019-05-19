import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App';
import '../imports/client/routes';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-root'));
});
