jQuery( document ).ready(function() {

	/***  Change these variables for individual institutions ***/

	//Point to intermediary page
	var iframeSrc = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";
<<<<<<< Updated upstream

	//Change displayed name for recent articles tab
	tabName = "Recent Articles";

	//Should this tab display first or last
	firstTab = false;

	//This is where the "pop-out window" will go. ISSN is added dynamically with the updateURL() function
	url = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";

	//What label displays for journals/periodicals?
	var itemType = "Journal";
	
	//Email subscribe to journalTOC
	var email="username";
	
	var emailEnc=encodeURIComponent(email);

=======

	//Change displayed name for recent articles tab
	tabName = "Recent Articles";

	//Should this tab display first or last
	firstTab = false;

	//This is where the "pop-out window" will go. ISSN is added dynamically with the updateURL() function
	url = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";

	//What label displays for journals/periodicals?
	var itemType = "Journal";

	//Email subscribe to journalTOC
	var email="sararead@lclark.edu";

	//If set to true, "actions" menu is displayed on the opened Recent Articles tab
	displayActions=true;


	var emailEnc=encodeURIComponent(email);
>>>>>>> Stashed changes


/**************************** New Tab *******************************/

	tabType = "EXLContainer-recentarticlesTab";
	var tabHandler = EXLTA_createWidgetTabHandler(function(element){
		var issn = EXLTA_issn(EXLTA_recordId(element));
		return '<iframe src="'+ iframeSrc + issn + '" id='+issn+'></iframe>';
		},
		true);

	 var evaluator = function(element){
<<<<<<< Updated upstream

			if (EXLTA_isFullDisplay() === true) {
				var text = EXLTA_displaytype(EXLTA_recordId(element));

				} else {
				var text = $(element).parents('.EXLResult').find('.EXLThumbnailCaption').text();

			}
			if (text.toLowerCase() == itemType.toLowerCase()) {
				var issn = EXLTA_issn(EXLTA_recordId(element));
				var recordid=EXLTA_recordId(element);

				/*  assigns unique identifier to containing div */
				jQuery(element).parent("div").attr("id", recordid);

				if (!issn){
					//matches itemType but no issn
					return false;
				}
				else{

=======

			if (EXLTA_isFullDisplay() === true) {
				var text = EXLTA_displaytype(EXLTA_recordId(element));

				} else {
				var text = $(element).parents('.EXLResult').find('.EXLThumbnailCaption').text();

			}
			if (text.toLowerCase() == itemType.toLowerCase()) {
				var issn = EXLTA_issn(EXLTA_recordId(element));
				var recordid=EXLTA_recordId(element);

				/*  assigns unique identifier to containing div */
				jQuery(element).parent("div").attr("id", recordid);

				if (!issn){
					//matches itemType but no issn
					return false;
				}
				else{

>>>>>>> Stashed changes
					jQuery.ajax({
					  url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://www.journaltocs.ac.uk%2Fapi%2Farticles%2F" + issn + "%3Fuser%3D"+ emailEnc +"&callback=?",
					  dataType: 'jsonp',
					  async: false,
					  success: function(data){
							value = data.responseData.feed.entries[0].title;
							jQuery.each(value, function(){
								if(value != "0 hits" && value != "JournalTOCs API articles"){
<<<<<<< Updated upstream
								
									/*  if not a false-positive, shows the tab, targeting div w/identifier */
									$("div#"+recordid).children("ul").children("li").last().show();
						
=======

									/*  if not a false-positive, shows the tab, targeting div w/identifier */
									$("div#"+recordid).children("ul").children("li").last().show();

>>>>>>> Stashed changes
								}
							});
						}
					});
<<<<<<< Updated upstream
				
=======

>>>>>>> Stashed changes
					return true;

				}  //else

			} //if

	 } //end


	//Creates TOCTab
	EXLTA_addLoadEvent(function(){
<<<<<<< Updated upstream
	
		EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab,evaluator);
		updateURL(url);
		
=======

		EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab,evaluator);
		updateURL(url);

>>>>>>> Stashed changes
	});

	// Hides all the TOCTab tabs.
	EXLTA_addLoadEvent(function(){
		/*hides tabs by default. they are shown if ajax call is successful */
		$('.EXLContainer-recentarticlesTab').hide();

	}); //end of addLoadEvent

}); //end of doc ready

/* this dynamically updates the "popout window" button link to tack on the issn */
function updateURL(url){
<<<<<<< Updated upstream
	
	$("li.EXLContainer-recentarticlesTab").click(function(){
		
=======

	$("li.EXLContainer-recentarticlesTab").click(function(){

>>>>>>> Stashed changes
		recordid=$(this).parent("ul").parent("div").attr("id");
		issn= EXLTA_issn(recordid);
		newUrl=url+issn;
		if (EXLTA_isFullDisplay()){
			console.log("it's full display!!");
			$("div#"+recordid).parent("div").parent("div").parent("div").find(".EXLTabHeaderButtonPopout").children("a").attr("href", newUrl);
<<<<<<< Updated upstream
		}
		else{
			$("div#"+recordid).parent("div").parent("td").find(".EXLTabHeaderButtonPopout").children("a").attr("href", newUrl);
		}
	});

=======

			if (displayActions==true){
				var actions=$("div#"+recordid).parent("div").parent("div").parent("div").find(".EXLTabHeaderButtons").html();
				$(".EXLTabHeaderButtons").last().html(actions);
			}
		}
		else{
			$("div#"+recordid).parent("div").parent("td").find(".EXLTabHeaderButtonPopout").children("a").attr("href", newUrl);

			if (displayActions==true){
				var actions=$("div#"+recordid).parent("div").parent("td").find(".EXLTabHeaderButtons").html();
				$(".EXLTabHeaderButtons").last().html(actions);
			}
		}
	});

>>>>>>> Stashed changes
}


