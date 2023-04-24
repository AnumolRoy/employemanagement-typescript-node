import { useState } from "react";
import "../../styles/adduser.css";
import * as React from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { FiFile } from "react-icons/fi";

interface AddUserProps {
  onAddUser: (user: User) => void;
  setShowCard: (show: boolean) => void;
  id: number;
}

interface User {
  Id: number;
  Name: string;
  email: string;
  gender: string;
  designation: string;
  url?: string;
}

function AddUser({ onAddUser, setShowCard, id }: AddUserProps): JSX.Element {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [designationError, setDesignationError] = useState("");

  let addedusers: any = {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any required fields are empty or invalid
    let isError = false;
    if (Name.trim() === "") {
      setNameError("Name is required");
      isError = true;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isError = true;
    }
    if (gender.trim() === "") {
      setGenderError("Gender is required");
      isError = true;
    }
    if (designation.trim() === "") {
      setDesignationError("Designation is required");
      isError = true;
    }

    if (isError) {
      return;
    }

    // If all fields are valid and not empty, proceed with form submission
    const newUser: User = {
      Id: id,
      Name,
      email,
      gender,
      designation,
    };

    onAddUser(newUser);

    setName("");
    setEmail("");
    setGender("");
    setDesignation("");
    setShowCard(true);
    toast.success('User added successfully!');
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const newUser: User = {
      Id: id,
      Name,
      email,
      gender,
      designation,
    };

    if (selectedFile) {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("user", JSON.stringify(newUser));

      try {
        const response = await axios.post(
          "http://localhost:3005/get/add-user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response log in add user", response.data);
        addedusers = response.data;
        toast.error("user added Succesfuly", {
          className: "toastify-error",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Return the form with input fields for the user's name, email, gender, and designation, along with Save and Cancel buttons
  return (
    <div>
           
    <div className="wrapper">
      <div className="registration_form">
        <div className="title">Add Employee</div>

        <form onSubmit={handleSubmit}>
          <div className="form_wrap">
            <div className="input_grp">
              <div className="input_wrap">
                <label>
                  <AiOutlineUser /> Name
                </label>
                <input
                  className="input_field"
                  type="text"
                  placeholder="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  // onBlur={validateName}
                />
                {nameError && <div className="error">{nameError}</div>}
              </div>
            </div>
            <div className="input_wrap">
              <label>
                <AiOutlineMail />
                Email Address
              </label>
              <input
                className="input_field"
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={validateEmail}
              />
              {emailError && <div className="error">{emailError}</div>}
            </div>
            <div className="radio_wrap">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="input_radio input_field"
                />
                <span>Male</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="input_radio input_field"
                />
                <span>Female</span>
              </label>
              <div>
                {genderError && <div className="error">{genderError}</div>}
              </div>
            </div>
            <div className="input_wrap">
              <label>Designation</label>
              <input
                className="input_field"
                placeholder="designation"
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                // onBlur={validateDesignation}
              />
              {designationError && (
                <div className="error">{designationError}</div>
              )}
            </div>
            <div className="input_wrap">
              <label>
                <FiFile />
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleFileInputChange}
                style={{ display: "inline-block" }}
              />
              <button
                type="submit"
                onClick={handleUploadClick}
                className="submit_btn save"
                style={{ display: "inline-block", marginLeft: "10px" }}
              >
                Save
              </button>
              {selectedFile && <div></div>}
              <button
                type="button"
                className="submit_btn cancel"
                onClick={() => setShowCard(true)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
   
    </div>
  );
}

export default AddUser;
