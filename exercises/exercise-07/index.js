"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    {
        type: 'powerUser',
        name: 'Nikki Stone',
        age: 45,
        role: 'Moderator',
        occupation: 'Cat groomer'
    }
];
function isAdmin(person) {
    return person.type === 'admin';
}
function isUser(person) {
    return person.type === 'user';
}
function isPowerUser(person) {
    return person.type === 'powerUser';
}
function logPerson(person) {
    var additionalInformation = '';
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    if (isUser(person)) {
        additionalInformation = person.occupation;
    }
    if (isPowerUser(person)) {
        additionalInformation = person.role + ", " + person.occupation;
    }
    console.log(chalk_1.default.green(person.name) + ", " + person.age + ", " + additionalInformation);
}
console.log(chalk_1.default.yellow('Admins:'));
persons.filter(isAdmin).forEach(logPerson);
console.log();
console.log(chalk_1.default.yellow('Users:'));
persons.filter(isUser).forEach(logPerson);
console.log();
console.log(chalk_1.default.yellow('Power users:'));
persons.filter(isPowerUser).forEach(logPerson);
// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/utility-types.html
