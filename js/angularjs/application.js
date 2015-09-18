(function(){
	'use strict';
	
	angular.module('webhat',['cameraModule']).
	
	config(['$routeProvider', function ($routeProvider) {
   	}]);
	
	// Create the webhat program module and attach the webhat ctx
	angular.module('webhat').run(function($rootScope){
		
		// Real WebHat Context
		$rootScope.WebHat = new WHContext($("#wh-canvas")[0]);
		// The Angular look-alike
		$rootScope.whng = {};

	});
})();
