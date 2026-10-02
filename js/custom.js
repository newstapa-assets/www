    $(document).ready(function() {
 

        $('.header').scrollToFixed( {
            top: 0,
            limit: $('.footer').offset().top
        });

 
    });
    
$(document).ready(function(){
 

 
	
	$('.hero-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  arrows: false,
	  autoplay: true,
	  autoplaySpeed: 7000
	});
	
	$('.content-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  arrows: false,
	  autoplay: true,
	  autoplaySpeed: 7000
	});
	
	$('.featured-news-slider').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  arrows: true,
	  autoplay: true,
	  autoplaySpeed: 7000,
	  prevArrow: $('.featured-news-slider-wrap .slider-arrow-left, .featured-news-slider-wrap .slider-control-left'),
	  nextArrow: $('.featured-news-slider-wrap .slider-arrow-right, .featured-news-slider-wrap .slider-control-right'),
	});
	
	$('.list_section-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  arrows: true,
	  prevArrow: $('.list_section-slider-wrap .slider-control-left'),
	  nextArrow: $('.list_section-slider-wrap .slider-control-right')
	});
	
	//Filter
	$('.filter-icon').click(function(){
		$('.filter-header-block').toggleClass('filter-header-block-active');
		$('.filter-form').stop().slideToggle('fast');
	});
	
	//Top Strip
	$('.top-strip .close-btn').click(function(){
		$('.top-strip').fadeOut('fast');						   
	});
	
	//Menu Open
	$('.humburger-menu').click(function(){
		$('.menu').fadeIn('fast');	
		$('body').addClass('menu-active');
	});
	
	//Menu Close
	$('.menu-close-link').click(function(){
		$('.menu').fadeOut('fast');	
		$('body').removeClass('menu-active');
	});
	
	//Menu Dropdown
	$('.menu ul li a.menu-dropdown-toggle').click(function(e){	
		$(this).next('.menu-dropdown').slideToggle('fast');
		$('a.menu-dropdown-toggle').removeClass('active-menu-link');
		$(this).toggleClass('active-menu-link');	
		$(this).parent().siblings().find('.menu-dropdown').slideUp('fast');
		//$(this).parent().siblings().find('a.menu-dropdown-toggle').removeClass('active-menu-link');
		e.preventDefault();				   
	});
	
	$('.menu ul').hover(function(){
		$('.header').addClass('header-menu-active');							
	}, function() {
	    $('.header').removeClass('header-menu-active');	
	});
	
	//Crew List
	var thisText = $('.crew-link').text();
	$('.crew-link').click(function(){
		var closeText = "닫기";
		var urlParams = new URLSearchParams(window.location.search); 
		var lang = urlParams.get('lang'); 
		
		if(lang && lang == 'eng') {
		    closeText = "Close";
		} 
		
		$(this).html($(this).html() == thisText ? '<i class="far fa-times-circle"></i> <b>'+closeText+'</b>' : thisText);					   
		$('.crew-list').stop().slideToggle('fast');						   
	});


});
 
$('.list-view-btn').click(function(e){
	$(this).addClass('active');
	$('.grid-view-btn').removeClass('active');
	$('.filter-tab-item').addClass('list-view');
	e.preventDefault();
});
$('.grid-view-btn').click(function(e){
	$(this).addClass('active');
	$('.list-view-btn').removeClass('active');
	$('.filter-tab-item').removeClass('list-view');
	e.preventDefault();
});

 
$slick_slider = $('.slider, .recommendation-slider, .project-slider, .menu-dropdown-slider');
settings_slider = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  infinite: false,
  variableWidth: true
}
slick_on_mobile( $slick_slider, settings_slider);
 
function slick_on_mobile(slider, settings){
  $(window).on('load resize', function() {
	if ($(window).width() > 767) {
	  if (slider.hasClass('slick-initialized')) {
		slider.slick('unslick');
	  }
	  return
	}
	if (!slider.hasClass('slick-initialized')) {
	  return slider.slick(settings);
	}
  });
};


