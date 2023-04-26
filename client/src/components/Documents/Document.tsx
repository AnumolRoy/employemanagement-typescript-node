import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/document.css";
import axios from "axios";
import { useState } from "react";
import Main from "../Main/Main";
import qs from "qs";
import Tab from "../Tab/Tab";
import { toast } from "react-toastify";

interface Document {
  Id: number;
  Name: string;
  email: string;
  gender: string;
  designation: string;
  ServerRelativeUrl: string;
}

interface User {
  Name: string;
  email: string;
  gender: string;
  designation: string;
  Id: number;
  url?: string;
}


const Documents: React.FC = () => {
  const [documents] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<Document[]| null>(null);
  const { Id } = useParams<{ Id: string }>();
  const [userdetails, setUserdetails] = useState<Document[]>([]);
  // const [user, setUser] = useState<User | undefined>(undefined);


  const Name = new URLSearchParams(useLocation().search).get("name") || "";
  const id = new URLSearchParams(useLocation().search).get("id") || "";
  const profileId = Number(Id);


  React.useEffect(() => {
    axios
      .get(`http://localhost:3005/get/documents/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserdetails(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  let addedusers: any = {};

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };
  
  // const handleUploadClick = async () => {
  //   const email = "";
  //   const gender = "";
  //   const designation = "";

  //   if (!selectedFile) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   const newUser: Document = {
  //     Id: Number(id),
  //     Name,
  //     email,
  //     gender,
  //     designation,
  //   };

  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append("files", selectedFile);
  //     formData.append("user", JSON.stringify(newUser));

  //     try {
  //       const response = await axios.post(
  //         `http://localhost:3005/get/getdocument/${Id}`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log("response log in add user", response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  const handleUploadClick = async () => {
    try {
      if (!selectedFile) {
        throw new Error("No file selected");
      }
  
      const formData = new FormData();
      formData.append("document", selectedFile);
  
      const response = await axios.post(
        `http://localhost:3005/get/documents/${Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Document uploaded successfully:", response.data);
      toast.success("Document uploaded successfully", {
        className: "toastify-success",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Error uploading document", {
        className: "toastify-error",
      });
    }
  };
  
  //   if (!selectedFile) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     const response = await axios.put(
  //       `http://localhost:3005/get/getdocument/${Id}`,
  //       formData
  //     );

  //     console.log(response.data)
  //     setFiles(null);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

 

  const downloadFile = async (serverRelativePath?: string) => {
    try {
      if (!serverRelativePath) {
        throw new Error("serverRelativePath parameter is required");
      }
      const response = await axios.get(
      `  http://localhost:3005/get/documents/${Id}/download`,
        {
          params: { serverRelativePath },
          paramsSerializer: (params) => {
            return qs.stringify(params, { encode: false });
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data]);
      const downloadLink = document.createElement("a");
      
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute(
        "download",
        serverRelativePath.split("/").pop() || ""
      );
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {}, []);
  

  return (
    <div>
      <Main />
      {/* <Tab Id={profileId} Name={user.Name}/> */}
      <div className="docList">
        <div className="">
          <input
            type="file"
            className="choosefile"
            onChange={handleFileInputChange}
            style={{
              display: "inline-block",
              color: "red",
              fontWeight: "bold",
            }}
          />
          <button type="button" onClick={handleUploadClick}>
            Upload
          </button>
        </div>
        <input
          className="searchuploads"
          type="text"
          name=""
          placeholder="search"
          id="searchUpload"
        />
        <div className="uploadFolder">
          <img
            id="image"
            src="https://cdn-icons-png.flaticon.com/512/1252/1252549.png?w=740&t=st=1681923870~exp=1681924470~hmac=7d3977d03fcd7bc915798b5c220765f9f6337d2d613a81009efa632ef07f317b"
            alt="folder-icon"
          />
          <h4>User Name: {Name}</h4>
          <h5>Folder id :{Id}</h5>
        </div>
        <p>Documents of user {Name}</p>
        <ul>
          {userdetails &&
            userdetails.map((file: any) => (
              <table className="table">
                <thead>
                  <tr>
                    <th className="name-column">User id :{Id}</th>
                    <th className="name-column">Name</th>
                    <th className="modified-column">Modified</th>
                    <th className="type-column">Modified BY</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <img
                        id="document"
                        src="https://cdn-icons-png.flaticon.com/512/720/720241.png?w=740&t=st=1681931592~exp=1681932192~hmac=01d564af56e3f63782fa5d52f412b92e4424540cbd7d2c25e487d3d9b029e4f5"
                        alt="folder-icon"
                      />
                    </td>

                    <td>{file.Name}</td>

                    <td>{new Date().toLocaleDateString()}</td>
                    <td>Edwin PT</td>
                    <td>
                      <button
                        onClick={() => downloadFile(file?.ServerRelativeUrl)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Documents;
