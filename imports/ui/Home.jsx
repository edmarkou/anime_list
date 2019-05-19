import React from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

const types = ['anime', 'manga', 'person', 'character'];

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      query: '',
      page: 1,
      results: {
        genre: 'anime',
        data: [],
        maxPage: 1
      },
      genre: 'anime',
      user: this.getUser()
    }
  }

  getUser() {
    return this.props.user;
  }

  search() {
    const { query, genre } = this.state;
    Meteor.call('searchAnime', genre, query, 1, (err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({results: res})
      }
    });
  }

  nextPage(number) {
    const { query, genre } = this.state;
    Meteor.call('searchAnime', genre, query, number, (err, res) => {
      if (err) console.log(err);
      else {
        this.setState({results: res})
      }
    });
  }

  addToList(item) {
    const index = this.state.user.profile.list.findIndex(i => i.mal_id === item.mal_id);
    if (index === -1) {
      Meteor.call('addToList', item, err => {
        if (!err) {
          let user = this.state.user;
          user.profile.list.push(item);
          this.setState({user});
        }
      });
    }
  }

  render() {
    return (
      <div>
        {types.map((genre, index) => {
          return (
            <button 
              key={index} 
              onClick={() => this.setState({genre})}
              className={this.state.genre === genre ? "tabButton activeTab" : "tabButton"}
            >
              {genre}
            </button>
          )
        })}
        <div className="searchContainer">
          <input
            value={this.state.query}
            onChange={e => this.setState({query: e.target.value})}
            className="searchInput"
          />
          <button 
            className="searchButton" 
            onClick={this.search.bind(this)}
          >
            Search
          </button>
        </div>
        <div className="resultsContainer">
          {this.state.results.data.map((item, index) => {
            return (
              <div key={index} className="results">
                <a href={item.url} target="_blank" alt="">
                  <img style={{width: 250, height: 300}} src={item.image_url} />
                </a>
                <div style={{width: 250, textAlign: 'center', overflow: 'hidden', paddingBottom: 5}}>
                  <span>{item.title}</span>
                </div>
                <div style={{width: 250}}>
                  {Meteor.userId() && 
                  (this.state.results.genre === 'anime' ||
                  this.state.results.genre === 'manga') ? 
                    <div>
                      <button onClick={() => this.addToList(item)} className="itemButton" style={{width: 125}}>Add to list</button>
                      <button className="itemButton" style={{width: 125}}>more info</button>
                    </div> 
                    :
                    <button className="itemButton" style={{width: 250}}>more info</button>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

class HomeWrapper extends React.Component {
  render() {
    if (this.props.loading) return null;
    else return <Home user={this.props.user}/>
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
}) (HomeWrapper);