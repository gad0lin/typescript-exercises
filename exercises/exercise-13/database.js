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
exports.Database = void 0;
var mz_1 = require("mz");
var Database = /** @class */ (function () {
    function Database(filename, fullTextSearchFieldNames) {
        this.filename = filename;
        this.fullTextSearchFieldNames = fullTextSearchFieldNames;
        this.records = this.readFile();
    }
    Database.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.records.filter(function (e) { return _this.match(query, e); })];
            });
        });
    };
    Database.prototype.match = function (query, element) {
        var match = false;
        if ('$and' in query) {
            var what = query.$and;
            match = this.match(what[0], element) && this.match(what[1], element);
        }
        else if ('$text' in query) {
            var matchText = query.$text;
            var matchWords = matchText.toLowerCase().split(' ');
            var matchCount = {};
            for (var _i = 0, matchWords_1 = matchWords; _i < matchWords_1.length; _i++) {
                var word = matchWords_1[_i];
                matchCount[word] = 0;
            }
            for (var _a = 0, _b = this.fullTextSearchFieldNames; _a < _b.length; _a++) {
                var key = _b[_a];
                // TODO: ?!?! ugly but couldn't make it work and be interpreted as string
                var keyContent = String(element[key]);
                var keyContentWords = keyContent.toLowerCase().split(' ');
                for (var _c = 0, matchWords_2 = matchWords; _c < matchWords_2.length; _c++) {
                    var matchWord = matchWords_2[_c];
                    if (keyContentWords.includes(matchWord)) {
                        matchCount[matchWord] += 1;
                    }
                }
            }
            for (var _d = 0, matchWords_3 = matchWords; _d < matchWords_3.length; _d++) {
                var word = matchWords_3[_d];
                if (matchCount[word] === 0) {
                    return false;
                }
            }
            return true;
        }
        else if ('$or' in query) {
            var what = query.$or;
            match = (this.match(what[0], element) || this.match(what[1], element));
        }
        else {
            match = true;
            for (var field in query) {
                var test = query[field];
                var propertyValue = element[field];
                if ('$in' in test) {
                    var values = test.$in;
                    var keyValue = element[field];
                    match = match && values.includes(keyValue);
                }
                if ('$eq' in test) {
                    var value = test.$eq;
                    match = match && propertyValue === value;
                }
                if ('$gt' in test) {
                    var value = test.$gt;
                    match = match && (propertyValue > value);
                }
                if ('$gte' in test) {
                    var value = test.$gte;
                    match = match && (propertyValue >= value);
                }
                if ('$lt' in test) {
                    var value = test.$lt;
                    match = match && (propertyValue < value);
                }
                if ('$lte' in test) {
                    var value = test.$lte;
                    match = match && (propertyValue < value);
                }
            }
        }
        return match;
    };
    Database.prototype.readFile = function () {
        var entryLines = mz_1.fs.readFileSync(this.filename).toString().split('\n').filter(function (s) { return !s.match(/^D/) && !s.match(/^[\s]*$/); }).map(function (s) { return s.substr(1); });
        var entries = [];
        for (var _i = 0, entryLines_1 = entryLines; _i < entryLines_1.length; _i++) {
            var el = entryLines_1[_i];
            console.log("zz" + el);
            var entrie = JSON.parse(el);
            entries.push(entrie);
        }
        return entries;
    };
    return Database;
}());
exports.Database = Database;
