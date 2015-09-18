 /**
  * Taken from the WebGl spec:
  * http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
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

var WEBGL_COMP_PER_TYPE = {
    0x8B50: 2,  //'FLOAT_VEC2',
    0x8B51: 3, //'FLOAT_VEC3',
    0x8B52: 4, //'FLOAT_VEC4',
    0x8B53: 2, //'INT_VEC2',
    0x8B54: 3, //'INT_VEC3',
    0x8B55: 4, //'INT_VEC4',
    0x8B56: 1, //'BOOL',
    0x8B57: 2, //'BOOL_VEC2',
    0x8B58: 3, //'BOOL_VEC3',
    0x8B59: 4, //'BOOL_VEC4',
    0x8B5A: 4, //'FLOAT_MAT2',
    0x8B5B: 9, //'FLOAT_MAT3',
    0x8B5C: 16, //'FLOAT_MAT4',
    0x8B5E: 1, //'SAMPLER_2D',  TODO: CHECK VALUE
    0x8B60: 1, //'SAMPLER_CUBE', TODO: CHECK VALUE
    0x1400: 1, //'BYTE',
    0x1401: 1, //'UNSIGNED_BYTE',
    0x1402: 1, //'SHORT',
    0x1403: 1, //'UNSIGNED_SHORT',
    0x1404: 1, //'INT',
    0x1405: 1, //'UNSIGNED_INT',
    0x1406: 1, //'FLOAT'
 };



var WEBGL_BYTES_PER_TYPE = {

    0x1400 : 1, // const GLenum BYTE
    0x1401 : 1, // const GLenum UNSIGNED_BYTE
    0x1402 : 2, // const GLenum SHORT  TODO: CHECK VALUE
    0x1403 : 2, // const GLenum UNSIGNED_SHORT  TODO: CHECK VALUE
    0x1404 : 4, // const GLenum INT  TODO: CHECK VALUE
    0x1405 : 4, // const GLenum UNSIGNED_INT  TODO: CHECK VALUE
    0x1406 : 4 // const GLenum FLOAT
};


var WEBGL_primitive = function(gl,type){
    switch(type)
    {
        case 0x8B50: return gl.FLOAT; //'FLOAT_VEC2',
        case 0x8B51: return gl.FLOAT; //'FLOAT_VEC3',
        case 0x8B52: return gl.FLOAT; //'FLOAT_VEC4',
        case 0x8B53: return gl.INT; //'INT_VEC2',
        case 0x8B54: return gl.INT; //'INT_VEC3',
        case 0x8B55: return gl.INT; //'INT_VEC4',
        case 0x8B56: return gl.BOOL; //'BOOL',
        case 0x8B57: return gl.BOOL; //'BOOL_VEC2',
        case 0x8B58: return gl.BOOL; //'BOOL_VEC3',
        case 0x8B59: return gl.BOOL; //'BOOL_VEC4',
        case 0x8B5A: return gl.FLOAT; //'FLOAT_MAT2',
        case 0x8B5B: return gl.FLOAT; //'FLOAT_MAT3',
        case 0x8B5C: return gl.FLOAT; //'FLOAT_MAT4',
        case 0x8B5E: return gl.INT; //'SAMPLER_2D', TODO: CHECK VALUE
        case 0x8B60: return gl.INT; //'SAMPLER_CUBE', TODO: CHECK VALUE
        case 0x1400: return gl.BYTE; //'BYTE',
        case 0x1401: return gl.UNSIGNED_BYTE; //'UNSIGNED_BYTE',
        case 0x1402: return gl.SHORT; //'SHORT',
        case 0x1403: return gl.UNSIGNED_SHORT; //'UNSIGNED_SHORT',
        case 0x1404: return gl.INT; //'INT',
        case 0x1405: return gl.UNSIGNED_INT; //'UNSIGNED_INT',
        case 0x1406: return gl.FLOAT; //'FLOAT'
    }

    throw "WEBGL_primitive [unknown input type]";
};

var WEBGL_nrBytesForType = function(gl,type){
    return  WEBGL_BYTES_PER_TYPE[WEBGL_primitive(gl,type)] * WEBGL_COMP_PER_TYPE[type];
};