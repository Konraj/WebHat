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


/**
 * WHAttributeBuffer encapsulates both the
 * ARRAY_BUFFER and a memory layout. This layout
 * is used to order and store objects stored in this ARRAY_BUFFER.
 * @constructor
 * @this WHAttributeBuffer
 * @param{gl} gl context.
 * @param{size} The initial size in bytes.
 **/
var WHAttributeBuffer = function(gl,size){
    this.gl = gl;
    this.memory = new LLMemory(size); // memory layout model
    this.buffer = this.gl.createBuffer();
    this.size = size;
    this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );
    this.gl.bufferData( this.gl.ARRAY_BUFFER, this.size, this.gl.STATIC_DRAW );
};

/**
 * allocate
 * Tries to allocate a number of bytes from the internal
 * memoy layout.
 **/
WHAttributeBuffer.prototype.allocate = function(numBytes) {
    var memNode = this.memory.findFirst(numBytes);
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

/**
 * free
 * frees the memory associated with this wttributeBufferToken
 * @this WHAttributeBuffer
 * @param{token} WHAttributeBufferToken
 **/
WHAttributeBuffer.prototype.free = function(token){
    this.memory.free(attributeBuffer.memNode);
}
