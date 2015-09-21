/**
 * Creates a WHAttributeBufferToken object
 *
 * Every model/construction/sceneobject that is present in the buffer
 * recieves a token. This token provides their claim to a location and portion
 * in the buffer
 * @constructor
 * @this WHAttributeBufferToken
 * @param{offset} Offset in bytes.
 * @param{length} Length in bytes.
 * @param{token}  token provided by the buffer (for internal use).
 **/
var WHAttributeBufferToken = function(offset, length, token){
    this.offset = offset;
    this.length = length;
    this.token = token;
};

var WHAttributeBuffer = function(gl,size){
    this.gl = gl;
    this.memory = new LLMemory(size); // memory layout model
    this.buffer = this.gl.createBuffer();
    this.size = size;
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, this.size, this.gl.STATIC_DRAW );
};

WHAttributeBuffer.prototype.allocate = function(numBytes) {
    var memNode = this.memory.findFirst(numBytes);
    console.log("WHAttributeBuffer: " + memNode);
    if (memNode == null) {
        // TODO: Read how to copy buffers
    }else {

        return new WHAttributeBufferToken(
            memNode.offset,
            memNode.next.offset - memNode.offset,
            memNode
            );
    }
};


