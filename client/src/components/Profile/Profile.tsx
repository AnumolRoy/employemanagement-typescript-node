import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/profilePage.css";
import Main from "../Main/Main";
import Tab from "../Tab/Tab";

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
  console.log(Id, "id log");

  const profileId = Number(Id);
  console.log(profileId, "profile id log in profile page");

  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = async (profileId: string) => {
    try {
      const url = `http://localhost:3005/get/deleteuser/${profileId}`;

      await axios.delete(url).then((response) => {});
    } catch (error) {}

    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (user) {
      setEditedUser(user);
    }
  };

  const handleSave = async () => {
    try {
      const url = `http://localhost:3005/get/updateuser/${profileId}`;

      await axios.put(url, editedUser).then((response) => {
        setUser(editedUser);
      });
    } catch (error) {}

    setIsEditing(false);
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Tab />
      <div className="padding">
        <div className="col-md-8">
          <div className="cards card-no-border">
            <img
              className="card-img-top"
              src="https://i.imgur.com/K7A78We.jpg"
              alt="Card image cap"
            />
            <div className="card-body little-profile text-center">
              <div className="pro-img">
                <img src={user.url} alt="userimage" />
              </div>
              <h3 className="m-b-0">{user.Name}</h3>
              <p>Email : {user.email}</p>
              <p>Gender : {user.gender}</p>
              <p>Designation : {user.designation}</p>
              <div className="row text-center m-t-20">
                <div className="col-lg-4 col-md-4 m-t-20">
                  <button className="gobackbutton" onClick={() => navigate(-1)}>
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
                </div>
                <div className="col-lg-4 col-md-4 m-t-20">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="editbutton"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editedUser.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={editedUser.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                  value={editedUser.designation}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
