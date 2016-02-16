<?php
 /**** Change per institution ****/
$institutionCode = "LCC";
$institutionView = "lcc_services_page";
$journalTocUsername = "your username";
$institutionCSS = "http://alliance-primo-sb.hosted.exlibrisgroup.com/primo_library/libweb/wro/primo_library_wro_LCC_en_US.css";
$mashupCSS = "http://na01.alma.exlibrisgroup.com/view/branding_skin/css/mashup.css?skinName=summit_request_form&amp;version=February2016&amp;skinVersion=1442511264&amp;customerId=1840&amp;institutionId=1844";





/**** Begin iframe ***/
$persistantLink = "http://alliance-primo.hosted.exlibrisgroup.com/openurl/$institutionCode/$institutionView?";

$issn=$_GET["issn"];
$url="http://www.journaltocs.ac.uk/api/articles/$issn?user=$journalTocUsername";
$data=file_get_contents($url);
$xml=simplexml_load_string($data);

$response="";
$c=0;
foreach ($xml->item as $item){

	$dc=$item->children("http://purl.org/dc/elements/1.1/");
	$prism=$item->children("http://prismstandard.org/namespaces/1.2/basic/");
	$title=$item->title;
	$author=$dc->creator;
	$creator=urlencode($dc->creator);
	$pubName= urlencode($prism->PublicationName);
	$volume=$prism->volume;
	$number=$prism->number;
	$spage=$prism->startingPage;
	$epage=$prism->endingPage;
	$pages=$spage . "-" . $epage;
	$description=$item->description;
	$t=urlencode($title);

	$link=$persistantLink."
	ctx_ver=Z39.88-2004&
	ctx_enc=info:ofi/enc:UTF-8&
	url_ver=Z39.88-2004&
	url_ctx_fmt=infofi/fmt:kev:mtx:ctx&
	rft.genre=article&
	rft.atitle=".$t."&
	rft.jtitle=".$pubName."&
	rft.au=".$creator."&
	rft.volume=".$volume."&
	rft.issue=".$number."&
	rft.spage=".$spage."&
	rft.epage=".$epage."&
	rft.pages=".$pages."&
	rft.issn=".$issn."&
	req.language=eng";

//$link="http://alliance-primo.hosted.exlibrisgroup.com/openurl/LCC/lcc_services_page?ctx_ver=Z39.88-2004&ctx_enc=info:ofi/enc:UTF-8&ctx_tim=1452211525765&url_ver=Z39.88-2004&url_ctx_fmt=infofi/fmt:kev:mtx:ctx&rft.genre=article&rft.atitle=Radiographic+measurements+of+the+hooves+of+normal+ponies.&rft.jtitle=Veterinary+Journal&rft.au=Thieme%2C+Katharina&rft.volume=206&rft.issue=3&rft.spage=332&rft.pages=332-337&rft.issn=1090-0233&rft.eissn=1532-2971&req.language=eng";



	$response.= "<div><a href='$link' target='_blank' id='recentArticlesTitle'>$title</a>";
	$response.="<p>$author</p>";
	$response.= "<p>$description</p>";
	$response.= "</br></div>";
	$c++;



}

//echo $response;

?>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
   <link rel="stylesheet" type="text/css" href="<?php echo $institutionCSS; ?>" />
   <link rel="stylesheet" type="text/css" href="<?php echo $mashupCSS; ?>" />
    <title>title</title>



  </head>
  <body>


	<div id="iframe">
		<?php
		echo $response; ?>
	</div>


  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>


  </body>
</html>


