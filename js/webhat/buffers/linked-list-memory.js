/**
 * LLMemoryNode,
 *
 * describes a linked-list-memory node.
 * Whenever a node[space in buffer] is requested the user
 * receives the corresponding MemoryNode
 **/
var LLMemoryNode = function(offset,free) {
    this.offset = offset;
    this.free = free;
    this.next = null;
    this.prev = null;
    this.data = null;
};

/**
 * The Linked-List Memory class
 * simulates the design of an OpenGL buffer
 **/
var LLMemory = function(size){
    this.root = new LLMemoryNode(0,false);
    this.root.data = "Root";

    this.head = new LLMemoryNode(0,true);
    this.head.data = "Head"; // will be overidden;
    this.tail = new LLMemoryNode(size,false);
    this.tail.data = "Tail";

    this.root.next = this.head;
    this.head.prev = this.root;
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.cid  = 0;
};

/**
 * Increase the amount of memory
 **/
LLMemory.prototype.increase = function(increaseSize) {
    if(this.tail.free){
        this.tail.offset += increaseSize;
    }else {
        this.tail.next = new LLMemoryNode(this.tail.size + increaseSize,false);
        this.tail.next.prev = this.tail;
        this.free = true;
        this.tail = this.tail.next;
    }
};

/**
 * Free the memory associated with this node
 **/
LLMemory.prototype.free = function(llmnode){
    //Root and tail are available both set to free = false

    llmnode.free = true;
    var prev = llmnode.prev;
    var next = llmnode.next;

    // can merge with next?
    if (next != null && next.free) {
       prev.next = llmnode.next;
       next.prev = prev;
       prev.next.offset = llmnode.offset;
    }

    // are prev and next free?
    // then remove next
    if (prev.free && prev.next.free)
    {
        prev.next = prev.next.next;
        prev.next.prev = prev;
    }

    if (prev == this.root)
        this.root.next.offset = 0;
};

/**
 * Request/Allocate an amount of data
 **/
LLMemory.prototype.allocate = function(size){
    return this.findFirst(size);
}

/**
 * Retrieves the first (partial)node that has the required
 * capacity
 **/
LLMemory.prototype.findFirst = function(size) {
    var current = this.root;
    while (current.next != this.tail)
    {
        current = current.next;

        var space =  current.next.offset - current.offset;
        if (current.free && space >= size)
        {
            var exceeded = space - size;
            if (exceeded > 0)
            {
                var llmn = new LLMemoryNode(current.offset + size, true);

                llmn.next = current.next;
                llmn.next.prev = llmn;

                current.next = llmn;
                llmn.prev = current;
            }
            current.free = false;
            current.data = this.cid;
            return current;
        }
    }
    return null;
};