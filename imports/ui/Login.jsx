import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Login extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  isValid() {
    const { email, password } = this.state;
    if (
      email.length > 0 &&
      password.length > 0
    ) return true;
    else 
      return false;
  }

  login() {
    const { email, password } = this.state;
    if (this.isValid()) {
      Meteor.loginWithPassword({ email }, password, (err) => {
        if (err) this.setState({error: err.message});
        else FlowRouter.go('/');
      })
    } else {
      if (email.length === 0) this.setState({error: 'Enter your email address'});
      else if (password.length === 0) this.setState({error: 'Enter password'});
    }
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>Log in</h1>
        </div>
        <div style={styles.form}>
          <input
            onChange={e => this.setState({email: e.target.value})}
            value={email}
            style={styles.input}
            placeholder="Email address"
            type="email"
          />
          <input
            onChange={e => this.setState({password: e.target.value})}
            value={password}
            style={styles.input}
            placeholder="Password"
            type="password"
          />
          <button onClick={this.login.bind(this)} className="formButton">Log in</button>
        </div>
        <span style={styles.error}>{error}</span>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#022b36',
    borderStyle: 'solid',
    padding: 10
  },
  input: {
    marginBottom: 10,
    width: 300,
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#adbabd',
    borderWidth: 1,
    outline: 'none'
  },
  title: {
    color: '#022b36'
  },
  titleContainer: {
    marginBottom: 30,
    marginTop: 50,
    textAlign: 'center'
  },
  error: {
    marginTop: 20,
    color: 'red'
  }
}