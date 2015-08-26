Template.movieDescriptionSection.rendered =  function()
{
		i=0;
		maxMovies = 5;
		Session.set("isLeftClicked",false);
		Session.set("isRightClicked",false);
		var nextImage, prevImage,currImage;
		var activeSlide = $('.active');
		currImage = activeSlide.find('img').attr('src');
		Session.set("currI",currImage);
		//alert(currImage);
	
	


		//alert("Prev Image is "+prevImage+"**CurrentImage = "+currImage+"**Next Image is "+nextImage);
		
		
		$('.carousel').carousel({
            interval: 1000 //changes the speed
			
        });
		
		//memID = Session.get("ID");
		//alert(memID);
	
		
		$(".voteButton").mouseover( function()
		{
			$('#movieCarousel').carousel('pause');
		});
		$(".voteButton").mouseout( function()
		{
			$('#movieCarousel').carousel('cycle');
		});
		//Session.setDefault("Index",0);
}
Template.movieDescriptionSection.helpers({
	
	movieName:function(evt,tmp)
	{
	
		//alert("Inside Helper");
		var currentIndex=0;	
		var currI = Session.get("currI");
		//alert(currI);
		
		movieRecord = MovieInfo.findOne({Poster:currI});
		$(".panel-heading").text(movieRecord.Name);
		$(".movieDesc").text(movieRecord.Description);
		$(".movieDirector").text(movieRecord.Director);
		$(".originalName").text(movieRecord.OriginalName);
		$(".releaseDate").text(movieRecord.ReleaseDate);
		$(".imdbLink").attr("href",movieRecord.IMDB);
		
		
	}
});
Meteor.methods({
		setImage:function()
		{
			//alert("setImage is activated");
			var to_slide = $('.carousel-indicators li').attr('data-slide-no');
			//alert("To Slide = "+to_slide);
			var activeSlide = $('.active');

			var nextImage, prevImage,currImage;
	
			currImage = activeSlide.find('img').attr('src');
			if(activeSlide.next().length)
			{
				nextImage = activeSlide.next().find('img').attr('src');
			}
			else
			{
				nextImage = $('.carousel-inner').children().first().find('img').attr('src');
			}
			/******************************************/
			if (activeSlide.prev().length) 
			{
				prevImage = activeSlide.prev().find('img').attr('src')		
			} 
			else 
			{
				prevImage = $('.carousel-inner').children().last().find('img').attr('src');
			}	

			//alert("Prev Image is "+prevImage+"**CurrentImage = "+currImage+"**Next Image is "+nextImage);
			Session.set("curImg",currImage);
			Session.set("nxtImg",nextImage);
			Session.set("prvImg",prevImage);
		}
	 });
Template.movieDescriptionSection.events({
	  'slide.bs.carousel': function (evt, tmp) {
		
		Meteor.call("setImage");
		var next,prev,poster;
		//alert("isLeftClicked is   = "+Session.get("isLeftClicked"));
		if(Session.get("isLeftClicked"))
		{
				poster = Session.get("prvImg");
		}
		else
		{
				poster = Session.get("nxtImg");
		}
		//alert("Poster  = "+poster);
		movieRecord = MovieInfo.findOne({Poster:poster});
		//alert(movieRecord._id);
		Session.set("movieID",movieRecord._id);
		$(".panel-heading").text(movieRecord.Name);
		$(".movieDesc").text(movieRecord.Description);
		$(".movieDirector").text(movieRecord.Director);
		$(".originalName").text(movieRecord.OriginalName);
		$(".releaseDate").text(movieRecord.ReleaseDate);
		$(".imdbLink").attr("href",movieRecord.IMDB);
		
		Session.set("isLeftClicked",false);
    },
	"click .left" : function(evt,tmp)
	{
		Session.set("isLeftClicked",true);
	},
	"click .voteButton" : function(evt,tmp)
	{
		var mID,currentVote,memID;
		//memID = Session.get("ID");
		alert("Before "+memID);
		//Session.setPersistent("ID","None");
		//memID = Session.get("ID");
		//alert("After "+memID);
		mID = Session.get("movieID");
		movieRecord = MovieInfo.findOne({_id:mID});
		
		currentVote = movieRecord.Vote;
		currentVote = currentVote +1;
		voteInfo ={
				idMovie : mID,
				vote : currentVote
		};
		//alert(mID);
		Meteor.call("updateMovieInfo",voteInfo,
			function(error,result)
			{
				
			}
		);
	}
	
});