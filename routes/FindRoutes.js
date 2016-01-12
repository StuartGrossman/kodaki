var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require("request"); // brings in request for node	
var	cheerio = require("cheerio"); // brings ins cheerio to search through html with jquery selectors
var	url = "https://www.google.com/search?q=solarmovie.ph "; // google search + query variable 
	 // query variable 
 
var	totalResults = 0; // counts resutls
var	resultsDownloaded = 0; // counts downloaded results
var endResults = [];
var fullBio = {}



function makeurl(search){ // creates url
	fixedUrl = url + search 
	// console.log(fixedUrl)
}



function LinkHub(url, name, links){ // creates constructor for object of link information
	this.url = url;
	this.name = name;
	this.links = links;
}

function check(results){ // cleans results exstracted from web page search
	for(var f = 0; f < results.length; f++){
		var tempLength = results[f].length - 2
		if(results[f + 1] === results[f]){
			results.splice(f, 1);
		}
		if(results[f][tempLength] === 'e'){
			results.splice(f, 1);
		}
		
	}
	  return results
}

function deleteUsers(results){ // deletes more information from returned object
	for(var i = 0; i < results.length ; i ++){
		if(results[i][1] === 'u'){
			results.splice(i, 1);
		}
	}
	return results
}

function filterUrl(url){ //cleans url to exstract the name of the movie searched, and return it as a clean string
   url = url.split('')
   var new_url = []
   for(var i = 0; i < url.length ; i ++){
     if(i < 5){
        url.splice(url.length - 1, 1)
     }
     if(i > 31){
       if(url[i] != '-'){
         new_url.push(url[i])
       }else{
         new_url.push(' ')
       }
       
     }
   }
  new_url = new_url.join('')
  return new_url
}

function changeLinks(array){ // changes all address into valid links 
  string = 'http://cinema.solarmovie.ph/link/play/'
  for(var i =0; i < array.length ; i ++){
    array[i] = array[i].replace(/\D/g,'');
    // console.log(array[i])
    array[i] = string + array[i];
  }
  return array
}

function runSearch(search){ // main scraper Function
	var search = search 
	makeurl(search.name); // takes search , creates google search params 
	fullBio = {} // creates new object 
	var corpus = []
	request(fixedUrl, function (error, response, body) {
		if (error) {
			console.log('Couldn’t get page because of error: ' + error);
			return;
		}
		
		// load the body of the page into Cheerio so we can traverse the DOM
		var $ = cheerio.load(body),
			links = $(".r a");
			
			// console.log(links)
		links.each(function (i, link) {
			// get the href attribute of each link
			var url = $(link).attr("href");
			
			// strip out unnecessary junk
			url = url.replace("/url?q=", "").split("&")[0];
			
			if (url.charAt(0) === "/") {
				return;
			}

			
			// download that page
			var temp = url.split('')
			// console.log(temp[23], temp[24])
				if(temp[23] === 'p' && temp[24] === 'h'){
					request(url, function (error, response, body) {
						if (error) {
							console.log('Couldn’t get page because of error: ' + error);
							return;
						}
						
						// load the page into cheerio
						// console.log(url)

						// filterUrl(url)

						// console.log(new_url)



						var results = [];
						var $page = cheerio.load(body),
							text = $page('.even a')
							text.each(function (i, link) {
								var temp = $(link).html();
								temp = temp.split(' ')

								for(var j = 0; j < temp.length ; j ++){
									if(temp[j] == 'allmyvideos.net' || 'thevideo.me'){
										var Vidlink = $(link).attr('href');
										// console.log(temp[j])
									}
									if(Vidlink){
										results.push(Vidlink)
										Vidlink = null;
									}
								}
								
							})
							
							check(results)
							check(results)
							check(results)
							check(results)
							check(results)
							deleteUsers(results)

							changeLinks(results)
							// console.log(results)
							// endResults.push()


							//cleaned Array of links of all meta data! 
							corpus.push(new LinkHub(url, filterUrl(url), results));


							// console.log(fullBio)
							

							// console.log(results)

							var url3 = 'http://cinema.solarmovie.ph/play/'
							// console.log(endResults)
							console.log(corpus, 'linke 172')
					});
				}
			fullBio.links = corpus
		});
	console.log(fullBio)
	return fullBio
	});
}
// router.param('movie', function (req, res, next, movie) {

// 		req.movie = movie
// 		next();
	
// });

router.post('/', function(req, res){

	// console.log(req.body)
	runSearch(req.body)
	setTimeout(function(){ 
		// console.log(fullBio, 'sending info')
		console.log(fullBio, 'line 194')
		res.send(fullBio) 
	}, 9000);
	
})




module.exports = router;