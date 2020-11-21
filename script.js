/*
    Chapter 1: Good Parts
 */
document.write("Hello World<br/>")
//Will be explained in Chapter 4
Function.prototype.method = function (name, func){
    this.prototype[name] = func
    return this;
}
/*
    Chapter 3: Objects
 */
console.log("*-*-* Chapter 3: Objects *-*-*")
var empty_object = {};
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
}
var flight = {
    airline: 'Oceanic',
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
// Retrieval with default value
var middle_name = stooge["middle-name"] || "(none)"
// Update if not already there it will be added
stooge["first-name"] = 'Jerome';
stooge["middle-name"] = 'Lester';
stooge.nickname = 'Curly';
flight.equipement = {
    model: 'Boeing 777'
};
flight.status = 'overdue';
// Prototype
if(typeof Object.create !== 'function'){
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry'
another_stooge['middle-name'] = 'Moses'
another_stooge.nickname = 'Moe'
stooge.profession = 'actor';
// another_stooge.profession is 'actor'

// Enumeration
console.log("*** Enumeration ***")
var name;
console.log('another_stooge', another_stooge)
for (name in another_stooge){
    if(typeof another_stooge[name] !== 'function'){
        console.log(name, ":", another_stooge[name])
    }
}
console.log("-- Ordered properties --")
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for(i = 0; i < properties.length; i++){
    console.log(properties[i], ":", another_stooge[properties[i]])
}
// Delete
console.log("*** Delete ***")
console.log("another_stooge.nickname:", another_stooge.nickname, "is equal to Moe");
delete another_stooge.nickname;
console.log("another_stooge.nickname:", another_stooge.nickname, "is equal to Curly");