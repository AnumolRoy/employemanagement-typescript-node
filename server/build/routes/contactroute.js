"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactcontroller_1 = require("../controller/contactcontroller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// const fileFilter = (req: any, file: any, cb: any) => {
//   if (
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
//   }
// };
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.get("/", contactcontroller_1.getAllEmployees);
router.get("/:id", contactcontroller_1.getAllEmployeesById);
router.get("/documents/:id", contactcontroller_1.getDocumentsById);
router.post("/add-user", upload.single("image"), contactcontroller_1.AddEmployees);
router.delete("/deleteuser/:id", contactcontroller_1.deleteEmployees);
router.put("/updateuser/:id", contactcontroller_1.updateSingleEmployee);
router.put("/imageupload/:Id", contactcontroller_1.uploadImage);
exports.default = router;
