"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require("multer");
// interface CustomRequest extends Request {
//     file: {
//       buffer: Buffer
//       // define any other properties of the uploaded file you need to access
//     }
//   }
const contactcontroller_1 = require("../controller/contactcontroller");
const router = express_1.default.Router();
router.get("/", contactcontroller_1.getAllEmployees);
router.get("/:id", contactcontroller_1.getAllEmployeesById);
router.get("/documents/:id", contactcontroller_1.getDocumentsById);
router.post("/add-user", contactcontroller_1.AddEmployees);
router.delete("/deleteuser/:id", contactcontroller_1.deleteEmployees);
router.put("/updateuser/:id", contactcontroller_1.updateSingleEmployee);
// router.post("/upload/:id",AddUser)
// router.post('/upload-image', upload.single('image'), (req: CustomRequest, res) => {
//     const image = req.file.buffer; // access the uploaded file buffer
//     // do something with the image buffer
//     res.send('Image uploaded successfully');
//   });
// router.post('/upload', (req: CustomRequest, res:Response) => {
//     const image = req.file.buffer;
//     // handle the uploaded file here
//   });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.post("/upload/:id", upload.array("file", 1), (req, res) => {
    try {
        console.log(req.files);
        console.log(req.file);
        console.log(" hailoooiuou", req.params);
        // console.log(req.body.buffer,"rrrrrrrrrrrrrr");
        // const image = customReq.file.buffer;
        // handle the uploaded file here
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
