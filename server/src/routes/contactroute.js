"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const contactcontroller_1 = require("../controller/contactcontroller");
const router = express_1.default.Router();
exports.router = router;
router.get("/", contactcontroller_1.getAllEmployees);
