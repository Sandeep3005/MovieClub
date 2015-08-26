Template.adminControlSection.helpers({
    records: function () {
      return CollectionInfo.find({});
    }
    
});


Template.adminControlSection.events({

	"click .UserInfo": function(evt,tmp)
	{
		Meteor.call("updateUserInfo",
		function(error,result)
		{
			alert(result);
		});
	},
	"click .MovieInfo":function(evt,tmp)
	{
		var movieName,movieDesc,director,screenplay,originalName,relDate,index;
		movieName = "Bicycle Thieves";
		movieDesc="Ricci, an unemployed man in the depressed post-WWII economy of Italy, gets at last a good job - for which he needs a bike - hanging up posters. But soon his bicycle is stolen. He and his son walk the streets of Rome, looking for the bicycle. Ricci finally manages to locate the thief but with no proof, he has to abandon his cause. But he and his son know perfectly well that without a bike, Ricci won't be able to keep his job";
		director="Vittorio De Sica";
		originalName="Ladri di biciclette";
		relDate="24 November 1948";
		index="4";
		
		var movie =
		{
			name:movieName,
			desc:movieDesc,
			director:director,
			originalName:originalName,
			relDate:relDate,
			index:index
		};
		
		Meteor.call("updateMovieInfo",movie,
		function(error,result)
		{
			alert(result);
		});
	}

});

