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
	this.shaderProviderFactory = new WHShaderProviderFactory();

    // Setup the GL Context
    this.GL = WebGLUtils.setupWebGL( this.canvas );
    if ( !this.GL ) { alert( "WebGL isn't available" ); }
};
