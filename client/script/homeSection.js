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