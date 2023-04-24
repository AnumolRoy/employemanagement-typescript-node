import "./App.css";
import Documents from "./components/Documents/Document";
import Profile from "./components/Profile/Profile";
// import ViewProfile from "./components/ViewProfile/ViewProfile";

import { ToastContainer } from 'react-toastify';
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
   <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profilebvc/:Id" element={<Profile />} />
          <Route path="/document/:Id" element={<Documents />} />
          {/* <Route path="/view/:Id" element={<ViewProfile />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
