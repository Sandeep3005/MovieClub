
Template.mainLayout.events ({

	"click #signIn": function(evt,tmp)
	{
			
			var membersID,password,record;
			
			membersID = $("#membersid").val();
			password    = $("#password").val();
	
			//alert(membersID);
			record = UserInfo.findOne({MembersID:membersID});
			//alert(record );
			if(!record)
			{
				//alert("in if");
				$("#membersid").val("");
				$("#password").val("");
				$("#errorDiv").text("You are not a registered User");
				return false;
			}
			else
			{
					//alert("in else");
					if(membersID == record.MembersID)
					{					 
						//alert("membersID = "+membersID);						
						if(password == record.Password)
						{
							
							Session.setPersistent("ID",membersID);
							//alert("membersID after Session= "+Session.get("ID"));
							if(record.ActivationStatus == 0)
							{
								Meteor.call("setActivationStatus",record._id,
								function(error,result)
								{		
									/*Result Holds Values if insertion operation is successfull*/
					
								});	
							}
						}
					}								
					
			}
			
	},
	"click  #signOutTop":function(evt,tmp)
	{
		//alert("Inside");
		//var idUser=Session.get("ID");
		//alert("Before = "+idUser);
		
		Session.clear("ID");
		
		//var idUser=Session.get("ID");
		//alert("After = "+idUser);
	}
	
});

