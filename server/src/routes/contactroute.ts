import express, { Request, Response } from "express";


import {
  AddEmployees,
  // AddUser,
  deleteEmployees,
  getAllEmployees,
  getAllEmployeesById,
  getDocumentsById,
  updateSingleEmployee,
  uploadImage,
} from "../controller/contactcontroller";
import multer from "multer";



const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
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
const upload = multer({ storage: storage });




const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getAllEmployeesById);
router.get("/documents/:id", getDocumentsById);
router.post("/add-user",upload.single("image"), AddEmployees);
router.delete("/deleteuser/:id", deleteEmployees);
router.put("/updateuser/:id",updateSingleEmployee);
router.put("/imageupload/:Id",uploadImage);




export default router;
