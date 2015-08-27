Template.userHomeSection.rendered = function()
{
	var idUser=Session.get("ID");
	$("#signUp").addClass("hideObject");
	$("#signInTop").addClass("hideObject");
	$("#signOutTop").html("SignOut");
}
Template.userHomeSection.helpers({
	"userName": function(evt,tmp)
	{		
			var name,record;
			//alert("in username");
			var idUser=Session.get("ID");
		
			//alert("id = "+idUser);
			record = UserInfo.findOne({MembersID : idUser});
			name = record.Name.FirstName +" "+ record.Name.LastName;
			return name;		

	}

});

Template.userHomeSection.events({	


});



