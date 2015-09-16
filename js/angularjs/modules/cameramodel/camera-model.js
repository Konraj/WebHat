(function(){
	'use strict';
	
	// make the function non-anonymous
	var CameraModel = function(){
		this.x = 0;
        this.y = 0;
        this.z = 0;
        this.radius = 0;
        this.theta = 0;
        this.phi = 0;
        this.fovy = 0;
        this.near = 0;
        this.far = 0;
        this.aspect = 0;
	};
	
	var Template = function(){
		this.url = "js/angularjs/modules/cameramodel/camera-model.html";
	};
	
	// initiate module
	var module = angular.module('cameraModule', []);
    module.controller("CameraModuleController",
		['$rootScope','$scope', function($rootScope,$scope) {
      
		$scope.cameramodel = new CameraModel();
		$scope.template = new Template();
		
        // Synchronize model->view
        $scope.sync = function() {
			var cm = $rootScope.WebHat.cameraModel;
			$scope.cameramodel.x = cm.eye[0];
			$scope.cameramodel.y = cm.eye[1];
			$scope.cameramodel.z = cm.eye[2];
			$scope.cameramodel.radius = cm.radius;
			$scope.cameramodel.theta = cm.theta;
			$scope.cameramodel.phi = cm.phi;
			$scope.cameramodel.fovy = cm.fovy;
			$scope.cameramodel.near = cm.near;
			$scope.cameramodel.far = cm.far;
			$scope.cameramodel.aspect = cm.aspect;
		}
        
        // Carstesian Update
        
        // Update Eye X
		$scope.cameramodelChangeX = function() {
			var val = this.$parent.cameramodel.x;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.CartesianPosition(val,cm.eye[1],cm.eye[2]);
			}
			$scope.sync();
		};
		
		// Update Eye Y
		$scope.cameramodelChangeY = function() {
			var val = this.$parent.cameramodel.y;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.CartesianPosition(cm.eye[0],val,cm.eye[2]);
			}
			$scope.sync();
		};
		
		// Update Eye Z
		$scope.cameramodelChangeZ = function() {
			var val = this.$parent.cameramodel.z;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.CartesianPosition(cm.eye[0],cm.eye[1],val);
			}
			$scope.sync();
		};
		
		// Spherical Update
		
		// Update PHI
		$scope.cameramodelChangePhi = function() {
			var val = this.$parent.cameramodel.phi;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.SphericalPosition(val,cm.theta,cm.radius);
			}
			$scope.sync();
		};
		
		// Update THETA
		$scope.cameramodelChangeTheta = function() {
			var val = this.$parent.cameramodel.theta;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.SphericalPosition(cm.phi,val,cm.radius);
			}
			$scope.sync();
		};
		
		// Update RADIUS
		$scope.cameramodelChangeRadius = function() {
			var val = this.$parent.cameramodel.radius;
			if (!isNaN(val))
			{
				var cm = $rootScope.WebHat.cameraModel;
				cm.SphericalPosition(cm.phi,cm.theta,val);
			}
			$scope.sync();
		};
		
		// Update Lens (one-way)
		// FOV-Y
		$scope.cameramodelChangeFovy = function() {
			var val = this.$parent.cameramodel.fovy;
			var cm = $rootScope.WebHat.cameraModel;
			if (!isNaN(val)){
				cm.fovy = val;
			}
			$scope.sync();
		};
		
		// ASPECT
		$scope.cameramodelChangeAspect = function() {
			var val = this.$parent.cameramodel.aspect;
			var cm = $rootScope.WebHat.cameraModel;
			if (!isNaN(val)){
				cm.aspect = val;
			}
			$scope.sync();
		};
		
		// NEAR
		$scope.cameramodelChangeNear = function() {
			var val = this.$parent.cameramodel.near;
			var cm = $rootScope.WebHat.cameraModel;
			if (!isNaN(val)){
				cm.near = val;
			}
			$scope.sync();
		};
		
		// FAR
		$scope.cameramodelChangeFar= function() {
			var val = this.$parent.cameramodel.far;
			var cm = $rootScope.WebHat.cameraModel;
			if (!isNaN(val)){
				cm.far = val;
			}
			$scope.sync();
		};
		
    }]);
})();
