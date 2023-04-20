import { useState, useEffect } from "react";
import * as React from "react";
import Search from "../../pages/Search";
import AddUser from "../AddUser/AddUser";
import "../../styles/card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  Name: string;
  email: string;
  gender: string;
  designation: string;
  Id: number;
  url?: string;
}

interface CardProps {
  users: User[];
}

const Card: React.FC<CardProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [test, setTest] = useState<boolean>(true);
  const [showCard, setShowCard] = useState<boolean>(true);
    const [oldUsers, setOldUsers] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    console.log("use effect ----------------");

    axios
      .get("http://localhost:3005/get", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("success response");

        console.log("Data:", response.data);
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [users, oldUsers]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log("first");
    })();
  }, [users]);

  // Function to handle adding a new user to the user list
  const handleAddUser = async (newUser: User) => {
    console.log(userList, "userlist");

    const updatedList = [...userList, newUser];
    setTest(!test);
    setUserList(updatedList);

    // Setting showCard back to true to show the user list again
    setShowCard(true);
  };

  // async function handleUpdate(Id: number): Promise<void> {
  //   console.log(Id);

  //   const name = window.prompt("Enter the new name of the contact:");
  //   const Email = window.prompt("Enter the new email of the contact:");
  //   const Gender = window.prompt("Enter the new gender of the contact:");
  //   const Designation = window.prompt("Enter the new designation of the contact:");

  //   try {
  //     // const contactItem = sp.web.lists.getByTitle("Contactslist").items.getById(Id);
  //     // if (contactItem) {
  //     //   // Update the item by ID
  //     //   await sp.web.lists.getByTitle("Contactslist").items.getById(Id).update({
  //     //     Name: name,
  //     //     email: Email,
  //     //     gender: Gender,
  //     //     designation: Designation,

  //       });

  //       console.log(`Item ${Id} updated successfully.`);
  //       alert("Item updated successfully.");
  //     } else {
  //       console.log(`Item ${Id} does not exist.`);
  //       alert("Item does not exist.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred while updating the item.");
  //   }
  // }

  // Function to handle searching for users by name
  const handleSearch = (searchText: string) => {
    if (!searchText) {
      setOldUsers(!oldUsers);
    }
    if (searchText) {
      const searchedUser = userList.filter(
        (user) =>
          user.Name &&
          user.Name.toLowerCase().includes(searchText.toLowerCase())
      );
      // Updating the user list state with the filtered list
      setUserList(searchedUser);
      if (searchedUser.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      // Search text is empty, show all users
      setUserList(userList);
      setNotFound(false);
    }
  };

  const handleCardClick = (Id: string) => {
    console.log(`Card with id ${Number(Id)} clicked`);
    navigate(`/profilebvc/${Number(Id)}`);
  };
  return (
    <div className="container">
      <div>
        {showCard ? (
          // Showing the user list
          <>
            <div className="row">
              <div>
                <button
                  className="adduserbutton "
                  onClick={() => setShowCard(false)}
                >
                  Add Employee
                </button>
              </div>
              <div className="searchbar">
                <Search onSearch={handleSearch} />
              </div>
            </div>
            {userList && (
              <div className="card-container">
                {/* Mapping over the user list to show each user */}
                {userList.map((item) => {
                  // console.log(item,"hhhhh")
                  return (
                    <div
                      key={item.Id}
                      className="card"
                      onClick={() => handleCardClick(item.Id.toString())}
                    >
                      <div className="imge">
                        {item.url ? (
                          <img
                            src={`${item.url}`}
                            alt="User Image"
                            className="imge"
                          />
                        ) : (
                          <img
                            src="https://o.remove.bg/downloads/7ba90c9b-979c-4513-9440-4acd6bc894e4/images-removebg-preview.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="details" style={{ fontWeight: "bold" }}>
                        <h3>Name: {item.Name}</h3>
                        <h5>email: {item.email}</h5>
                        <h5>gender: {item.gender}</h5>
                        <h5>designation: {item.designation}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          // Showing the AddUser component
          <AddUser
            onAddUser={handleAddUser}
            setShowCard={setShowCard}
            id={userList.length}
          />
        )}
      </div>
      {notFound && (
        <div className="flex">
          <img
            src="https://media.istockphoto.com/id/1299140151/vector/404-error-page-not-found-template-with-dead-file.jpg?s=612x612&w=0&k=20&c=aiqJjuQ3_8FTOwFMcYsZW-c1ixCZeZt76-Q6nxMucw0="
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Card;
