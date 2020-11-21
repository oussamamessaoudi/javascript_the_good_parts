/*
    Chapter 1: Good Parts
 */
document.write("Hello World<br/>")
//Will be explained in Chapter 4
Function.prototype.method = function (name, func){
    this.prototype[name] = func
    return this;
}