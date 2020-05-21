"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var admins = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];
var users = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];
function requestAdmins(callback) {
    callback({
        status: 'success',
        data: admins
    });
}
// type UsersApiResponse = (
//     {
//         status: 'success';
//         data: User[];
//     } |
//     {
//         status: 'error';
//         error: string;
//     }
// );
function requestUsers(callback) {
    callback({
        status: 'success',
        data: users
    });
}
function requestCurrentServerTime(callback) {
    callback({
        status: 'success',
        data: Date.now()
    });
}
function requestCoffeeMachineQueueLength(callback) {
    callback({
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    });
}
function logPerson(person) {
    console.log(" - " + chalk_1.default.green(person.name) + ", " + person.age + ", " + (person.type === 'admin' ? person.role : person.occupation));
}
function startTheApp(callback) {
    requestAdmins(function (adminsResponse) {
        console.log(chalk_1.default.yellow('Admins:'));
        if (adminsResponse.status === 'success') {
            adminsResponse.data.forEach(logPerson);
        }
        else {
            return callback(new Error(adminsResponse.error));
        }
        console.log();
        requestUsers(function (usersResponse) {
            console.log(chalk_1.default.yellow('Users:'));
            if (usersResponse.status === 'success') {
                usersResponse.data.forEach(logPerson);
            }
            else {
                return callback(new Error(usersResponse.error));
            }
            console.log();
            requestCurrentServerTime(function (serverTimeResponse) {
                console.log(chalk_1.default.yellow('Server time:'));
                if (serverTimeResponse.status === 'success') {
                    console.log("   " + new Date(serverTimeResponse.data).toLocaleString());
                }
                else {
                    return callback(new Error(serverTimeResponse.error));
                }
                console.log();
                requestCoffeeMachineQueueLength(function (coffeeMachineQueueLengthResponse) {
                    console.log(chalk_1.default.yellow('Coffee machine queue length:'));
                    if (coffeeMachineQueueLengthResponse.status === 'success') {
                        console.log("   " + coffeeMachineQueueLengthResponse.data);
                    }
                    else {
                        return callback(new Error(coffeeMachineQueueLengthResponse.error));
                    }
                    callback(null);
                });
            });
        });
    });
}
startTheApp(function (e) {
    console.log();
    if (e) {
        console.log("Error: \"" + e.message + "\", but it's fine, sometimes errors are inevitable.");
    }
    else {
        console.log('Success!');
    }
});
// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/generics.html
