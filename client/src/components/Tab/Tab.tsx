import * as React from "react";
import "../../styles/tab.css";
import { Link } from "react-router-dom";

const Tab: React.FC = () => {
 
  return (
    <div className="tabcontainer">
      <Link to="/">
        {" "}
        <button className="back-button">Back</button>
      </Link>
      <Link to="/profilebvc/:Id">
        <button className="back-button">Profile</button>
      </Link>
      <Link to="/document/:Id">
        {" "}
        <button className="back-button">Documents</button>
      </Link>
    </div>
  );
};

export default Tab;
