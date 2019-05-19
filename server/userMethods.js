import { HTTP } from 'meteor/http';

Meteor.methods({
  searchAnime: (genre, query, page) => {
    try {
      const result = HTTP.get(`https://api.jikan.moe/v3/search/${genre}/?q=${query}&page=${page}`, {
        params: {}
      }).data;
      return {
        data: result.results,
        genre,
        maxPage: result.last_page
      }
    }catch(e) {
      console.log(e);
      return {
        data: [],
        genre,
        maxPage: 1
      };
    }
  },
  addToList: (item) => {
    const user = Meteor.user();
    if (user) {
      let list = user.profile.list;
      list.push(item);
      Meteor.users.update({_id: Meteor.userId()}, {
        $set: {
          'profile.list': list
        }
      });
    }
  },
  removeItem: id => {
    const user = Meteor.user();
    if (user) {
      user.profile.list.splice(user.profile.list.findIndex(i => {
        return i.mal_id === id
      }), 1);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {
        'profile.list': user.profile.list
      }});
    }
  }
});