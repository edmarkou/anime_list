import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';

class MyList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: this.getUser()
    }
  }

  getUser() {
    return this.props.user;
  }

  removeItem(item) {
    const { user } = this.state;
    Meteor.call('removeItem', item.mal_id, (err) => {
      if (!err) {
        user.profile.list.splice(user.profile.list.findIndex(i => {
          return i.mal_id === item.mal_id
        }), 1);
        this.setState({user});
      }
    })
  }

  render() {
    return (
      <div>
        <div className="resultsContainer" style={{marginTop: 20}}>
          {this.state.user._id ? this.state.user.profile.list.map((item, index) => {
            return (
              <div key={index} className="results">
                <a href={item.url} target="_blank" alt="">
                  <img style={{width: 250, height: 300}} src={item.image_url} />
                </a>
                <div style={{width: 250, textAlign: 'center', overflow: 'hidden', paddingBottom: 5}}>
                  <span>{item.title}</span>
                </div>
                <div style={{width: 250}}>
                  <button onClick={() => this.removeItem(item)} className="itemButton" style={{width: 125}}>remove</button>
                  <button className="itemButton" style={{width: 125}}>more info</button>
                </div>
              </div>
            )
          }) : null}
        </div>
      </div>
    );
  }
}
class ListWrapper extends React.Component {
  render() {
    if (this.props.loading) return null;
    else if (this.props.user) return <MyList user={this.props.user}/>
    else return null;
  }
}

export default withTracker ((params) => {
  const handle = Meteor.subscribe('user');
  let data = {};
  if (handle.ready()) {
    data.user = Meteor.users.findOne({_id: Meteor.userId()});
  }
  return {
    user: data.user,
    loading: !handle.ready()
  };
}) (ListWrapper);