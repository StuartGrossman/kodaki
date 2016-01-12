(function(){
	'use strict'
	angular.module('app').controller('MovieSearchController', MovieSearchController);
	MovieSearchController.$inject = ['$state', 'HomeFactory', '$http'];

	function MovieSearchController($state, HomeFactory, $http){
		var vm = this;
		console.log('in search movie')
		vm.searchMovies = function(){
			console.log('searching for movie')
			
			var movie = { name : vm.movieName}
			console.log(movie)
			$http.post('/find/', movie).success(function(res){
				console.log(res)
				// vm.results = res
				// vm.links = vm.results.count.links
				// console.log(vm.links)
			})
		}

		
	}

})()
