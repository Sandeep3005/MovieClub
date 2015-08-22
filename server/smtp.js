Meteor.startup(function () {
/*
defaultLogin = "postmaster%40sandbox0ab75659128d45fbb753b24039f6480b.mailgun.org"; 
password  = "8719e723405b2354f0c388caf5117917";
hostname = "smtp.mailgun.org";
port          = "587";
*/
process.env.MAIL_URL = 'smtp://postmaster%40sandbox0ab75659128d45fbb753b24039f6480b.mailgun.org:8719e723405b2354f0c388caf5117917@smtp.mailgun.org:587';
});