// ruizyi


function load_video_on_playlist() {
	console.log(111);
	if (!$('.main_playlist_mainwrap.do_not_ready').length) {
		$(".main_playlist_mainwrap").html('');
		$(".main_playlist_mainwrap").append('<video id="main_playlist-player"></video>'); 
	}
	
	
	if (typeof $(".main_playlist li.active").data("videopage") !== 'undefined' && $(".main_playlist li.active").data("videopage") == "Y") {
		
		var title = $(".main_playlist li.active").data("title");
		
		var link = "";
		if ($(".main_playlist li.active").data("articleuniqueid") !== "" && $(".main_playlist li.active").data("articleuniqueid") !== " ") var link = '<a href="/article/'+$(".main_playlist li.active").data("articleuniqueid")+'" alt="'+title+'" title="'+title+'"><i class="fas fa-link"></i> 기사이동</a>';
		
		$(".main_playlist_mainwrap").append('<div class="main_play_meta"><h3>'+title+' <small class="ml-2">'+link+'</small></h3><p>'+$(".main_playlist li.active").data("datetime")+'</p></div>');
		


		var currentUrl = window.location.href;
		var currentHost = currentUrl.split('?')[0];
		
		if (typeof $(".main_playlist li.active").data("id") !== 'undefined') {
			window.history.pushState('', document.title, currentHost+'?target='+$(".main_playlist li.active").data("id"));  
		} 
	
	}
	var autoplay_status = false;
	if (typeof $(".autoplay").data("autoplay") !== 'undefined' && $(".autoplay").data("autoplay") == "Y") {
		var autoplay_status = true;	
	}
	var youtubeId = "";
	if (typeof $(".main_playlist li.active").data("youtubeid") !== 'undefined') var youtubeId = $(".main_playlist li.active").data("youtubeid");
	if (youtubeId.length > 3) {
		 
		new Plyr('#main_playlist-player').source = {
		    type: 'video',
		    autoplay: autoplay_status,
		    ownyoutube: true,
		    sources: [
		        {
		            src: youtubeId,
		            provider: 'youtube',
		        },
		    ],
		    poster: $(".main_playlist li.active").data("img")
		}; 
	} else {
		
		var video_url_del = $(".main_playlist li.active").data("1080");
		new Plyr('#main_playlist-player').source = {
		    type: 'video',
		    title: $(".main_playlist li.active").data("title"),
		    autoplay: autoplay_status,
		    sources: [
		        {
		            src: video_url_del,
		            type: 'video/mp4',
		            size: 1080,
		        }
		    ],
		    poster: $(".main_playlist li.active").data("img")
		}; 
		
		$('video').on('ended', function(){
			autoplay_avec_playlist();
		});	
	}
	
	
	if (typeof $(".main_playlist li.active").data("comment") !== 'undefined') {
		
		if ($(".main_playlist li.active").data("comment") == "Y") {
			
			var section = "comment";
			var uniqueId = $("[name=uniqueId]").val();
			var sub_uniqueId = $(".main_playlist li.active").data("id");
			if ($(".main_playlist li.active").data("articleid") !== "") {
				var section = "article";
				var uniqueId = $(".main_playlist li.active").data("articleid");
				var sub_uniqueId = "";
			}
			
			$("#comment_wrap").html('<iframe width="100%" src="/comment?section='+section+'&sub_section=&uniqueId='+uniqueId+'&sub_uniqueId='+sub_uniqueId+'&guest=N" frameborder="0" scrolling="no"></iframe>');
			iFrameResize();
			$("#comment_container").show();	
		} else {
			$("#comment_wrap").html('');
			$("#comment_container").hide();
		}
	}
	 	 
		
}
function autoplay_avec_playlist() {
	if ($('#video_wrap').length) { 
		if (typeof $(".autoplay").data("autoplay") !== 'undefined' && $(".autoplay").data("autoplay") == "Y") {
			$("#video_wrap .main_playlist li.active").next().addClass("pre_active");
			$("#video_wrap .main_playlist li.active").removeClass("active");
			$("#video_wrap .main_playlist li.pre_active").addClass("active");
			$("#video_wrap .main_playlist li.pre_active").removeClass("pre_active"); 
			setTimeout( function() {
				load_video_on_playlist(".main_playlist li.active");
			}, 100);
		}	
	}
}
	
