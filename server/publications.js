Meteor.publish('user', function() {
  return Meteor.users.find({_id: Meteor.userId()});
});