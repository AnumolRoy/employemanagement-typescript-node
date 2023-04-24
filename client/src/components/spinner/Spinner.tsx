import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";
import "../../styles/spinner.css";

const override: CSSProperties = {
  display: "block",
  margin: "180px auto 0",
  borderColor: "blue",
};

function App() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0000ff");

  return (
    <div className="sweet-loading">
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
