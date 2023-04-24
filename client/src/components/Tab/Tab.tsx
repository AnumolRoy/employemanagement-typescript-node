import * as React from "react";
import "../../styles/tab.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface ITabProps {
  Id: number;
  Name: string;
}

const Tab: React.FC<ITabProps> = ({ Id, Name }) => {
  const [activeTab, setActiveTab] = React.useState<string>("profile");

  const handleProfileClick = () => {
    setActiveTab("Profile");
  };

  const handleDocumentClick = () => {
    setActiveTab("Document");
  };

  return (
    <div className="tabcontainer">
      <Link to="/">
        {" "}
        <button className="backicon-button">
          {" "}
          <FaArrowLeft />{" "}
        </button>
      </Link>
      <Link to={`/profilebvc/${Id}`}>
        <button
          className={`back-button ${activeTab === "Profile" ? "active" : ""}`}
          onClick={handleProfileClick}
        >
          Profile
        </button>
      </Link>
      <Link to={`/document/${Id}?name=${encodeURIComponent(Name)}`}>
        <button
          className={`back-button ${
            activeTab === "Document" ? "active" : ""
          }`}
          onClick={handleDocumentClick}
        >
          Documents
        </button>
      </Link>
    </div>
  );
};

export default Tab;
