Template.movieDescriptionSection.rendered =  function()
{		
		var userRecord1,userID;
		Session.set("isLeftClicked",false);
		Session.set("isRightClicked",false);
		var nextImage, prevImage,currImage,userID;
		var activeSlide = $('.active');
		currImage = activeSlide.find('img').attr('src');
		Session.set("currI",currImage);

		$('.carousel').carousel({
            interval: 1000 //changes the speed
			
        });
				
		$(".voteButton").mouseover( function()
		{
			$('#movieCarousel').carousel('pause');
		});
		$(".voteButton").mouseout( function()
		{
			$('#movieCarousel').carousel('cycle');
		});
		
		userID = Session.get("ID");
		
		//alert("in render = "+userID);
		
		if(userID == undefined)
		{
			$("#buttonVote").addClass("hideObject");
		}
		else
		{
			
			Meteor.call("voteEligibility");
		}
		
}
Template.movieDescriptionSection.helpers({
	
	movieName:function(evt,tmp)
	{
	
		//alert("Inside Helper");
		var currentIndex=0;	
		var currI = Session.get("currI");
		//alert(currI);
		
		movieRecord = MovieInfo.findOne({ Poster : currI });
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
			//var to_slide = $('.carousel-indicators li').attr('data-slide-no');
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
		},
		voteEligibility:function()
		{
			var memberID,makeChange;		
			//alert("inside vote eligibility");
			memberID = Session.get("ID");
			//alert(memberID);
			mdsve_userRecord = UserInfo.findOne({MembersID:memberID});
			//alert("userRecord = "+mdsve_userRecord.Voted);
			//makeChange =0;
			
			
			if(mdsve_userRecord.Voted == 1)
			{				
				$("#buttonVote").removeClass("btn-success");
				$("#buttonVote").addClass("btn-danger");
				$("#buttonVote").html("Thanks for Voting !!!");
				 $('#buttonVote').attr("disabled", true);
			}

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
		var mID,currentVote,memberID,userx,movieRecord,currentVote,voteInfoMovie,voteInfoUser,mdsvb_userRecord;		
		
		memberID = Session.get("ID");
		//alert(memberID);
		
		mdsvb_userRecord = UserInfo.findOne({MembersID:memberID});
		
		//alert("UserVoted =" +mdsvb_userRecord);
		if(mdsvb_userRecord.Voted == 0)
		{
				//alert("in if ");
				mID = Session.get("movieID");
				//alert("mID "+mID);
				movieRecord = MovieInfo.findOne({_id:mID});
		
				currentVote = movieRecord.Vote;
				currentVote = currentVote +1;
				voteInfoMovie ={
					idMovie : mID,
					vote : currentVote
				};
				//alert(mID);
				Meteor.call("updateMovieInfo",voteInfoMovie,
				function(error,result)
				{
				
				});
				
				voteInfoUser ={
					idUser : mdsvb_userRecord._id,
					voted   : 1
				};
				Meteor.call("updateUserInfo",voteInfoUser,
				function(error,result)
				{
					
				});
		
		}
	
			//userRecord = UserInfo.findOne({MembersID:memberID});
			//alert("UserVoted After=" +userRecord.Voted);
			
			Meteor.call("voteEligibility");
		
		
		
	}
	
});