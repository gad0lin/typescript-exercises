"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];
function isAdmin(person) {
    return person.type === 'admin';
}
function isUser(person) {
    return person.type === 'user';
}
function logPerson(person) {
    var additionalInformation = '';
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    if (isUser(person)) {
        additionalInformation = person.occupation;
    }
    console.log(" - " + chalk_1.default.green(person.name) + ", " + person.age + ", " + additionalInformation);
}
console.log(chalk_1.default.yellow('Admins:'));
persons.filter(isAdmin).forEach(logPerson);
console.log();
console.log(chalk_1.default.yellow('Users:'));
persons.filter(isUser).forEach(logPerson);
// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
