import { useState, CSSProperties } from "react";

import { HashLoader } from "react-spinners";

import ClipLoader from "react-spinners/ClipLoader";
import Main from "../Main/Main";

const override: CSSProperties = {
  display: "block",

  margin: "auto",

  borderColor: "	#0000ff",
};

const Spinner = () => {
  let [loading, setLoading] = useState(true);

  let [color, setColor] = useState("");

  return (
    <div>
      <Main />
      <div
        style={{
          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          height: "100vh",
        }}
      >
        <HashLoader color="	#0000ff" />
      </div>
    </div>
  );
};

export default Spinner;
