Meteor.publish("UserInfo", function () {
    return UserInfo.find();
  });
  
Meteor.publish("CollectionInfo", function () {
    return CollectionInfo.find();
  });
  
Meteor.publish("MovieInfo", function () {
    return MovieInfo.find();
  });