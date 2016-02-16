
jQuery( document ).ready(function() {

/***  Change these variables for individual institutions ***/

//Point to intermediary page
var iframeSrc = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";

//Change displayed name for recent articles tab
tabName = "Recent Articles";

//Should this tab display first or last
firstTab = false;

//This is where the "pop-out window" will go
//url = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";
//url=false;

//What label displays for journals/periodicals?
var itemType = "Journal";

//var inst=jQuery.PRIMO.session.view.institution.name;
//console.log(inst);

/**************************** New Tab *******************************/

	tabType = "EXLContainer-recentarticlesTab";
	var tabHandler = EXLTA_createWidgetTabHandler(function(element){
		var issn = EXLTA_issn(EXLTA_recordId(element));
		return '<iframe src="'+ iframeSrc + issn + '" id='+issn+'></iframe>';
		},
		true);

	var url = function(element){
		var issn = EXLTA_issn(EXLTA_recordId(element));
			url = "http://library.lclark.edu/testpages/primoTab/index.php?issn=" + issn;
			return url;
		};


 var evaluator = function(element){

		if (EXLTA_isFullDisplay() === true) {
			var text = EXLTA_displaytype(EXLTA_recordId(element));

			console.log("this is the text"+text);

			} else {
			var text = $(element).parents('.EXLResult').find('.EXLThumbnailCaption').text();

		}
		if (text.toLowerCase() == itemType.toLowerCase()) {
			var issn = EXLTA_issn(EXLTA_recordId(element));
			//console.log("issn: "+issn)
			var recordid=EXLTA_recordId(element);

			/*  assigns unique identifier to containing div */
			jQuery(element).parent("div").attr("id", recordid);

			if (!issn){
				//matches itemType but no issn
				return false;
			}
			else{

				jQuery.ajax({
				  url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://www.journaltocs.ac.uk%2Fapi%2Farticles%2F" + issn + "%3Fuser%3Dsararead%40lclark.edu&callback=?",
				  dataType: 'jsonp',
				  async: false,
				  success: function(data){
						value = data.responseData.feed.entries[0].title;
						jQuery.each(value, function(){
							if(value != "0 hits" && value != "JournalTOCs API articles"){
								/*  if not a false-positive, shows the tab, targeting div w/identifier */
								jQuery("div#"+recordid).children("ul").children("li").last().show();

							}
						});
					}
				});

				return true;

			}

		}


 }


	//Creates TOCTab
	EXLTA_addLoadEvent(function(){
		EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab,evaluator);
	});

	// Hides all the TOCTab tabs.
	EXLTA_addLoadEvent(function(){
		/*hides tabs by default. they are shown if ajax call is successful */
		$('.EXLContainer-recentarticlesTab').hide();


	}); //end of addLoadEvent





}); //end of doc ready





