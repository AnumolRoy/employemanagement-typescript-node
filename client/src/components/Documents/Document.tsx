import * as React from "react";
// import { sp } from '../../../../spauth';
import { useParams } from "react-router-dom";
import "../../styles/document.css";
import Tab from "../Tab/Tab";

interface Document {
  id: number;
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

const Documents: React.FC = () => {
  const [documents] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { Id } = useParams<{ Id: string }>();
  //const emplyeeId = parseInt(Id)
  // const navigate = useNavigate();
  console.log(Id);

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
      <Tab />
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
          id=""
        />
        <div className="uploadFolder">
          <img
            src="data:image/jpeg;base64,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"
            alt="folder-icon"
          />
          <h2>DocumentAnu/{Id}</h2>
        </div>
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <span>{file.name}</span>
              <button>Download</button>
            </li>
          ))}
        </ul>
      </div>

      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
