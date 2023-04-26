import express, { Request, Response } from "express";

import {
  AddEmployees,
  // AddUser,
  deleteEmployees,
  downloadFile,
  getAllEmployees,
  getAllEmployeesById,
  getDocumentsById,
  updateSingleEmployee,
  uploadDocument,
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

const upload = multer({ storage: storage });

const router = express.Router();
router.get("/", getAllEmployees);
router.get("/:id", getAllEmployeesById);
router.get("/documents/:id", getDocumentsById);
router.post("/add-user", upload.single("image"), AddEmployees);
router.delete("/deleteuser/:id", deleteEmployees);
router.put("/updateuser/:id", updateSingleEmployee);
router.put("/imageupload/:Id", uploadImage);
router.put("getdocument/:Id",upload.single("file"), uploadDocument);
router.route("/documents/:id/download").get(downloadFile);

export default router;
