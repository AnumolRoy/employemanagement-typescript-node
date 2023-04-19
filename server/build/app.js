"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const morgan = require("morgan");
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const nodejs_commonjs_1 = require("@pnp/nodejs-commonjs");
const contactroute_1 = __importDefault(require("./routes/contactroute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3005;
const bodyParser = require("body-parser");
app.use((0, cors_1.default)({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const SpfxConnection = () => {
    sp_commonjs_1.sp.setup({
        sp: {
            fetchClientFactory: () => new nodejs_commonjs_1.SPFetchClient("https://2mxff3.sharepoint.com/sites/ContactsAnu", "f586d61f-8d63-4168-9bca-6f5f5eddf545", "YCK1iUgDuCXKOGIP5U6z8KzTczzyXxqYCwLTxqXCLIE="),
        },
    });
};
SpfxConnection();
app.use("/get", contactroute_1.default);
app.listen(port, () => {
    console.log(`connected successfully on port ${port}`);
});
