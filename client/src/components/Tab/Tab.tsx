import * as React from "react";
import "../../styles/tab.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface ITabProps {
  Id: number;
  Name: string;
}
const Tab: React.FC<ITabProps> = ({ Id, Name }) => {
  return (
    <div className="tabcontainer">
      <Link to="/">
        {" "}
        <button className="backicon-button">
          {" "}
          <FaArrowLeft />{" "}
        </button>
      </Link>
      <Link to="/profilebvc/:Id">
        <button className="back-button">Profile</button>
      </Link>
      <Link to={`/document/${Id}?name=${encodeURIComponent(Name)}`}>
        <button className="back-button">Documents</button>
      </Link>
    </div>
  );
};

export default Tab;
