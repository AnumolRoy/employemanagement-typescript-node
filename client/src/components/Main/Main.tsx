import * as React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

function Main() {
  const navigate = useNavigate();
  
  return (
    <div className="main">
      <div className="navbar">
        <div className="nav-text">
          <h1
            id="homenav"
            onClick={() => navigate("/")}
          >
            HR Portal
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Main;
