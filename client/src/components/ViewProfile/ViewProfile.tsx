import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/viewprofile.css";
import Main from "../Main/Main";
import Tab from "../Tab/Tab";
import Spinner from "../spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";

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

  if (user === undefined) {
    return (
      <div className="spinnerbaground">
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
                <></>
              ) : (
                <>
                  <h3 className="m-b-0">{user.Name}</h3>
                  <b>
                    {" "}
                    <p>Email : {user.email}</p>
                  </b>
                  <b>
                    {" "}
                    <p className="genderstyle">Gender : {user.gender}</p>
                  </b>
                  <b>
                    <p className="genderstyledesignation">
                      Designation : {user.designation}
                    </p>
                  </b>
                  <div className="row text-center m-t-20">
                    <div className="col-lg-4 col-md-4 m-t-20"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
