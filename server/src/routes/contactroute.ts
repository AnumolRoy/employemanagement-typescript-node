import express, { Request, Response } from "express";
import fs from "fs";
const multer = require("multer");

// interface CustomRequest extends Request {
//     file: {
//       buffer: Buffer
//       // define any other properties of the uploaded file you need to access
//     }
//   }

import {
  AddEmployees,
  AddUser,
  deleteEmployees,
  getAllEmployees,
  getAllEmployeesById,
  getDocumentsById,
  updateSingleEmployee,
} from "../controller/contactcontroller";
const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getAllEmployeesById);
router.get("/documents/:id", getDocumentsById);
router.post("/add-user", AddEmployees);
router.delete("/deleteuser/:id", deleteEmployees);
router.put("/updateuser/:id", updateSingleEmployee);

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post(
  "/upload/:id",
  upload.array("file", 1),
  (req: Request, res: Response) => {
    try {
      console.log(req.files);
      console.log(req.file);

      console.log(" hailoooiuou", req.params);
      // console.log(req.body.buffer,"rrrrrrrrrrrrrr");

      // const image = customReq.file.buffer;
      // handle the uploaded file here
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
