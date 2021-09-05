"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var find_up_1 = __importDefault(require("find-up"));
var dotenv_1 = __importDefault(require("dotenv"));
var server_1 = __importDefault(require("./server"));
var envPath = find_up_1["default"].sync(".env");
dotenv_1["default"].config({ path: envPath });
var port = process.env.PORT || 5000;
(0, server_1["default"])().then(function (server) {
    server.listen(port, function () {
        console.log("Listening on port " + port);
    });
});
