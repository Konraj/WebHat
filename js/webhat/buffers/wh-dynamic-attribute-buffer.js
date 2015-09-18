/**
 * The Dynamic Attribute Buffer models a buffer that is analogue
 * to a WHGLProgram's attributes. This allows for secure attribute
 * transaction/
 **/

var WHAttributePointer = function(name,location,count,type,normalize,stride,offset, bytes){
    this.name = name;
    this.location = location;
    this.count = count;
    this.type = type;
    this.normalize = normalize;
    this.stride = stride;
    this.offset = offset;
    this.bytes = bytes;
};

/**
 * Attributes should be order by there location/index inside the buffer
 **/
function WHAttributePointerCompare(a,b) {
  if (a.location < b.location)
    return -1;
  if (a.location > b.location)
    return 1;
  return 0;
}


 /**
  * Creates a WHDynamicAttributeBuffer object
 *
 * @constructor
 * @this WHDynamicAttributeBuffer
 * @param{WHGLProgram} The WebHatGLProgram object.
 **/
 var WHDynamicAttributeBuffer = function(program){
    this.program = program;
    this.attributePointers = [];
    this.init();
 };

 /**
  * Initializes the internal buffer
  **/
 WHDynamicAttributeBuffer.prototype.init = function() {
    var attribs = this.program.propertyList.attributes;
    var gl = this.program.gl();

    var bytes = 0;

    // transform the WHShaderProperties to WHAttributePointers
    for (var idx = 0; idx != attribs.length; idx ++) {
        var att = attribs[idx];
        this.attributePointers.push(
            new WHAttributePointer(
                att.name,
                gl.getAttribLocation( this.program.program, att.name ),
                att.numComponents,
                att.dataType,
                false,
                // calculate stride and offset in next iteration/based on ordering
                0,
                0,
                att.bytes
            )
        );
        bytes += att.bytes;
    }

    // order the attributes (layout in the buffer)
    this.attributePointers.sort(WHAttributePointerCompare);

    // update position/offset in the buffer
    var offset = 0;
    for (var idx = 0; idx != this.attributePointers.length; idx ++) {
        this.attributePointers[idx].stride = bytes;
        this.attributePointers[idx].offset = offset;
        offset += this.attributePointers[idx].bytes;
    }
 };