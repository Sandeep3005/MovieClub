Template.homeSection.rendered = function()
{
	Session.clear("ID");
	$("#signUp").removeClass("hideObject");
	$("#signInTop").removeClass("hideObject");
	$("#signOutTop").addClass("hideObject");
	
}
Template.homeSection.helpers
({
		'isLoggedIn' : function()
		{
			x1 = Session.get('signedIn');
			if(typeof x1 == 'undefined')
			{
				return false;
			}
			else
			{
				return true;
			}
		}
});