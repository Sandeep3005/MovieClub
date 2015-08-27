Meteor.methods({
	 
	insertCollectionInfo: function(collectionName)
	{
		return CollectionInfo.insert({
			
			CollectionName : collectionName
			
		},
		function(error,id)
		{
			if(id) { return id; } else { return error; }
		});
		
	},
	insertMovieInfo: function(movie)
	{
		return MovieInfo.insert({
			
			Name : movie.name,
			Description : movie.desc,
			Director : movie.director,
			OriginalName : movie.originalName,
			ReleaseDate : movie.relDate,
			index : movie.index
			},
			function(error,id)
			{
				 if(id)	{ return id;} else {	return error; }
			});									
	},
	updateMovieInfo: function(movie)	
	{
			MovieInfo.update({'_id':movie.idMovie}, {$set: {"Vote": movie.vote}});
	},
	updateUserInfo: function(user)	
	{
			//UserInfo.update({'_id':'dgrRcAjiwW79AL9Ee'}, {$set: {"Voted": 0}});
			UserInfo.update({'_id':user.idUser}, {$set: {"Voted": user.voted}});
	}
		
	
});