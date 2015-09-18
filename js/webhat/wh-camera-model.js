/**
 * Creates a WebHat Camera Model
 *
 * @constructor
 * @this WHCameraModel
 **/ 
var WHCameraModel = function() {
	
	// Camera
	this.at = vec3(0.0, 0.0, 0.0);
	this.up = vec3(0.0, 1.0, 0.0);
	this.eye = vec3(0,0,1);

    this.RecalculateSpherical();
		
	// Lens 
	this.fovy = 45.0;  	// Field-of-view in Y direction angle (in degrees)
	this.aspect = 1.0;  // Viewport aspect ratio
	this.near = 0.1; 	// clipping plane
	this.far = 7.0;		// clipping plane
	
};

/**
 * 
 * Returns the modelview matrix
 **/ 
WHCameraModel.prototype.modelViewMatrix = function () {
	return lookAt(this.eye, this.at, this.up);
};

/**
 * Returns the projection matrix
 **/
WHCameraModel.prototype.projectionMatrix = function () {
	return perspective(this.fovy, this.aspect, this.near, this.far);
};

/**
 * Set's the camera in terms of cartesian coordinates
 **/
WHCameraModel.prototype.CartesianPosition = function(x,y,z) {
	this.eye = vec3(x,y,z);
	
	this.RecalculateSpherical();
};

/**
 * Recalculate the Spherical coordinates
 **/
 WHCameraModel.prototype.RecalculateSpherical = function() {
	this.radius = Math.sqrt(dot(this.eye,this.eye));
    this.theta = Math.acos(this.eye[1]/this.radius);
	this.phi = Math.atan2(this.eye[0],this.eye[2]);
};

/**
 * Set's the camera in terms of spherical coordinates
 **/
WHCameraModel.prototype.SphericalPosition = function (phi, theta, radius) {
	this.radius = radius
    this.theta = theta;
    this.phi = phi;
	
	this.RecalculateCartesian();
};

/**
 * Recalculate the Cartesian coordinates
 **/
 WHCameraModel.prototype.RecalculateCartesian = function () {    
    this.eye = vec3(
		Math.cos(this.phi) * Math.sin(this.theta) * this.radius,
		Math.cos(this.theta) * this.radius,
		Math.sin(this.phi) * Math.sin(this.theta) * this.radius
    );
};





