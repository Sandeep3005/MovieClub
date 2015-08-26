Router.configure({
		layoutTemplate:'mainLayout'
});
Router.route('/',{
		template : 'homeSection'
		
});
Router.route('/signup',{
	template : 'signUpSection'
});
Router.route('/userHome',{
	template : 'userHomeSection'
});
Router.route('/adminControl',{
	template : 'adminControlSection'
});