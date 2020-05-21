"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
function logUser(user) {
    var pos = users.indexOf(user) + 1;
    console.log(" - #" + pos + " User: " + chalk_1.default.green(user.name) + ", " + user.age + ", " + user.occupation);
}
function logAdmin(admin) {
    var pos = admins.indexOf(admin) + 1;
    console.log(" - #" + pos + " Admin: " + chalk_1.default.green(admin.name) + ", " + admin.age + ", " + admin.role);
}
var admins = [
    {
        type: 'admin',
        name: 'Will Bruces',
        age: 30,
        role: 'Overseer'
    },
    {
        type: 'admin',
        name: 'Steve',
        age: 40,
        role: 'Steve'
    }
];
var users = [
    {
        type: 'user',
        name: 'Moses',
        age: 70,
        occupation: 'Desert guide'
    },
    {
        type: 'user',
        name: 'Superman',
        age: 28,
        occupation: 'Ordinary person'
    }
];
function swap(v1, v2) {
    return [v2, v1];
}
function test1() {
    console.log(chalk_1.default.yellow('test1:'));
    var _a = swap(admins[0], users[1]), secondUser = _a[0], firstAdmin = _a[1];
    logUser(secondUser);
    logAdmin(firstAdmin);
}
function test2() {
    console.log(chalk_1.default.yellow('test2:'));
    var _a = swap(users[0], admins[1]), secondAdmin = _a[0], firstUser = _a[1];
    logAdmin(secondAdmin);
    logUser(firstUser);
}
function test3() {
    console.log(chalk_1.default.yellow('test3:'));
    var _a = swap(users[0], users[1]), secondUser = _a[0], firstUser = _a[1];
    logUser(secondUser);
    logUser(firstUser);
}
function test4() {
    console.log(chalk_1.default.yellow('test4:'));
    var _a = swap(admins[1], admins[0]), firstAdmin = _a[0], secondAdmin = _a[1];
    logAdmin(firstAdmin);
    logAdmin(secondAdmin);
}
function test5() {
    console.log(chalk_1.default.yellow('test5:'));
    var _a = swap(123, 'Hello World'), stringValue = _a[0], numericValue = _a[1];
    console.log(" - String: " + stringValue);
    console.log(" - Numeric: " + numericValue);
}
[test1, test2, test3, test4, test5].forEach(function (test) { return test(); });
// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
// https://www.typescriptlang.org/docs/handbook/generics.html
