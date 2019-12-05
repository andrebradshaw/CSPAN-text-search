var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

async function getCC(){
  var refUrl = reg(/c-span.org\/fragments\/convertCap.php\?.+?(?=')/.exec(document.body.innerHTML),0);
  var res = await fetch("https://www."+refUrl);
  
  var text = await res.text();
  var textArray = text.split(/\b(?=\d\d:\d\d:\d\d\.\d+.+?-->)/)
  console.log(textArray);
}

getCC()


//https://www.c-span.org/video/?21876-1/health-care-cost-containment-day-1&beta=&action=getTranscript&transcriptType=cc&service-url=%2Fcommon%2Fservices%2FprogramSpeakers.php&progid=15864&appearance-filter=&personSkip=0&ccSkip=0&transcriptSpeaker=&transcriptQuery=
