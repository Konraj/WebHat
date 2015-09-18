/**
 * WebHat Shader Properties are taken dynamically from the compiled programs
 * and later on serve as glue between the DynamicAttribute buffer and the SceneObjects
 * The original idea/src came from:
 * https://bocoup.com/weblog/counting-uniforms-in-webgl/
 **/


 /** Taken from the WebGl spec:
  *http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
  **/
    var WEBGL_TYPE = {
        0x8B50: 'FLOAT_VEC2',
        0x8B51: 'FLOAT_VEC3',
        0x8B52: 'FLOAT_VEC4',
        0x8B53: 'INT_VEC2',
        0x8B54: 'INT_VEC3',
        0x8B55: 'INT_VEC4',
        0x8B56: 'BOOL',
        0x8B57: 'BOOL_VEC2',
        0x8B58: 'BOOL_VEC3',
        0x8B59: 'BOOL_VEC4',
        0x8B5A: 'FLOAT_MAT2',
        0x8B5B: 'FLOAT_MAT3',
        0x8B5C: 'FLOAT_MAT4',
        0x8B5E: 'SAMPLER_2D',
        0x8B60: 'SAMPLER_CUBE',
        0x1400: 'BYTE',
        0x1401: 'UNSIGNED_BYTE',
        0x1402: 'SHORT',
        0x1403: 'UNSIGNED_SHORT',
        0x1404: 'INT',
        0x1405: 'UNSIGNED_INT',
        0x1406: 'FLOAT'
    };

/**
 * Shaders consists out of Uniform and Attribute poperties
 * in WebHat these are modelled as a WHShaderPropery.
 **/
var WHShaderProperty = function(index,name,type,size,typename){
    this.index = index;
    this.name = name;
    this.type = type;
    this.size = size;
    this.typename = typename;
};

/**
 * List of all the properties inside this shader
 **/
var WHShaderPropertyList = function(whCtx,glProgram){

    this.uniforms = [];
    this.attributes = [];

    var activeUniforms = whCtx.GL.getProgramParameter(glProgram, whCtx.GL.ACTIVE_UNIFORMS);
    var activeAttributes = whCtx.GL.getProgramParameter(glProgram, whCtx.GL.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < activeUniforms; i++) {
        var uniform = whCtx.GL.getActiveUniform(glProgram, i);
        this.uniforms.push(
            new WHShaderProperty(i,uniform.name,uniform.type,uniform.size,WEBGL_TYPE[uniform.type])
        );
    }

    for (var i = 0; i < activeAttributes; i++) {
        var attribute = whCtx.GL.getActiveAttrib(glProgram, i);
        this.attributes.push(
            new WHShaderProperty(i,attribute.name,attribute.type,attribute.size,WEBGL_TYPE[attribute.type])
        );
    }
};

