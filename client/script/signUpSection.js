Template.signUpSection.rendered =  function()
{	
	
	var validator = $('#registration-form').bootstrapValidator({
			
			feedbackIcons :{
							valid :"glyphicon glyphicon-ok",
							invalid : "glyphicon glyphicon-remove",
							validating : "glyphicon glyphicon-refresh "
					},
			fields:{			
				fName : {
								validators : 
											{
									notEmpty : 
													{
														message:"First Name is mandatory"
													}									
											}
						   },/*FName control ends here**/
				lName : {
								validators : 
											{
									notEmpty : 
													{
														message:"Last Name is mandatory"
													}									
											}
						   },/*lName control ends here**/
				birthday : {
						validators : 
									{
							notEmpty : 
												{
													message:"Date of Birth is mandatory"
												},
							date : 
												{	
														format : 'MM/DD/YYYY',
														message : "Birthday is invalid"
													
												}
									}
							},/*Birthday control ends here**/
				contact : {
							validators :
								{
								notEmpty : 
											{
												message:"Contact is mandatory"	
											},
								stringLength : 
												{
													min:10,
													max:10,
													message : "Contact is invalid"
												},
								numeric : {																	
													message : "Contact is invalid"
											}	
							   }
				},/*Contact control ends here*/
				email : { 
								message : "Email Address is Required",
								validators:{
									notEmpty:{
														message: "Email address is mandatory"
													},									
									emailAddress : 
												{
													message : "Email address is invalid"
												}
										}
									
							},/*Email Ends Here*/
					pwd : 
							{
								 validators : 
								 {
										notEmpty: {
															message : "Password is mandatory"
														},
										stringLength : 
														{
															min : 6,															
															message : "Password must be longer than 6 characters "
														},
										different : 
														{
															field: "email",															
															message:"Email ID and password cannot be same"
													}
																			
								 }
							},/* Password ends here*/
					confirmPassword : 
							{
								validators :
								{
									notEmpty : 
												{
														message : "Confirm Password cannot be empty"
												},
									identical : 
												{
													field : "pwd",
													message : "Confirm Password and Password must match"
												}
									
								}
							
							}/* Confirm Password ends here*/
				}
				
	});
	
	validator.on("success.form.bv", function (evt,tmp)
		{	
			evt.preventDefault();
			var fName,lName,birthday,contact,email,password,vote,activation;
			var month,day,year,activation;
			var membersID,base,initPoint;
			var totalRecord;
			
			/*This is the base Record only to Run when document/table is empty*/
			totalRecord = UserInfo.find().count();
			//alert("totalRecord = "+totalRecord );
			base="MC";
			initPoint=1000;
			if(totalRecord == 0)
			{				
				initPoint=1000;			
			}
			else
			{				
				initPoint = initPoint + totalRecord ;				
			}
			
			membersID=base+initPoint;
			//alert("membersID = "+membersID );
			//0 = NOT ACTIVE
			//1 = ACTIVE
			activation = 0;
			vote = 0;
			fName = $('#fName').val();
			lName = $('#lName').val();
			birthday = new Date($('#birthday').val());
			contact = $('#contact').val();
			email = $('#email').val();
			password = $('#pwd').val();
			
			month = (birthday.getMonth()+1);
			day     = birthday.getDate();
			year    = birthday.getFullYear();
		
			
			var userRecord = 
			{
				fName: fName,
				lName :  lName,
				month: month,
				day :day,
				year:year,		
				contact:contact,
				email:email,
				password:password,
				membersID:membersID,
				activationStatus:activation,
				voteStatus:vote
				
			};
	
			
			/*****Server side call for data insert ******/
			Meteor.call("insertUserInfo",userRecord,
				function(error,result)
				{
					/*Result Holds Values if insertion operation is successfull*/
					
				}
			
			);			
			
			
			/**SEND MEMEBERS ID TO EMAIL**/
			Meteor.call("sendMail",membersID,password,email);
			//UserInfo.drop();
			 $('#registration-form').addClass("hidden");
			 $('#confirmation').removeClass("hidden");

			// alert(Session.get("x"));
			 
			
		});
	
	
}

Template.signUpSection.helpers({
    records: function () {
      return UserInfo.find({});
    }
    
});
