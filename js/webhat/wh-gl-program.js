/**
 * Creates and compile a GLSL Program
 *
 **/
var WHGLProgram = function(webhatCtx, vertexShader, fragmentShader ) {
    this.webhatCtx = webhatCtx;
    this.program = initShaders( webhatCtx.GL, vertexShader, fragmentShader );
    webhatCtx.GL.useProgram( this.program );

    this.Reflect();
};

/**
 * Reflect will inspect the program and build all properties possible
 **/
WHGLProgram.prototype.Reflect = function() {
    this.propertyList = new WHShaderPropertyList(this.webhatCtx,this.program);
    this.dynamicAttributeBuffer = new WHDynamicAttributeBuffer(this);
};

WHGLProgram.prototype.gl = function() {
    return this.webhatCtx.GL;
}
