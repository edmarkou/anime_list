import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import '../styles/App.css';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId: null
    }
  }

  renderButton(name, link) {
    return <button className="headerButton" onClick={() => this.navigate(link)}>{name}</button>
  }

  navigate(link) {
    FlowRouter.go(link);
  }
  logout() {
    this.setState({userId: null});
    Meteor.logout();
    this.navigate('/');
    window.location.reload();
  }

  componentWillReceiveProps() {
    this.setState({userId: Meteor.userId()})
  }

  render() {
    const { userId } = this.state;
    return (
      <div>
        <div className="header">
          <h1 className="headerText">My anime list</h1>
          {this.renderButton('Search', '/')}
          {userId ? this.renderButton('My list', '/mylist') : null}
          {userId ? null : this.renderButton('Register', '/register')}
          {userId ? null : this.renderButton('Log in', '/login')}
          {userId ?
            <button className="headerButton" onClick={this.logout.bind(this)}>Log out</button> 
            : 
            null
          }
        </div>
        {this.props.content}
      </div>
    );
  }
}