/**
 * Creates and compile a GLSL Program
 *
 **/
var WHGLProgram = function(webhatCtx, vertexShader, fragmentShader ) {
    this.webhatCtx = webhatCtx;
    console.log(vertexShader + " : " + fragmentShader);
    this.program = initShaders( webhatCtx.GL, vertexShader, fragmentShader );
    webhatCtx.GL.useProgram( this.program );

    this.Reflect();


};

/**
 * Reflect will inspect the program and build all properties possible
 **/
WHGLProgram.prototype.Reflect = function() {
    this.propertyList = new WHShaderPropertyList(this.webhatCtx,this.program);
};