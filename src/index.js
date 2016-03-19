function Try(fn){
    if(!(this instanceof Try)){
        return new Try(fn);
    }
    try{
        this.value = typeof fn === 'function' ? fn():fn;
    }catch(e){
        this.error = e;
    }
}
Try.prototype.value = null;
Try.prototype.error = null;
Try.prototype.catch=function(v){
    return this.value || v;
};
Try.prototype.catchFn=function(v){
    return this.catch(v(this.error));
};
Try.prototype.catchCase=function(e,v){
    var _v = v || e;
    e = v? e : Object;
    if(this.error instanceof e){
        this.value = _v;
        return this;
    }
    return this;
};
Try.prototype.catchCaseFn=function(e,v){
    var _v = v || e;
    e = v? e : Object;
    if(this.error instanceof e){
        this.value = _v(this.error);
        return this;
    }
    return this;
};


module.exports = Try;