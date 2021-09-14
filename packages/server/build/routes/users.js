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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_1 = __importDefault(require("express"));
var User_js_1 = require("../models/User.js");
var usersRouter = express_1["default"].Router();
usersRouter.route('/').get(function (req, res) {
    User_js_1.User.find()
        .then(function (users) { return res.json(users); })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
});
usersRouter.route('/getByEmail').post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("params", req.body.email);
        console.log("in get by email route:", req.body.email);
        User_js_1.User.findOne({ 'email': req.body.email })
            .then(function (user) { return res.json(user); })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
        return [2 /*return*/];
    });
}); });
var auth = require("../middleware/auth");
usersRouter.get("/authenticate", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("in authentication function");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("authenticating, user: ", req.user.userId);
                return [4 /*yield*/, User_js_1.User.findById(req.user.userId).select("-password")];
            case 2:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
usersRouter.route('/signin').post(function (req, res) {
    console.log("sign in back-end");
    email = req.body.email;
    password = req.body.password;
    var getUser;
    User_js_1.User.findOne({ email: email })
        .then(function (user) {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed. Email not found"
            });
        }
        getUser = user;
        console.log("passwords", password, user.password);
        return bcrypt_1["default"].compare(password, user.password);
    })
        .then(function (response) {
        console.log("response:", response);
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed. Password invalid"
            });
        }
        else {
            console.log(getUser);
            payload = {
                user: {
                    email: getUser.email,
                    userId: getUser._id
                }
            };
            console.log(payload);
        }
        var jwtToken = jsonwebtoken_1["default"].sign(payload, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        return res.status(200).json({
            token: jwtToken
        });
    })["catch"](function (err) {
        res.status(401).json({
            message: "Random error"
        });
    });
});
usersRouter.route('/add').post(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, clusterData, clusters, hash, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = req.body;
                clusterData = [];
                console.log("clusters", formData.clusters);
                formData.clusters.forEach(function (cluster) {
                    console.log("loop", cluster);
                    clusterData.push({
                        "title": cluster.title,
                        "subtitle": cluster.subtitle,
                        "text": cluster.text,
                        "selected": cluster.selected
                    });
                });
                clusters = formData.clusters;
                console.log("PASSWORD", formData.password);
                return [4 /*yield*/, bcrypt_1["default"].hash(formData.password, 10)];
            case 1:
                hash = _a.sent();
                console.log(hash);
                user = new User_js_1.User({
                    "firstname": formData.firstname,
                    "lastname": formData.lastname,
                    "email": formData.email,
                    "password": hash,
                    "confirmation": hash,
                    "resume": formData.resume,
                    "linkedin": formData.linkedin,
                    "github": formData.github,
                    "clusters": [{
                            "title": clusters[0].title,
                            "subtitle": clusters[0].subtitle,
                            "text": clusters[0].text,
                            "selected": clusters[0].selected
                        },
                        {
                            "title": clusters[1].title,
                            "subtitle": clusters[1].subtitle,
                            "text": clusters[1].text,
                            "selected": clusters[1].selected
                        },
                        {
                            "title": clusters[2].title,
                            "subtitle": clusters[2].subtitle,
                            "text": clusters[2].text,
                            "selected": clusters[2].selected
                        }]
                });
                user.save()
                    .then(function (response) {
                    if (!response) {
                        return res.status(401).json({
                            message: "Authentication failed"
                        });
                    }
                    //jwt payload
                    payload = {
                        user: {
                            email: user.email,
                            userId: user._id
                        }
                    };
                    //jwt signature
                    var jwtToken = jsonwebtoken_1["default"].sign(payload, "longer-secret-is-better", {
                        expiresIn: "1h"
                    });
                    //Send authorization token
                    return res.status(200).json({
                        token: jwtToken
                    });
                })["catch"](function (error) {
                    res.status(500).json({
                        error: error
                    });
                    console.log(error);
                });
                return [2 /*return*/];
        }
    });
}); });
usersRouter.route('/get/:id').get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User_js_1.User.findById(req.params.id)
            .then(function (user) { return res.json(user.firstname); })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
        return [2 /*return*/];
    });
}); });
usersRouter.route('/clusters/:id').get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User_js_1.User.findById(req.params.id)
            .then(function (user) { return res.json(user.clusters); })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
        return [2 /*return*/];
    });
}); });
usersRouter.route('/addcluster/:id/:clusterId').post(function (req, res) {
    console.log("WORKED");
    User_js_1.User.findById(req.params.id)
        .then(function (user) {
        user.clusters.push(req.params.clusterId);
        user.save()
            .then(function () { return res.json('Clusters updated!'); })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
    })["catch"](function (err) { return res.status(400).json('Error: ' + err); });
});
exports["default"] = usersRouter;
