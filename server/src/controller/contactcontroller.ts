import { Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
const fs = require("fs");
import getContentType from "../utils/getContentType";

interface User {
  Id: number;
  Name: string;
  email: string;
  gender: string;
  designation: string;
  url?: string;
}

//getall employees
const getAllEmployees = async (req: Request, res: Response) => {
  console.log("startingggggggg");
  try {
    const response = await sp.web.lists
      .getByTitle("contactslist")
      .items.getAll();

    return res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export { getAllEmployees };

//getallemployeesby user id

const getAllEmployeesById = async (req: Request, res: Response) => {
  const Id = req.params.id;

  if (!Number.isInteger(Number(Id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const response = await sp.web.lists
      .getByTitle("contactslist")
      .items.getById(Number(Id))
      .get();
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllEmployeesById };

const getDocumentsById = async (req: Request, res: Response) => {
  console.log(req.params);

  const Id = req.params.id;

  if (!Number.isInteger(Number(Id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const documentLibraryName = "DocumentAnu";
    const folderUrl = `DocumentAnu/${Id}`;
    const documentLibrary = await sp.web
      .getFolderByServerRelativeUrl(folderUrl)
      .files.select("Name", "ServerRelativeUrl")
      .get();
    console.log(documentLibrary);

    console.log(documentLibrary, "-------------------");
    return res.json(documentLibrary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getDocumentsById };

const AddEmployees = async (req: Request, res: Response) => {
  const userData = JSON.parse(req.body.user);
  console.log(userData, "user data");

  const fileBuffer = fs.readFileSync(req.file?.path);
  console.log(req.file, "image file");

  console.log(req.file?.path, "image file path");

  const image = req?.file as any;
  console.log(image, "+++++++++++++++++++++++++");

  try {
    const newUser = {
      Id: userData.Id,
      Name: userData.Name,
      email: userData.email,
      gender: userData.gender,
      designation: userData.designation,
    };

    const response = await sp.web.lists.getByTitle("Contactslist").items.add({
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
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder '${newFolderName}' created successfully.`);
      });

    const LibraryName = `DocumentAnu/${id}`;
    const fileNamePath = `${image.filename}`;

    console.log(image);

    let result: any;
    if (image?.size <= 10485760) {
      // small upload
      console.log("Starting small file upload");
      result = await sp.web
        .getFolderByServerRelativePath(LibraryName)
        .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });

      console.log(result, "resulttttttttttttttttttttttttttttttttt");
    } else {
      // large upload
      console.log("Starting large file upload");
    }

    console.log("Server relative URL:", result?.data?.ServerRelativeUrl);
    const imageurl = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

    const list = sp.web.lists.getByTitle("Contactslist");

    try {
      await list.items.getById(id).update({
        url: imageurl,
      });

      console.log("File upload successful");
      res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
      });
    } catch (error) {
      console.error("Error while updating employee item:", error);
      res.status(500).json({
        success: false,
        message: "Error while updating employee item",
      });
    }

    // return res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { AddEmployees };

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
  }
};

export { deleteEmployees };

//update single user by id
export const updateSingleEmployee = async (req: Request, res: Response) => {
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
  const employee = await sp.web.lists
    .getByTitle("Contactslist")
    .items.getById(Id)
    .update(updateEmployee);

  res.status(200).json({
    success: true,
    message: " Succesfully Updated  user Details",
    employee,
  });
};

export const uploadImage = async (req: Request, res: Response) => {
  console.log("imagecheckinggggggggg");
  console.log(req.params);
  const { Id } = req.params;
  console.log(req.files);
};

//upload document to userfolder by id
// export const uploadDocument = async (req: Request, res: Response) => {
//   const userData = JSON.parse(req.body.user);
//   console.log(userData);

//   const fileBuffer = fs.readFileSync(req.file?.path);
//   console.log(req.file, "image file");

//   console.log(req.file?.path, "image file path");

//   const image = req?.file as any;

//   try {
//     const newUser = {
//       Id: userData.Id,
//       Name: userData.Name,
//       email: userData.email,
//       gender: userData.gender,
//       designation: userData.designation,
//     };

//     const response = await sp.web.lists.getByTitle("Contactslist").items.add({
//       Name: newUser.Name,
//       email: newUser.email,
//       gender: newUser.gender,
//       designation: newUser.designation,
//     });

//     console.log(response.data, "qwertyyyyyyyyyyyy");
//     console.log(response.data.Id);
//     let id = response.data.Id;
//     const folderId = response.data.Id;
//     const newFolderName = `${folderId}`;
//     const documentLibraryName = `DocumentAnu`;
//     const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
//     await documentLibrary.rootFolder.folders
//       .addUsingPath(newFolderName)
//       .then(() => {
//         console.log(`Folder '${newFolderName}' created successfully.`);
//       });

//     const LibraryName = `DocumentAnu/${id}`;
//     const fileNamePath = `${image.filename}`;

//     console.log(image);

//     let result: any;
//     if (image?.size <= 10485760) {
//       // small upload
//       console.log("Starting small file upload");
//       result = await sp.web
//         .getFolderByServerRelativePath(LibraryName)
//         .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });
//     } else {
//       // large upload
//       console.log("Starting large file upload");
//     }

//     console.log("Server relative URL:", result?.data?.ServerRelativeUrl);
//     const imageurl = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

//     const list = sp.web.lists.getByTitle("Contactslist");

//     try {
//       await list.items.getById(id).update({
//         filepath: imageurl,
//       });

//       console.log("File upload successful");
//       res.status(200).json({
//         success: true,
//         message: "Profile picture uploaded successfully",
//       });
//     } catch (error) {
//       console.error("Error while updating employee item:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error while updating employee item",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
export const uploadDocument = async (req: Request, res: Response) => {
  const userData = req.body.user;
  console.log(userData);

  const fileBuffer = fs.readFileSync(req.file?.path);
  console.log(req.file, "image file");

  console.log(req.file?.path, "image file path");

  const image = req?.file as any;

  try {
    const newUser = {
      Id: userData.Id,
      Name: userData.Name,
      email: userData.email,
      gender: userData.gender,
      designation: userData.designation,
    };

    const response = await sp.web.lists.getByTitle("Contactslist").items.add({
      Title: newUser.Name,
      email: newUser.email,
      gender: newUser.gender,
      designation: newUser.designation,
    });

    console.log(response.data);
    console.log(response.data.Id);
    let id = response.data.Id;
    const folderId = response.data.Id;
    const newFolderName = `${folderId}`;
    const documentLibraryName = `DocumentAnu`;
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder '${newFolderName}' created successfully.`);
      });

    const LibraryName = `DocumentAnu/${id}`;
    const fileNamePath = `${image.filename}`;

    console.log(image);

    let result: any;
    if (image?.size <= 10485760) {
      // small upload
      console.log("Starting small file upload");
      result = await sp.web
        .getFolderByServerRelativePath(LibraryName)
        .files.addUsingPath(fileNamePath, fileBuffer, { Overwrite: true });
    } else {
      // large upload
      console.log("Starting large file upload");
    }

    console.log("Server relative URL:", result?.data?.ServerRelativeUrl);
    const imageurl = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

    const list = sp.web.lists.getByTitle("Contactslist");

    try {
      await list.items.getById(id).update({
        filepath: imageurl,
      });

      console.log("File upload successful");
      res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
      });
    } catch (error) {
      console.error("Error while updating employee item:", error);
      res.status(500).json({
        success: false,
        message: "Error while updating employee item",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const downloadFile = async (req: Request, res: Response) => {
  const serverRelativePath = req.query.serverRelativePath as string;
  const file = sp.web.getFileByServerRelativePath(serverRelativePath);
  const buffer: ArrayBuffer = await file.getBuffer();

  const fileName = serverRelativePath.split("/").pop() || ""; // get the file name with extension
  const contentType = getContentType(fileName); // get the content type based on file extension

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`)
  res.setHeader("Content-type", contentType);
  res.status(200).send(Buffer.from(buffer));
};
