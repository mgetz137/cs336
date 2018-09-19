/*
/Matthew Getz
/cs336
/lab02
/9-12-18
*/

//Person object
function Person(name, birthdate, friends){
	
	//variables
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [friends];
}

//prototyped greet function
Person.prototype.greet = function(){
	console.log("Hello, I am a person!");
}

//prototyped add a friend function
Person.prototype.addFriend = function(newFriend){
	this.friends.push(newFriend);
}

//prototyped calculate age function from Naveen Jose
Person.prototype.getAge = function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//testing of person
var myFriends = "Gavin";
var d = new Date("04/03/1996");
var p1 = new Person("Matt", d, myFriends);
console.log(p1);
p1.greet();
p1.addFriend("Jordan");
console.log(p1);
console.log('age: ' + p1.getAge(this.birthdate));

//Student object
function Student(name, birthdate, friends, study){
	Person.call(this, name, birthdate, friends);
	this.study = study;
}

//prototype greeting for a student
Student.prototype.greet = function(){
	console.log("Hello, I am a student!");
}

//Student Testing
var studentFriends = "Andrew";
var s1 = new Student("Matthew", d, studentFriends, "Computer Science");
console.log(s1);
s1.greet();
s1.addFriend("David");



