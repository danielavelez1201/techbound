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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var typegoose_1 = require("@typegoose/typegoose");
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var find_up_1 = __importDefault(require("find-up"));
var path_1 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var http_1 = __importDefault(require("http"));
var users_1 = __importDefault(require("./routes/users"));
var signup_1 = __importDefault(require("./routes/signup"));
var email_1 = __importDefault(require("./routes/email"));
var envPath = find_up_1["default"].sync(".env");
dotenv_1["default"].config({ path: envPath });
/**
 * Verifies that the environment has the correct keys.
 * Crashes if verification fails.
 */
var validateEnv = function () {
    var REQUIRED_KEYS = ["MONGO_URI", "SESSION_SECRET"];
    REQUIRED_KEYS.map(function (k) {
        if (process.env[k] === undefined) {
            throw new Error("Missing environment key " + k);
        }
    });
};
// The client code *must* be built before the server starts.
var appBundleDir = path_1["default"].resolve(__dirname, "..", "..", "client", "build");
var createHttpServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        validateEnv();
        app = (0, express_1["default"])();
        app.use(express_1["default"].urlencoded({ extended: true }));
        app.use(express_1["default"].json({}));
        // Nice HTTP logging.
        app.use((0, morgan_1["default"])("dev", { skip: function () { return process.env.NODE_ENV === "test"; } }));
        app.use((0, express_session_1["default"])({
            secret: String(process.env.SESSION_SECRET),
            resave: false,
            saveUninitialized: true
        }));
        app.use((0, cors_1["default"])({ credentials: true, origin: "http://localhost:3000" }));
        // *ADD ROUTES HERE* 
        app.use("/users", users_1["default"]);
        app.use("/signup", signup_1["default"]);
        app.use("/email", email_1["default"]);
        // Serves client assets.
        app.use(express_1["default"].static(appBundleDir));
        // This *needs* at the end.
        app.use("*", function (_, res) {
            res.sendFile(path_1["default"].resolve(appBundleDir, "public", "index.html"));
        });
        return [2 /*return*/, typegoose_1.mongoose.connect(String(process.env.MONGO_URI), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }).then(function () {
                return new http_1["default"].Server(app);
            })];
    });
}); };
exports["default"] = createHttpServer;
