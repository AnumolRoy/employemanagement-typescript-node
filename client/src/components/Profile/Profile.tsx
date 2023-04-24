import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/profilePage.css";
import Main from "../Main/Main";
import Tab from "../Tab/Tab";
import Spinner from "../spinner/Spinner";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  Name: string;
  email: string;
  gender: string;
  designation: string;
  Id: number;
  url?: string;
}

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const { Id } = useParams<{ Id: string }>();

  const profileId = Number(Id);

  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({
    Name: "",
    email: "",
    gender: "",
    designation: "",
    Id: profileId,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3005/get/${profileId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [profileId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async (profileId: string) => {
    try {
      const url = `http://localhost:3005/get/deleteuser/${profileId}`;

      await axios.delete(url).then((response) => {});
    } catch (error) {}
    toggleModal();
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (user) {
      setEditedUser(user);
    }
  };

  const handleSave = async () => {
    const updateData = {
      name: editedUser.Name,
      email: editedUser.email,
      gender: editedUser.gender,
      designation: editedUser.designation,
    };

    try {
      const url = `http://localhost:3005/get/updateuser/${profileId}`;

      await axios.put(url, updateData).then((response) => {
        setUser(editedUser);
      });
    } catch (error) {}

    setIsEditing(false);
    toast.success('Details successfully edited and saved! 🎉🍞!');

  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (user === undefined) {
    return (
      <div className="spinnerbaground">
        {/* Loading... */}
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Main />
      <Tab Id={profileId} Name={user.Name} />

      <div className="padding ">
        <div className="col-md-8">
          <div className="cards card-no-border">
            <div className="card-body little-profile text-center">
              <div className="pro-img">
                <img src={user.url} alt="userimage" />
              </div>
              {isEditing ? (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="Name"
                      value={editedUser.Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <div className="genderForm">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          checked={editedUser.gender === "Male"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={editedUser.gender === "Female"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      name="designation"
                      value={editedUser.designation}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="m-b-0">{user.Name}</h3>
                 <b> <p>Email : {user.email}</p></b>
                 <b> <p className="genderstyle">Gender : {user.gender}</p></b>
                 <b><p className="genderstyledesignation">Designation : {user.designation}</p></b> 
                  <div className="row text-center m-t-20">
                    <div className="col-lg-4 col-md-4 m-t-20">
                      <button
                        className="gobackbutton"
                        onClick={() => navigate(-1)}
                      >
                        Go Back
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-4 m-t-20">
                      <button
                        className="deletebutton"
                        onClick={() => handleDelete(profileId.toString())}
                      >
                        Delete
                      </button>
                      {showModal && (
                        <div className="modal">
                          <div className="modal-content">
                            <h2>User Deleted Successfully</h2>
                            <button onClick={toggleModal}>Close</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-4 col-md-4 m-t-20">
                      <button onClick={handleEdit} className="editbutton">
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              )}
              {isEditing && (
                <div className="row text-center m-t-20">
                  <div className="col-lg-4 col-md-4 m-t-20">
                    <button className="gobackbutton" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>

                  <div className="col-lg-4 col-md-4 m-t-20">
                    <button onClick={handleSave} className="savebuttonedit">
                      SAVE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
