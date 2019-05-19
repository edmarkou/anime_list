import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Register extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      error: ''
    }
  }

  isValid() {
    const { name, email, password, rePassword } = this.state;
    if (
      name.length > 0 &&
      email.length > 0 &&
      password === rePassword &&
      password.length > 5 &&
      rePassword.length > 5
    ) return true;
    else 
      return false;
  }

  register() {
    const { name, email, password, rePassword } = this.state;
    if (this.isValid()) {
      const user = {
        password,
        email,
        profile: {
          name
        },
      };

      Accounts.createUser(user, err => {
        if (err) console.log(err);
        else FlowRouter.go('/mylist');
      })
    } else {
      if (name.length === 0) this.setState({error: 'Please enter your name'});
      else if (email.length === 0) this.setState({error: 'Please enter your email address'});
      else if (password !== rePassword) this.setState({error: 'Passwords do not match'});
      else if (password.length < 6) this.setState({error: 'Password too short, atleast 6 characters'});
      else if (rePassword.length < 6) this.setState({error: 'Password too short, atleast 6 characters'});
    }
  }

  render() {
    const {
      name,
      email,
      password,
      rePassword,
      error
    } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>Sign up</h1>
        </div>
        <div style={styles.form}>
          <input
            onChange={e => this.setState({name: e.target.value})}
            value={name}
            style={styles.input}
            placeholder="Name"
          />
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
          <input
            onChange={e => this.setState({rePassword: e.target.value})}
            value={rePassword}
            style={styles.input}
            placeholder="Repeat password"
            type="password"
          />
          <button className="formButton" onClick={this.register.bind(this)}>Register</button>
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