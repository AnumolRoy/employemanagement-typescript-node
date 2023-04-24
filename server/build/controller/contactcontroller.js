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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadDocument = exports.uploadImage = exports.updateSingleEmployee = exports.deleteEmployees = exports.AddEmployees = exports.getDocumentsById = exports.getAllEmployeesById = exports.getAllEmployees = void 0;
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const fs = require("fs");
const getContentType_1 = __importDefault(require("../utils/getContentType"));
//getall employees
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("startingggggggg");
    try {
        const response = yield sp_commonjs_1.sp.web.lists
            .getByTitle("contactslist")
            .items.getAll();
        return res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllEmployees = getAllEmployees;
//getallemployeesby user id
const getAllEmployeesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    if (!Number.isInteger(Number(Id))) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const response = yield sp_commonjs_1.sp.web.lists
            .getByTitle("contactslist")
            .items.getById(Number(Id))
            .get();
        return res.json(response);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllEmployeesById = getAllEmployeesById;
const getDocumentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const Id = req.params.id;
    if (!Number.isInteger(Number(Id))) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const documentLibraryName = "DocumentAnu";
        const folderUrl = `DocumentAnu/${Id}`;
        const documentLibrary = yield sp_commonjs_1.sp.web
            .getFolderByServerRelativeUrl(folderUrl)
            .files.select("Name", "ServerRelativeUrl")
            .get();
        console.log(documentLibrary);
        console.log(documentLibrary, "-------------------");
        return res.json(documentLibrary);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getDocumentsById = getDocumentsById;
const AddEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userData = JSON.parse(req.body.user);
    console.log(userData, "user data");
    const fileBuffer = fs.readFileSync((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    console.log(req.file, "image file");
    console.log((_b = req.file) === null || _b === void 0 ? void 0 : _b.path, "image file path");
    const image = req === null || req === void 0 ? void 0 : req.file;
    console.log(image, "+++++++++++++++++++++++++");
    try {
        const newUser = {
            Id: userData.Id,
            Name: userData.Name,
            email: userData.email,
            gender: userData.gender,
            designation: userData.designation,
        };
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("Contactslist").items.add({
            Name: newUser.Name,
            email: newUser.email,
            gender: newUser.gender,
            designation: newUser.designation,
        });
        console.log(response.data, "qwertyyyyyyyyyyyy");
        console.log(response.data.Id);
        let id = response.data.Id;
        const folderId = response.data.Id;
        const newFolderName = `${folderId}`;
        const documentLibraryName = `DocumentAnu`;
        const documentLibrary = sp_commonjs_1.sp.web.lists.getByTitle(documentLibraryName);
        yield documentLibrary.rootFolder.folders
            .addUsingPath(newFolderName)
            .then(() => {
            console.log(`Folder '${newFolderName}' created successfully.`);
        });
        const LibraryName = `DocumentAnu/${id}`;
        const fileNamePath = `${image.filename}`;
        console.log(image);
        let result;
        if ((image === null || image === void 0 ? void 0 : image.size) <= 10485760) {
            // small upload
            console.log("Starting small file upload");
            result = yield sp_commonjs_1.sp.web
                .getFolderByServerRelativePath(LibraryName)
                .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });
            console.log(result, "resulttttttttttttttttttttttttttttttttt");
        }
        else {
            // large upload
            console.log("Starting large file upload");
        }
        console.log("Server relative URL:", (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.ServerRelativeUrl);
        const imageurl = `https://2mxff3.sharepoint.com${(_d = result === null || result === void 0 ? void 0 : result.data) === null || _d === void 0 ? void 0 : _d.ServerRelativeUrl}`;
        const list = sp_commonjs_1.sp.web.lists.getByTitle("Contactslist");
        try {
            yield list.items.getById(id).update({
                url: imageurl,
            });
            console.log("File upload successful");
            res.status(200).json({
                success: true,
                message: "Profile picture uploaded successfully",
            });
        }
        catch (error) {
            console.error("Error while updating employee item:", error);
            res.status(500).json({
                success: false,
                message: "Error while updating employee item",
            });
        }
        // return res.send(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.AddEmployees = AddEmployees;
const deleteEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete employee");
    let id = Number.parseInt(req.params.id);
    console.log("id", id);
    try {
        let user = yield sp_commonjs_1.sp.web.lists.getByTitle("Contactslist").items.getById(id);
        if (!user) {
            throw new Error("User not found");
        }
        else {
            yield sp_commonjs_1.sp.web.lists.getByTitle("Contactslist").items.getById(id).delete();
            res.send({ message: "Deleted successfully" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteEmployees = deleteEmployees;
//update single user by id
const updateSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    console.log(req.body);
    const { name, email, designation, gender } = req.body;
    console.log(req.params.id);
    const Id = Number(req.params.id);
    if (isNaN(Id)) {
        res.status(400).json({
            success: false,
            message: "Invalid ID provided",
        });
        return;
    }
    const updateEmployee = {
        Name: name,
        email: email,
        designation: designation,
        gender: gender,
    };
    const employee = yield sp_commonjs_1.sp.web.lists
        .getByTitle("Contactslist")
        .items.getById(Id)
        .update(updateEmployee);
    res.status(200).json({
        success: true,
        message: " Succesfully Updated  user Details",
        employee,
    });
});
exports.updateSingleEmployee = updateSingleEmployee;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("imagecheckinggggggggg");
    console.log(req.params);
    const { Id } = req.params;
    console.log(req.files);
});
exports.uploadImage = uploadImage;
//upload document to userfolder by id
const uploadDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    const userData = JSON.parse(req.body.user);
    console.log(userData);
    const fileBuffer = fs.readFileSync((_e = req.file) === null || _e === void 0 ? void 0 : _e.path);
    console.log(req.file, "image file");
    console.log((_f = req.file) === null || _f === void 0 ? void 0 : _f.path, "image file path");
    const image = req === null || req === void 0 ? void 0 : req.file;
    try {
        const newUser = {
            Id: userData.Id,
            Name: userData.Name,
            email: userData.email,
            gender: userData.gender,
            designation: userData.designation,
        };
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("Contactslist").items.add({
            Name: newUser.Name,
            email: newUser.email,
            gender: newUser.gender,
            designation: newUser.designation,
        });
        console.log(response.data, "qwertyyyyyyyyyyyy");
        console.log(response.data.Id);
        let id = response.data.Id;
        const folderId = response.data.Id;
        const newFolderName = `${folderId}`;
        const documentLibraryName = `DocumentAnu`;
        const documentLibrary = sp_commonjs_1.sp.web.lists.getByTitle(documentLibraryName);
        yield documentLibrary.rootFolder.folders
            .addUsingPath(newFolderName)
            .then(() => {
            console.log(`Folder '${newFolderName}' created successfully.`);
        });
        const LibraryName = `DocumentAnu/${id}`;
        const fileNamePath = `${image.filename}`;
        console.log(image);
        let result;
        if ((image === null || image === void 0 ? void 0 : image.size) <= 10485760) {
            // small upload
            console.log("Starting small file upload");
            result = yield sp_commonjs_1.sp.web
                .getFolderByServerRelativePath(LibraryName)
                .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });
        }
        else {
            // large upload
            console.log("Starting large file upload");
        }
        console.log("Server relative URL:", (_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.ServerRelativeUrl);
        const imageurl = `https://2mxff3.sharepoint.com${(_h = result === null || result === void 0 ? void 0 : result.data) === null || _h === void 0 ? void 0 : _h.ServerRelativeUrl}`;
        const list = sp_commonjs_1.sp.web.lists.getByTitle("Contactslist");
        try {
            yield list.items.getById(id).update({
                filepath: imageurl,
            });
            console.log("File upload successful");
            res.status(200).json({
                success: true,
                message: "Profile picture uploaded successfully",
            });
        }
        catch (error) {
            console.error("Error while updating employee item:", error);
            res.status(500).json({
                success: false,
                message: "Error while updating employee item",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.uploadDocument = uploadDocument;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serverRelativePath = req.query.serverRelativePath;
    console.log(serverRelativePath, "pathhhhhhhhhhhhhhhhhh");
    const file = sp_commonjs_1.sp.web.getFileByServerRelativePath(serverRelativePath);
    const buffer = yield file.getBuffer();
    const fileName = serverRelativePath.split("/").pop() || ""; // get the file name with extension
    const contentType = (0, getContentType_1.default)(fileName); // get the content type based on file extension
    res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-type", contentType);
    res.status(200).send(Buffer.from(buffer));
});
exports.downloadFile = downloadFile;
