
Template.userHomeSection.helpers({
	"userName": function(evt,tmp)
	{		
			//alert("in username");
			var idUser=Session.get("ID");
		
			//alert("id = "+idk);
			record = UserInfo.findOne({MembersID : idUser});
			name = record.Name.FirstName +" "+ record.Name.LastName;
			return name;		

	}

});



