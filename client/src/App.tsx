import "./App.css";
import Documents from "./components/Documents/Document";
import Profile from "./components/Profile/Profile";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profilebvc/:Id" element={<Profile />} />
          <Route path="/document/:Id" element={<Documents />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
