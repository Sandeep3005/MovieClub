Meteor.methods({
'sendMail' : function(membersID,password,email)
{
var msg="Welcome to Movie Club. <br> Below are your credentials for login <br> MembersID : "+membersID+" <br> Password : "+password;
//var msg = "Welcome";

	this.unblock();
	Email.send({
			from: "no-reply@movieclub.com",
			to: email,
			subject: "Welcome to Movie Club | Credential Mail ",
			text: msg
		});
}
});