import * as React from "react";
import "../../styles/tab.css";
import { Link } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";

interface ITabProps {
  Id: number;
  Name: string;
}
const Tab: React.FC<ITabProps> = ({ Id, Name }) => {
  // const { Id } = useParams<{ Id: string }>();
  console.log(Id, "id log in tab");
  console.log(Name,"name log in tab");
  

  return (
    <div className="tabcontainer">
      <Link to="/">
        {" "}
        <button className="back-button">Back</button>
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
