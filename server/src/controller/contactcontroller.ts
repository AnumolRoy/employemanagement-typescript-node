import { Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import { log } from "console";
// import { SPFetchClient } from "@pnp/nodejs-commonjs";
const fs = require("fs");

interface User {
  Id: number;
  Name: string;
  email: string;
  gender: string;
  designation: string;
  url?: string;
}

const getAllEmployees = async (req: Request, res: Response) => {
  console.log("startingggggggg");
  try {
    const response = await sp.web.lists
      .getByTitle("contactslist")
      .items.getAll();
    // console.log("logging response",response)

    return res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export { getAllEmployees };

const getAllEmployeesById = async (req: Request, res: Response) => {
  console.log("logggggggggggggggggggggggg", req.params);

  const Id = req.params.id;
  console.log(Id, "iddddddddd");

  if (!Number.isInteger(Number(Id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const response = await sp.web.lists
      .getByTitle("contactslist")
      .items.getById(Number(Id))
      .get();
    // console.log(response);
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllEmployeesById };

const getDocumentsById = async (req: Request, res: Response) => {
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
    const documentLibrary = await sp.web
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getDocumentsById };

const AddEmployees = async (req: Request, res: Response) => {
  try {
    const newUser = {
      Id: req.body.Id,
      Name: req.body.Name,
      email: req.body.email,
      gender: req.body.gender,
      designation: req.body.designation,
    };
    // console.log("new user log", newUser);

    const response = await sp.web.lists.getByTitle("Contactslist").items.add({
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
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder '${newFolderName}' created successfully.`);
      });

    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { AddEmployees };

const AddUser = async (req: Request, res: Response) => {
  try {
    console.log("start..........._________________________________");

    const { folderId } = req.params;

    const file = req.body.file;

    console.log(file, "fiseeeeeeeeeeeeeeeeeeeeee", folderId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { AddUser };

const deleteEmployees = async (req: Request, res: Response) => {
  console.log("delete employee");

  let id: number = Number.parseInt(req.params.id);

  console.log("id", id);

  try {
    let user = await sp.web.lists.getByTitle("Contactslist").items.getById(id);

    if (!user) {
      throw new Error("User not found");
    } else {
      await sp.web.lists.getByTitle("Contactslist").items.getById(id).delete();

      res.send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);

    //  res.status(500).send({ message: `Internal Server Error` });
  }
};

export { deleteEmployees };

//update single user by id
export const updateSingleEmployee = async (req: Request, res: Response) => {
  console.log(req.params,"paramsssssssssssssssssssssss");
  
  // const { id } = req.params;
  console.log(req.body,"iiiiiiiiiiiiiiiiiiiiii");
  
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

  console.log(updateEmployee,"update employeeeeeeee");
  

  const employee = await sp.web.lists
    .getByTitle("Contactslist")
    .items.getById(Id)
    .update(updateEmployee);

  res.status(200).json({
    success: true,
    message: " Succesfully Updated  Employee Details",
    employee,
  });
};
