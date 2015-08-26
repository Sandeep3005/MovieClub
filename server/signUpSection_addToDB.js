Meteor.methods({
 insertUserInfo: function(userRecord)
{
		return UserInfo.insert({
					Name: {FirstName:userRecord.fName , LastName:userRecord.lName},
					Birthday: { Month:userRecord.month,Day:userRecord.day,Year:userRecord.year},
					Contact:userRecord.contact,
					Email:userRecord.email,
					Password:userRecord.password,	
					MembersID:userRecord.membersID,
					ActivationStatus:userRecord.activationStatus
			},
			function(error,id)
			{
				if(id)	{ return id;} else {	return error; }
				
			});
},
setActivationStatus: function(id)
{
	return UserInfo.update(id,
	{ 
		$set : { ActivationStatus: 1} 
	},
	function(error,id)
	{
		if(id)	{ return id;} else {	return error; }
	});
}
});


  