$(document).ready(function() {
	
	$(document).on("click", ".run_videoplay", function(e) {
		
		$(".main_playlist_mainwrap").html('');
		$(".main_playlist_mainwrap").append('<video id="main_playlist-player"></video>'); 
		var youtubeId = $(this).data("youtubeid");

		setTimeout( function() {
			if (youtubeId.length > 3) {
				 
				new Plyr('#main_playlist-player').source = {
				    type: 'video',
				    autoplay: true,
				    ownyoutube: true,
				    sources: [
				        {
				            src: youtubeId,
				            provider: 'youtube',
				        },
				    ],
				    poster: $(this).data("img")
				}; 
			} else {
				
				
				new Plyr('#main_playlist-player').source = {
				    type: 'video',
				    title: $(this).data("title"),
				    autoplay: true,
				    sources: [
				        {
				            src: $(this).data("1080"),
				            type: 'video/mp4',
				            size: 1080,
				        }
				    ],
				    poster: $(this).data("img")
				}; 
				
				$('video').on('ended', function(){
					autoplay_avec_playlist();
				});	
			}
		}, 100);

		
	});	
	
	$(document).on("click", "a#autoplay_trigger", function(e) { 
		e.preventDefault();

		if ($(".autoplay").data("autoplay") == "Y") {
			$(".autoplay").data("autoplay", "N");
			$(".autoplay").removeClass("active");
		} else {
			$(".autoplay").data("autoplay", "Y");
			$(".autoplay").addClass("active");
		}		 
	});	

	$(document).on("click", "ul.main_playlist li", function(e) {	
		e.preventDefault();

		$("ul.main_playlist li").each(function () { 
			$(this).removeClass("active"); 
		});
		$(this).addClass("active");
				
		load_video_on_playlist(".main_playlist li.active"); 		
	});	 
		
									
	$("[type=file].data_upload").change(function (){ 
		var name = $(this).attr('name'); 
		if($("i.fa-pulse").is(':visible')){ 
			swal("기존의 업로드 작업이 완료된 후 새로운 업로드 작업을 진행해 주시기 바랍니다. ", { buttons: [false, "확인"], });
			$("[name="+name+"]").val("");
			return;
		}
		$("i."+name).show();
	    data = new FormData();
	    data.append("editorFile", this.files[0]); 
		$("#loading").show();
	    $.ajax({
			data: data,
			type: "POST",
			url: "/data_upload",
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
	        	$("i."+name).hide(); 
				var obj =  JSON.parse(data);
				if (obj.status) {
					$("img."+name).attr("src", obj.save_url);
					$("[name="+name+"]").val("");
				} else {
					switch(parseInt(obj.error)) {
						case 1: alert('업로드 용량 제한에 걸렸습니다.'); break; 
						case 2: alert('3MB 보다 큰 파일은 업로드할 수 없습니다.'); break;
						case 3: alert('파일이 일부분만 전송되었습니다.'); break;
						case 4: alert('파일이 전송되지 않았습니다.'); break;
						case 6: alert('임시 폴더가 없습니다.'); break;
						case 7: alert('파일 쓰기 실패'); break;
						case 8: alert('알수 없는 오류입니다. 용량을 확인해 주시기 바랍니다. 2메가 이상은 올릴 수 없습니다.'); break;
						case 100: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
						case 101: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
						case 102: alert('0 byte 파일은 업로드 할 수 없습니다.'); break; 
					}
				}
			}
		}); 
		
	});
 

});

