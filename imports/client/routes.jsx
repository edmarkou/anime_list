import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '/imports/ui/App';
import Home from '/imports/ui/Home';
import MyList from '../ui/MyList';
import Register from '../ui/Register';
import Login from '../ui/Login';

FlowRouter.route('/', {
  name: 'home',
  action(){
    mount( App, {
      content: <Home />
    })
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action(){
    mount( App, {
      content: <Register />
    })
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action(){
    mount( App, {
      content: <Login />
    })
  }
});

FlowRouter.route('/mylist', {
  name: 'my-anime-list',
  action(){
    mount( App, {
      content: <MyList />
    })
  }
});