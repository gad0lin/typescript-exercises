"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var path = require("path");
var chai_1 = require("chai");
function testUsersDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var usersDatabase, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    usersDatabase = new database_1.Database(path.join(__dirname, 'users.txt'), ['name', 'occupation']);
                    // $eq operator means "===", syntax {fieldName: {$gt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/eq/
                    _a = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ occupation: { $eq: 'Magical entity' } })];
                case 1:
                    // $eq operator means "===", syntax {fieldName: {$gt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/eq/
                    _a.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([6, 8]);
                    _b = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ age: { $eq: 31 }, name: { $eq: 'Inspector Gadget' } })];
                case 2:
                    _b.apply(void 0, [(_l.sent())[0]._id]).to.equal(5);
                    // $gt operator means ">", syntax {fieldName: {$gt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/gt/
                    _c = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ age: { $gt: 30 } })];
                case 3:
                    // $gt operator means ">", syntax {fieldName: {$gt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/gt/
                    _c.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([3, 5, 6, 8]);
                    // $lt operator means "<", syntax {fieldName: {$lt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/lt/
                    _d = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ age: { $lt: 30 } })];
                case 4:
                    // $lt operator means "<", syntax {fieldName: {$lt: value}}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/lt/
                    _d.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 2, 4, 7]);
                    // $and condition is satisfied when all the nested conditions are satisfied: {$and: [condition1, condition2, ...]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/and/
                    // These examples return the same result:
                    //   usersDatabase.find({age: {$eq: 31}, name: {$eq: 'Inspector Gadget'}});
                    //   usersDatabase.find({$and: [{age: {$eq: 31}}, {name: {$eq: 'Inspector Gadget'}}]});
                    _e = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({
                            $and: [
                                { age: { $gt: 30 } },
                                { age: { $lt: 40 } }
                            ]
                        })];
                case 5:
                    // $and condition is satisfied when all the nested conditions are satisfied: {$and: [condition1, condition2, ...]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/and/
                    // These examples return the same result:
                    //   usersDatabase.find({age: {$eq: 31}, name: {$eq: 'Inspector Gadget'}});
                    //   usersDatabase.find({$and: [{age: {$eq: 31}}, {name: {$eq: 'Inspector Gadget'}}]});
                    _e.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([5, 6]);
                    // $or condition is satisfied when at least one nested condition is satisfied: {$or: [condition1, condition2, ...]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/or/
                    _f = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({
                            $or: [
                                { age: { $gt: 90 } },
                                { age: { $lt: 30 } }
                            ]
                        })];
                case 6:
                    // $or condition is satisfied when at least one nested condition is satisfied: {$or: [condition1, condition2, ...]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/or/
                    _f.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 2, 4, 7, 8]);
                    // $text operator means full text search. For simplicity this means finding words from the full-text search
                    // fields which are specified in the Database constructor. No stemming or language processing other than
                    // being case insensitive is not required.
                    // Syntax {$text: 'Hello World'} - this return all records having both words in its full-text search fields.
                    // It is also possible that queried words are spread among different full-text search fields.
                    _g = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ $text: 'max' })];
                case 7:
                    // $text operator means full text search. For simplicity this means finding words from the full-text search
                    // fields which are specified in the Database constructor. No stemming or language processing other than
                    // being case insensitive is not required.
                    // Syntax {$text: 'Hello World'} - this return all records having both words in its full-text search fields.
                    // It is also possible that queried words are spread among different full-text search fields.
                    _g.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 7]);
                    _h = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ $text: 'Hey' })];
                case 8:
                    _h.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([]);
                    // $in operator checks if entry field value is within the specified list of accepted values.
                    // Syntax {fieldName: {$in: [value1, value2, value3]}}
                    // Equivalent to {$or: [{fieldName: {$eq: value1}}, {fieldName: {$eq: value2}}, {fieldName: {$eq: value3}}]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/in/
                    _j = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ _id: { $in: [0, 1, 2] } })];
                case 9:
                    // $in operator checks if entry field value is within the specified list of accepted values.
                    // Syntax {fieldName: {$in: [value1, value2, value3]}}
                    // Equivalent to {$or: [{fieldName: {$eq: value1}}, {fieldName: {$eq: value2}}, {fieldName: {$eq: value3}}]}
                    // see more https://docs.mongodb.com/manual/reference/operator/query/in/
                    _j.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 2]);
                    _k = chai_1.expect;
                    return [4 /*yield*/, usersDatabase.find({ age: { $in: [31, 99] } })];
                case 10:
                    _k.apply(void 0, [(_l.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([5, 8]);
                    return [2 /*return*/];
            }
        });
    });
}
function testAdminsDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var adminsDatabase, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    adminsDatabase = new database_1.Database(path.join(__dirname, 'admins.txt'), ['name', 'role']);
                    _a = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ role: { $eq: 'Administrator' } })];
                case 1:
                    _a.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 6]);
                    _b = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ age: { $eq: 51 }, name: { $eq: 'Bill Gates' } })];
                case 2:
                    _b.apply(void 0, [(_m.sent())[0]._id]).to.equal(7);
                    _c = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ age: { $gt: 30 } })];
                case 3:
                    _c.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 2, 3, 6, 7, 8]);
                    _d = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ age: { $lt: 30 } })];
                case 4:
                    _d.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([5]);
                    _e = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({
                            $and: [
                                { age: { $gt: 30 } },
                                { age: { $lt: 40 } }
                            ]
                        })];
                case 5:
                    _e.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 8]);
                    _f = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({
                            $or: [
                                { age: { $lt: 30 } },
                                { age: { $gt: 60 } }
                            ]
                        })];
                case 6:
                    _f.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([2, 5]);
                    _g = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ $text: 'WILL' })];
                case 7:
                    _g.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([4, 6]);
                    _h = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ $text: 'Administrator' })];
                case 8:
                    _h.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 6]);
                    _j = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ $text: 'Br' })];
                case 9:
                    _j.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([]);
                    _k = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ _id: { $in: [0, 1, 2, 3] } })];
                case 10:
                    _k.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([0, 2, 3]);
                    _l = chai_1.expect;
                    return [4 /*yield*/, adminsDatabase.find({ age: { $in: [30, 28] } })];
                case 11:
                    _l.apply(void 0, [(_m.sent()).map(function (_a) {
                            var _id = _a._id;
                            return _id;
                        })]).to.have.same.members([4, 5]);
                    return [2 /*return*/];
            }
        });
    });
}
Promise.all([
    testUsersDatabase(),
    testAdminsDatabase()
]).then(function () { return console.log('All tests have succeeded, congratulations!'); }, function (e) { return console.error(e.stack); });
