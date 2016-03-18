jQuery( document ).ready(function() {

	/***  Change these variables for individual institutions ***/

	//Point to intermediary page
	var iframeSrc = "http://library.lclark.edu/testpages/primoTab/index.php?issn=";

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
	
	//Your institution's VID

      var $vid;
      $vid = $('#vid');
      if ($vid.length === 0) {
        $vid = $('#vid_browse_input');
      }
      vid= $vid.val();
      scopes = $('#scopesListContainer').find('input:checked').val();
      console.log(scopes);

	
	var emailEnc=encodeURIComponent(email);


/**************************** New Tab *******************************/

	tabType = "EXLContainer-recentarticlesTab";
	var tabHandler = EXLTA_createWidgetTabHandler(function(element){
		var issn = EXLTA_issn(EXLTA_recordId(element));
		return '<iframe src="'+ iframeSrc + issn + '" id='+issn+'></iframe>';
		},
		true);

	 var evaluator = function(element){

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

					jQuery.ajax({
					  url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://www.journaltocs.ac.uk%2Fapi%2Farticles%2F" + issn + "%3Fuser%3D"+ emailEnc +"&callback=?",
					  dataType: 'jsonp',
					  async: false,
					  success: function(data){
							value = data.responseData.feed.entries[0].title;
							jQuery.each(value, function(){
								if(value != "0 hits" && value != "JournalTOCs API articles"){
								
									/*  if not a false-positive, shows the tab, targeting div w/identifier */
									$("div#"+recordid).children("ul").children("li").last().show();

								}
							});
						}
					});
				
					return true;

				}  //else

			} //if

	 } //end


	//Creates TOCTab
	EXLTA_addLoadEvent(function(){
	
		EXLTA_addTab(tabName,tabType,url,tabHandler,firstTab,evaluator);
		updateURL(url);
		
	});

	// Hides all the TOCTab tabs.
	EXLTA_addLoadEvent(function(){
		/*hides tabs by default. they are shown if ajax call is successful */
		$('.EXLContainer-recentarticlesTab').hide();

	}); //end of addLoadEvent

}); //end of doc ready

/* this dynamically updates the "popout window" button link to tack on the issn */
function updateURL(url){
	
	$("li.EXLContainer-recentarticlesTab").click(function(){
	
		recordid=$(this).parent("ul").parent("div").attr("id");
		issn= EXLTA_issn(recordid);
		newUrl=url+issn;
		if (EXLTA_isFullDisplay()){
			console.log("it's full display!!");
			$("div#"+recordid).parent("div").parent("div").parent("div").find(".EXLTabHeaderButtonPopout").children("a").attr("href", newUrl);
			
			if (displayActions==true){
				//var actions=$("div#"+recordid).parent("div").parent("div").parent("div").find(".EXLTabHeaderButtons").html();
				
				var actions=createActionsMenu(recordid, vid);
				console.log(actions);
				
				$(".EXLTabHeaderButtons").last().html(actions);
			}
		}
		else{
			$("div#"+recordid).parent("div").parent("td").find(".EXLTabHeaderButtonPopout").children("a").attr("href", newUrl);
			
			if (displayActions==true){
				//var actions=$("div#"+recordid).parent("div").parent("td").find(".EXLTabHeaderButtons").html();
				var actions=createActionsMenu(recordid, vid);
				console.log(actions);

				$(".EXLTabHeaderButtons").last().html(actions);
			}
		}
	});

}

