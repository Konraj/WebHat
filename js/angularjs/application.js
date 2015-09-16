(function(){
	'use strict';
	
	angular.module('webhat',['cameraModule']).
	
	config(['$routeProvider', function ($routeProvider) {
   	}]);
	
	// Create the webhat program module and attach the webhat ctx
	angular.module('webhat').run(function($rootScope){
		
		// Real WebHat Context
		$rootScope.WebHat = new WHContext($( "#wh-canvas" ));
		// The Angular look-alike
		$rootScope.whng = {};
		
		
		$rootScope.ng_template_west = "ng-template-camera-model";
	});
})();
