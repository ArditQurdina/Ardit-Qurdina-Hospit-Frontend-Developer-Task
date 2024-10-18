"use client"

import { useEffect, useState } from "react";
import './home-page.css'; // Import the CSS file
import { FaCircleUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [createdUserName, setCreatedUserName] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [createdUsername, setCreatedUsername] = useState("");
  const [createdUserPhone, setcreatedUserPhone] = useState("");
  const [editedUserId, setEditedUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(null);

  const getUserData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const nextUsers = users.filter((user) => user.id !== id);
        setUsers(nextUsers);
        console.log(`User with id: ${id} is deleted`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editUser = (user) => {
    setEditedUserId(user.id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedUsername(user.username);
    setEditedPhone(user.phone);
    setEditedStreet(user.address.street);
    setEditedCity(user.address.city)
  };

  const editForm = async (e, userId) => {
    e.preventDefault();
    const editedUser = {
      name: editedName,
      email: editedEmail,
      username: editedUsername,
      phone: editedPhone,
      address: {
        street: editedStreet,
        city: editedCity
      }
    };
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(editedUser),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUsers((previousUsers) =>
          previousUsers.map((user) =>
            user.id === userId ? updatedUser : user
          )
        );
        console.log(`User with id: ${userId} has been edited`);
        setEditedUserId(null);
        setSuccessfulMessage(userId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="userCard">
          {editedUserId === user.id ? (
            <form onSubmit={(e) => editForm(e, user.id)}>
              <div className="formGroup">
                <label>Name</label>
                <input
                  type="text"
                  required
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Username</label>
                <input
                  type="text"
                  required
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Phone</label>
                <input
                  required
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>Street</label>
                <input
                  required
                  value={editedStreet}
                  onChange={(e) => setEditedStreet(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <label>City</label>
                <input
                  required
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                />
              </div>

              <div className="formButtons">
                <button type="submit">Save Changes</button>
              </div>
            </form>
          ) : (
            <>
              <div className="userHeader">
                <div className="user-profile-icon-parent">
                  <FaCircleUser className="user-profile-icon" size={100} />
                </div>
                <div className="detailRow">
                  <h2 className="userName">{user.name}</h2>
                </div>
                <div className="detailRow">
                  <span className="value">{user.username}</span>
                </div>
              </div>

              <div className="userDetails">
                <div className="detailRow icon-content-row">
                  <FaLocationDot />
                  <div className="address">
                    {user.address.street}, {user.address.city}
                  </div>
                </div>
                <div className="detailRow email-phone-icons-content-row">
                  <MdEmail />
                  <div className="value">{user.email}</div>
                </div>
                <div className="detailRow email-phone-icons-content-row">
                  <FaPhone />
                  <div className="value">{user.phone}</div>
                </div>
              </div>

              <div className="buttonGroup">
                <div className="editButton" onClick={() => editUser(user)}>
                  <div className="edit-icon-label-container">
                    <MdEdit size={18} />
                    <div>EDIT</div>
                  </div>
                </div>
                <div
                  className="deleteButton"
                  onClick={() => deleteUser(user.id)}
                >
                  <IoTrashOutline size={20} />
                </div>
              </div>
              {successfulMessage === user.id &&
                <div className="success-message">
                  You have successfully edited the user
                </div>
              }
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
