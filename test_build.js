var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));


function getSearchResultsVideoIds(){
  var listitems = cn(document,'onevid') && cn(document,'onevid').length ? Array.from(cn(document,'onevid')) : null;
  var buildlinks = listitems ? listitems.map(el=> {
    return {
		url: tn(el,'a') && tn(el,'a').length ? tn(el,'a')[0].href : null,
		id: cn(el,'excerpt') && cn(el,'excerpt').length && cn(el,'excerpt')[0].getAttribute('id') ? reg(/(?<=cc).+/.exec(cn(el,'excerpt')[0].getAttribute('id')),0) : null,
 	};
  }) : null;
  return buildlinks;
}

async function cspanCC2(url){
  var res = await fetch(url);
  var text = await res.text();
  var doc = new DOMParser().parseFromString(text,'text/html');
  var transcript = Array.from(tn(doc,'tr')).map(el=> {
	return {
	  timestamp: tn(el,'th')[0].innerText,
	  text: cn(el,'short_transcript')[0].innerText
    };
  }); 
  return transcript;
}

async function mergeTextContentWithVideoSearchResults(){
  var buildlinks = getSearchResultsVideoIds();
  for(var i=0; i<buildlinks.length; i++){
    if(buildlinks[i].url && buildlinks[i].id){
      var url = `${buildlinks[i].url}&beta=&action=getTranscript&transcriptType=cc&service-url=%2Fcommon%2Fservices%2FprogramSpeakers.php&progid=${buildlinks[i].id}&appearance-filter=&personSkip=0&ccSkip=0&transcriptSpeaker=&transcriptQuery=`;
      var res = await cspanCC2(url);
console.log(res);
      buildlinks[i]['timestamped'] = res;
      buildlinks[i]['fulltext'] = res && res.length ? res.reduce((a,b)=> a.text + b.text) : null;
    }
    await delay(rando(666));
  }
  console.log(buildlinks);
}

cspanCC2();

mergeTextContentWithVideoSearchResults();

// var query = "medicare for all";
// window.open(`https://www.c-span.org/search/?sdate=01%2F01%2F1917&edate=01%2F01%2F2019&searchtype=Videos&sort=Least+Recent+Event&text=1&addedterm%5B%5D=%22${encodeURIComponent(query)}%22&personid%5B%5D=994`,'_self');
