/**
 * WebHat Shader Properties are taken dynamically from the compiled programs
 * and later on serve as glue between the DynamicAttribute buffer and the SceneObjects
 * The original idea/src came from:
 * https://bocoup.com/weblog/counting-uniforms-in-webgl/
 **

 /**
 * Shaders consists out of Uniform and Attribute poperties
 * in WebHat these are modelled as a WHShaderPropery.
 **/
var WHShaderProperty = function(index,name,type,size,typename,dataType,numComponents, bytes){
    this.index = index;
    this.name = name;
    this.type = type;
    this.size = size;
    this.typename = typename;
    this.dataType = dataType;
    this.numComponents = numComponents;
    this.bytes = bytes;
};



/**
 * List of all the properties inside this shader
 **/
var WHShaderPropertyList = function(whCtx,glProgram){

    this.whCtx = whCtx;
    this.uniforms = [];
    this.attributes = [];

    var activeUniforms = whCtx.GL.getProgramParameter(glProgram, whCtx.GL.ACTIVE_UNIFORMS);
    var activeAttributes = whCtx.GL.getProgramParameter(glProgram, whCtx.GL.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < activeUniforms; i++) {
        var uniform = whCtx.GL.getActiveUniform(glProgram, i);
        this.uniforms.push(
            new WHShaderProperty(
                i,
                uniform.name,
                uniform.type,
                uniform.size,
                WEBGL_TYPE[uniform.type],
                WEBGL_primitive(this.whCtx.GL,uniform.type),
                WEBGL_COMP_PER_TYPE[uniform.type],
                0  // not NEEDED
            )
        );
    }

    for (var i = 0; i < activeAttributes; i++) {
        var attribute = whCtx.GL.getActiveAttrib(glProgram, i);
        this.attributes.push(
            new WHShaderProperty(
                i,
                attribute.name,
                attribute.type,
                attribute.size,
                WEBGL_TYPE[attribute.type],
                WEBGL_primitive(this.whCtx.GL,attribute.type),
                WEBGL_COMP_PER_TYPE[attribute.type],
                WEBGL_nrBytesForType(this.whCtx.GL,attribute.type)
                )
        );
    }
};





