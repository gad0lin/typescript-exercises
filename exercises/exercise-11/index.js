"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var stats_1 = require("stats");
var admins = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'admin', name: 'Steve', age: 40, role: 'Steve' },
    { type: 'admin', name: 'Will Bruces', age: 30, role: 'Overseer' },
    { type: 'admin', name: 'Superwoman', age: 28, role: 'Customer support' }
];
var users = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'user', name: 'Moses', age: 70, occupation: 'Desert guide' },
    { type: 'user', name: 'Superman', age: 28, occupation: 'Ordinary person' },
    { type: 'user', name: 'Inspector Gadget', age: 31, occupation: 'Undercover' }
];
function logUser(user) {
    if (!user) {
        console.log(' - none');
        return;
    }
    var pos = users.indexOf(user) + 1;
    console.log(" - #" + pos + " User: " + chalk_1.default.green(user.name) + ", " + user.age + ", " + user.occupation);
}
function logAdmin(admin) {
    if (!admin) {
        console.log(' - none');
        return;
    }
    var pos = admins.indexOf(admin) + 1;
    console.log(" - #" + pos + " Admin: " + chalk_1.default.green(admin.name) + ", " + admin.age + ", " + admin.role);
}
var compareUsers = function (a, b) { return a.age - b.age; };
var compareAdmins = function (a, b) { return a.age - b.age; };
var colorizeIndex = function (value) { return chalk_1.default.red(String(value + 1)); };
console.log(chalk_1.default.yellow('Youngest user:'));
logUser(stats_1.getMinElement(users, compareUsers));
console.log(" - was " + colorizeIndex(stats_1.getMinIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Median user:'));
logUser(stats_1.getMedianElement(users, compareUsers));
console.log(" - was " + colorizeIndex(stats_1.getMedianIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Oldest user:'));
logUser(stats_1.getMaxElement(users, compareUsers));
console.log(" - was " + colorizeIndex(stats_1.getMaxIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Average user age:'));
console.log(" - " + chalk_1.default.red(String(stats_1.getAverageValue(users, function (_a) {
    var age = _a.age;
    return age;
}))) + " years");
console.log();
console.log(chalk_1.default.yellow('Youngest admin:'));
logAdmin(stats_1.getMinElement(admins, compareAdmins));
console.log(" - was " + colorizeIndex(stats_1.getMinIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Median admin:'));
logAdmin(stats_1.getMedianElement(admins, compareAdmins));
console.log(" - was " + colorizeIndex(stats_1.getMedianIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Oldest admin:'));
logAdmin(stats_1.getMaxElement(admins, compareAdmins));
console.log(" - was " + colorizeIndex(stats_1.getMaxIndex(users, compareUsers)) + "th to register");
console.log();
console.log(chalk_1.default.yellow('Average admin age:'));
console.log(" - " + chalk_1.default.red(String(stats_1.getAverageValue(admins, function (_a) {
    var age = _a.age;
    return age;
}))) + " years");