function createActionsMenu(recordid, vid){

	menu="<ul>";
	
	menu+='<li class="EXLTabHeaderButtonSendTo">';
  	menu+='	<a href="#" name="in'+recordid+'_51f21" id="in'+recordid+'_51f21" title="Show actions options">';
  	menu+='	<span></span>';
  	menu+='	Actions<img src="../images/icon_arrow_sendTo.png" alt="">';
  	menu+='	</a>';
	menu+='	<ol class="EXLTabHeaderButtonSendToList">';
			
	menu+='		<li class="EXLButtonSendToMyShelf EXLButtonSendToMyShelfAdd">';
	menu+='							<a href="basket.do?fn=create&amp;docs='+recordid+'&amp;exemode=async" onclick="boomCallToRum(\"eShelf_0\",false);javascript:eshelfCreate(this,\"'+recordid+'\",\"false\",\"scope:'+scopes+'\",\"1\");return false;" title="Add to e-Shelf" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">Add to e-Shelf</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconMyShelf"></span>';
	menu+='							</a>';
	menu+='						</li>';
	menu+='						<li class="EXLButtonSendToMyShelf EXLButtonSendToMyShelfRemove" style="display: none;">';
	menu+='							<a href="basket.do?fn=remove&amp;docs='+recordid+'&amp;exemode=async" onclick="boomCallToRum(\"sendTo_eshelfRemove_0\",false);javascript:eshelfRemove(this,\"'+recordid+'\",\"false\",\"scope:'+scopes+'\",\"1\");return false;" title="Remove from e-Shelf" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">Remove from e-Shelf</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconMyShelf"></span>';
	menu+='							</a>';
	menu+='						</li>';
	menu+='					<li class="EXLButtonSendToMail">';
	menu+='						<a href="email.do?fn=email&amp;docs='+recordid+'&amp;vid='+vid+'&amp;fromCommand=true&amp;doc='+recordid+'&amp;scope=scope:'+scopes+'&amp;indx=1&amp;" onclick="boomCallToRum(\"sendTo_email_0\",false);javascript:sendPrintPopOut(this);return false;" title="Send record by E-mail(opens in a new window)" target="blank">';
	menu+='						<span class="EXLButtonSendToLabel">E-mail</span>';
	menu+='						<span class="EXLButtonSendToIcon EXLButtonSendToIconMail"></span>';
	menu+='						</a>';
	menu+='					</li>';
/*	menu+='				<li class="EXLButtonSendToPrint">';
	menu+='						<a href="display.do?fn=print&amp;tab=default_tab&amp;indx=1&amp;display=print&amp;docs='+recordid+'&amp;indx=1&amp;" onclick="boomCallToRum('sendTo_print_0',false);javascript:sendPrintPopOut(this);return false;" title="Print record (opens in a new window)" target="blank">';
	menu+='						<span class="EXLButtonSendToLabel">Print</span>';
	menu+='						<span class="EXLButtonSendToIcon EXLButtonSendToIconPrint"></span>';
	menu+='						</a>';
	menu+='					</li>';
	menu+='				<li class="EXLButtonSendToPermalink">';
	menu+='				  			<a href="permalink.do?docId='+recordid+'&amp;vid=LCC&amp;fn=permalink" onclick="boomCallToRum('sendTo_Permalink_0',false);javascript:openPermaLinkLbox('permalink','docId='+recordid+'&amp;vid=LCC&amp;fn=permalink','0',''+recordid+'');return false;" title="Permanent URL for this record" target="blank">';
	menu+='				  			<span class="EXLButtonSendToLabel">Permalink</span>';
	menu+='				  			<span class="EXLButtonSendToIcon EXLButtonSendToIconPermalink"></span></a>';
	menu+='				  		</li>';
	menu+='			  		<li class="EXLButtonSendToCitation">';
	menu+='						<a href="#" onclick="boomCallToRum('sendTo_citation_0',false);openCitationLbox('0',''+recordid+'');return false;" title="Bibliographic citation for this title" target="blank">';
	menu+='						<span class="EXLButtonSendToLabel">Citation</span> ';
	menu+='						<span class="EXLButtonSendToIcon EXLButtonSendToIconCitation"></span>';
	menu+='						</a>';
	menu+='					</li>';
	menu+='				<li class="EXLButtonSendToEasyBib">';
	menu+='						<a href="PushToAction.do?recId='+recordid+'&amp;pushToType=EasyBib&amp;fromEshelf=false" title="Add toEasyBib" onclick="boomCallToRum('sendTo_pushto_0_5',false);pushto('EasyBib','1','false',''+recordid+'');return false;" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">';
	menu+='								EasyBib</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconEasyBib"></span>';
	menu+='						</a>';
	menu+='					</li>';
						
	menu+='				<li class="EXLButtonSendToEndNote">';
	menu+='						<a href="PushToAction.do?recId='+recordid+'&amp;pushToType=EndNote&amp;fromEshelf=false" title="Add toEndNote" onclick="boomCallToRum('sendTo_pushto_0_6',false);pushto('EndNote','1','false',''+recordid+'');return false;" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">';
	menu+='								EndNote</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconEndNote"></span>';
	menu+='						</a>';
	menu+='					</li>';
						
	menu+='				<li class="EXLButtonSendToRefWorks">';
	menu+='						<a href="PushToAction.do?recId='+recordid+'&amp;pushToType=RefWorks&amp;fromEshelf=false" title="Add toRefWorks" onclick="boomCallToRum('sendTo_pushto_0_7',false);pushto('RefWorks','1','false',''+recordid+'');return false;" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">';
	menu+='								RefWorks</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconRefWorks"></span>';
	menu+='						</a>';
	menu+='					</li>';
						
	menu+='				<li class="EXLButtonSendToRISPushTo">';
	menu+='						<a href="PushToAction.do?recId='+recordid+'&amp;pushToType=RISPushTo&amp;fromEshelf=false" title="Add toRISPushTo" onclick="boomCallToRum('sendTo_pushto_0_8',false);pushto('RISPushTo','1','false',''+recordid+'');return false;" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">';
	menu+='								Export RIS</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconRISPushTo"></span>';
	menu+='						</a>';
	menu+='					</li>';
						
	menu+='				<li class="EXLButtonSendToDelicious">';
	menu+='						<a href="PushToAction.do?recId='+recordid+'&amp;pushToType=Delicious&amp;fromEshelf=false" title="Add toDelicious" onclick="boomCallToRum('sendTo_pushto_0_10',false);pushto('Delicious','1','false',''+recordid+'');return false;" target="blank">';
	menu+='							<span class="EXLButtonSendToLabel">';
	menu+='								Delicious</span>';
	menu+='							<span class="EXLButtonSendToIcon EXLButtonSendToIconDelicious"></span>';
	menu+='						</a>';
	menu+='					</li>';
*/						
	menu+='				</ol>';
	menu+='</li>';
	menu+='</ul>';
	console.log(menu);
	
	return menu;








}


