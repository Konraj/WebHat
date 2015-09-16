/**
 * Creates a WebHat Context object
*
* @constructor
* @this WHContext
* @param{canvas} canvas The Canvas DOM object
**/ 
var WHContext = function(canvas) {
	this.canvas = canvas;
	this.cameraModel = new WHCameraModel();	
};
