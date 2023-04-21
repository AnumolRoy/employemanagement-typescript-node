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
  console.log("test");
  // console.log(req.body.user, "multer lessssssssssss");
  const userData = JSON.parse(req.body.user);
  console.log(userData, "user data");

  const fileBuffer = fs.readFileSync(req.file?.path);
  // console.log(fileBuffer, "file buffer");
  console.log(req.file, "image file");

  console.log(req.file?.path, "image file path");

  const image = (req?.file as any);
  console.log(image,"+++++++++++++++++++++++++")

  try {
    const newUser = {
      Id: userData.Id,
      Name: userData.Name,
      email: userData.email,
      gender: userData.gender,
      designation: userData.designation,
    };
    // console.log("new user log", newUser);

    const response = await sp.web.lists.getByTitle("Contactslist").items.add({
      Name: newUser.Name,
      email: newUser.email,
      gender: newUser.gender,
      designation: newUser.designation,
    });

    console.log(response.data, "qwertyyyyyyyyyyyy");
    console.log(response.data.Id);
let id = response.data.Id
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

    const LibraryName = `DocumentAnu/${id}`;
    const fileNamePath = `${image.filename}`;

console.log(image);

    let result: any;
    if (image?.size <= 10485760) {
      // small upload
      console.log("Starting small file upload");
      result = await sp.web
        .getFolderByServerRelativePath(LibraryName)
        .files.addUsingPath(fileNamePath, image, { Overwrite: true });

        console.log(result,"resulttttttttttttttttttttttttttttttttt")
    } else {
      // large upload
      console.log("Starting large file upload");
      // result = await sp.web
      //   .getFolderByServerRelativePath(documentLibraryName)
      //   .files.addChunked(
      //     fileNamePath,
      //     image,
      //     () => {
      //       console.log(`Upload progress: `);
      //     },
      //     true
      //   );
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

// const AddUser = async (req: Request, res: Response) => {
//   try {
//     console.log("start..........._________________________________");

//     const { folderId } = req.params;

//     const file = req.body.file;

//     console.log(file, "fiseeeeeeeeeeeeeeeeeeeeee", folderId);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { AddUser };

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

  //  let image = (req?.files as any)?.image;

  // console.log("imagetype",image)

  // const id = Number(Id);

  // if (!image) {
  //   console.error('No file selected');
  //   return res.status(400).json({
  //     success: false,
  //     message: 'No file selected',
  //   });
  // }

  // const documentLibraryName = `DocumentAnu/${Id}`;
  // const fileNamePath = `profilepic.png`;

  // let result: any;
  // if (image?.size <= 10485760) {
  //   // small upload
  //   console.log('Starting small file upload');
  //   result = await sp.web.getFolderByServerRelativePath
  //   (documentLibraryName).files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
  // } else {
  //   // large upload
  //   console.log('Starting large file upload');
  //   result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, image, ()  => {
  //     console.log(`Upload progress: `);
  //   }, true);
  // }

  // console.log('Server relative URL:', result?.data?.ServerRelativeUrl);
  // const imageurl = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

  // const list = sp.web.lists.getByTitle('Employees');

  // try {
  //   await list.items.getById(id).update({
  //     url: imageurl,
  //   });

  //   console.log('File upload successful');
  //   res.status(200).json({
  //     success: true,
  //     message: 'Profile picture uploaded successfully',
  //   });
  // } catch (error) {
  //   console.error('Error while updating employee item:', error);
  //   res.status(500).json({
  //     success: false,
  //     message: 'Error while updating employee item',
  //   });
  // }
};
