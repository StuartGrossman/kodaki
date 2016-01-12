	url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 94121;
	url2 = 'https://www.solarmovie.ph/movie/search/' + search;

	var results  = [];
	// var split_words = [];
	// var search_Matrix = []; 
	// function searchWord(phrase){ // function to split search result
	// 	phrase = phrase.split('');
	// 	// console.log(phrase)
		
	// 	var word = []
	// 	for(var k =0; k < phrase.length ; k++){
	// 		var test_var = k + 1
	// 		if(phrase[k] != ' '){
	// 			word.push(phrase[k].toLowerCase())
	// 		}
	// 		else{
	// 			var test = word.join('')
	// 			// console.log(test)
	// 			split_words.push(test)
	// 			word = []
	// 		}

	// 		if(phrase.length === test_var){
	// 			// console.log('inside else if')
	// 			var test = word.join('')
	// 			// console.log(test)
	// 			split_words.push(test)
	// 		}
	// 		// console.log(word)
	// 	}
	// }
	// function unique(a){
     
 //        for(var i = 1; i < a.length; i++){
 //            if(a[i+1] == a[i]){
 //                a.splice(i, 1);
 //            } 
 //        }
 //        return a;
 //    } 
function Movie(name, img, link){
	this.name = name;
	this.img = img;
	this.link = link;
}
request(url2, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			movies = $(".coverList li")
				// console.log(movies)
				for( prop in movies ){
					// console.log(prop)
					// console.log(prop.href())
					// if(isNaN(prop) == false){
					// 	// console.log(prop)
					// 	results.push(prop)
					// }
				}
				// console.log(results)
			// searchWord(search);
			movies.each(function (i, link){
				// console.log($(link).attr('href'))
				console.log($(link))
				// for(var k = 0; k < $(link).children('.js-img-lazy').length ; k ++){
				// 	console.log($(link).children('.js-img-lazy')[k])
				// }
			})
			// for(var i = 0; i < results.length; i++){
			// 	// console.log(movies[results[i]].attribs);
			// 	if(movies[results[i]].attribs.title){
			// 		// console.log(movies[results[i]].attribs);
			// 		// console.log(name)
			// 		var title = movies[results[i]].attribs.title
			// 		// console.log(title);
			// 		title = title.split(' ');
			// 		for(var j = 0 ; j < title.length ; j++){
			// 			var temp = title[j].toLowerCase();
			// 			fullTitle.push(temp);
			// 		}
			// 		//Loops to check if title match 

			// 		for(var u = 0; u < split_words.length; u ++){
			// 			for(var p = 0; p < fullTitle.length; p++){
			// 				if(split_words[u] != 'the' || 'be' || 'then' || 'how' || 'for'){
			// 					if(split_words[u] === fullTitle[p]){
			// 					search_Matrix.push(movies[results[i]].attribs)

			// 						break
			// 					}
			// 				}
			// 			}
			// 		}
			// 		fullTitle = [];

					
			// 		unique(search_Matrix)
			// 		// console.log(search_Matrix)
			// 		// var link = movies[results[i]].attribs.href
			// 		// search_Matrix.push({ title1 : link }) 
					
				// }
				
				// name = name.replace(/[^a-zA-Z ]/g, "")
				// name = name.split('');
			
				// for(var k = 0; k < name.length; k++){

				// }
			// }
			// console.log(search_Matrix)
	

	} else {
		console.log("We’ve encountered an error: " + error);
	}
});



