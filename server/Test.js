Meteor.methods({

	insertTest : function(data)
	{
	/*
		 TestInfo.insert({
				Data1 : data
		 });
		 */
		 
		 TestInfo.drop()
	}
});