import * as React from "react";
// import { sp } from '../../../../spauth';
import { useLocation, useParams } from "react-router-dom";
import "../../styles/document.css";
import Tab from "../Tab/Tab";
import axios from "axios";
import { useState } from "react";

interface Document {
  Id: number;
  Name: string;
  url: string;
}
const files = [
  {
    name: "Document 1",
    url: "https://example.com/document-1.pdf",
  },
  {
    name: "Document 2",
    url: "https://example.com/document-2.docx",
  },
  {
    name: "Image 1",
    url: "https://example.com/image-1.jpg",
  },
  {
    name: "Spreadsheet 1",
    url: "https://example.com/spreadsheet-1.xlsx",
  },
];
// interface DocumentProps(){
//   users:User[];
// }

const Documents: React.FC = () => {
  const [documents] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { Id } = useParams<{ Id: string }>();
  const [userdetails, setUserdetails] = useState<Document[]>([]);

  const Name = new URLSearchParams(useLocation().search).get("name") || "";

  console.log(Id, "id log in documents ");
  console.log(Name, "name log in document");

  React.useEffect(() => {
    console.log("use effect ----------------");

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

  console.log(userdetails, "usedetailsssssss");
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };
  const handleUploadClick = async () => {
    console.log("handleUpload cicked");
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const fileNamePath = `${selectedFile.name}`;
    let result: any;
    if (selectedFile.size <= 10485760) {
      //  console.log(selectedFile);
      // // small upload
      // result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
      // console.log("result",result, Id)
      //   } else {
      //     // large upload
      //     result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, selectedFile, data => {
      //       console.log(`progress`);
      //     }, true);
    }
  };
  React.useEffect(() => {}, []);
  return (
    <div>
      {/* <Tab /> */}
      <div className="docList">
        <input type="file" onChange={handleFileSelect} />
        <button type="button" onClick={handleUploadClick}>
          Upload
        </button>
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
          <h2>User Name: {Name}</h2>
          <h5>Folder id :{Id}</h5>
        </div>
        <h2>Documents of user {Name}</h2>
        <ul>
          {userdetails &&
            userdetails.map((file: any) => (

              <li key={file.Name}>
                       <img
              id="document"
              src="https://cdn-icons-png.flaticon.com/512/720/720241.png?w=740&t=st=1681931592~exp=1681932192~hmac=01d564af56e3f63782fa5d52f412b92e4424540cbd7d2c25e487d3d9b029e4f5"
              alt="folder-icon"
            />
                <span>{file.Name}</span>
                <button>Download</button>
              </li>
            ))}
        </ul>
      </div>

      {/* <ul>
        {documents.map((document) => (
          <li key={document.Id}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.Name}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Documents;
