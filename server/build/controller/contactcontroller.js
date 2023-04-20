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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleEmployee = exports.deleteEmployees = exports.AddUser = exports.AddEmployees = exports.getDocumentsById = exports.getAllEmployeesById = exports.getAllEmployees = void 0;
const sp_commonjs_1 = require("@pnp/sp-commonjs");
// import { SPFetchClient } from "@pnp/nodejs-commonjs";
const fs = require("fs");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("startingggggggg");
    try {
        const response = yield sp_commonjs_1.sp.web.lists
            .getByTitle("contactslist")
            .items.getAll();
        // console.log("logging response",response)
        return res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const getAllEmployeesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logggggggggggggggggggggggg", req.params);
    const Id = req.params.id;
    console.log(Id, "iddddddddd");
    if (!Number.isInteger(Number(Id))) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const response = yield sp_commonjs_1.sp.web.lists
            .getByTitle("contactslist")
            .items.getById(Number(Id))
            .get();
        // console.log(response);
        return res.json(response);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getAllEmployeesById = getAllEmployeesById;
const getDocumentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logggggggggggggggggggggggg", req.params);
    const Id = req.params.id;
    console.log(Id, "iddddddddd");
    if (!Number.isInteger(Number(Id))) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        console.log("checkingggggggg");
        // const documentLibraryName = `DocumentAnu`;
        // console.log(documentLibraryName);
        // const documentLibrary = await sp.web.lists
        //   .getByTitle(documentLibraryName)
        //   .items.getById(Number(Id))
        //   .get();
        const documentLibraryName = "DocumentAnu";
        const folderUrl = `DocumentAnu/${Id}`; // Replace this with the URL of the folder you want to get documents from
        const documentLibrary = yield sp_commonjs_1.sp.web
            .getFolderByServerRelativeUrl(folderUrl)
            .files.select("Name", "ServerRelativeUrl")
            .get();
        console.log(documentLibrary);
        // const response = await sp.web.lists
        //   .getByTitle(documentLibrary)
        //   .items.getById(Number(Id))
        //   .get();
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
    try {
        const newUser = {
            Id: req.body.Id,
            Name: req.body.Name,
            email: req.body.email,
            gender: req.body.gender,
            designation: req.body.designation,
        };
        // console.log("new user log", newUser);
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("Contactslist").items.add({
            Name: newUser.Name,
            email: newUser.email,
            gender: newUser.gender,
            designation: newUser.designation,
        });
        //console.log(response)
        console.log(response.data.Id);
        // console.log("logging response", response);
        const folderId = response.data.Id;
        const newFolderName = `${folderId}`;
        const documentLibraryName = `DocumentAnu`;
        const documentLibrary = sp_commonjs_1.sp.web.lists.getByTitle(documentLibraryName);
        yield documentLibrary.rootFolder.folders
            .addUsingPath(newFolderName)
            .then(() => {
            console.log(`Folder '${newFolderName}' created successfully.`);
        });
        return res.send(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.AddEmployees = AddEmployees;
const AddUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("start..........._________________________________");
        const { folderId } = req.params;
        const file = req.body.file;
        console.log(file, "fiseeeeeeeeeeeeeeeeeeeeee", folderId);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.AddUser = AddUser;
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
        //  res.status(500).send({ message: `Internal Server Error` });
    }
});
exports.deleteEmployees = deleteEmployees;
//update single user by id
const updateSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params, "paramsssssssssssssssssssssss");
    // const { id } = req.params;
    console.log(req.body, "iiiiiiiiiiiiiiiiiiiiii");
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
    console.log(updateEmployee, "update employeeeeeeee");
    const employee = yield sp_commonjs_1.sp.web.lists
        .getByTitle("Contactslist")
        .items.getById(Id)
        .update(updateEmployee);
    res.status(200).json({
        success: true,
        message: " Succesfully Updated  Employee Details",
        employee,
    });
});
exports.updateSingleEmployee = updateSingleEmployee;
