"use client"

import { useEffect, useState } from "react";
import './home-page.css';
import { FaCircleUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const showDeleteConfirmation = (id) => {
    setDeleteUserId(id);
    setShowDeletePopup(true);
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const nextUsers = users.filter((user) => user.id !== id);
        setUsers(nextUsers);
        console.log(`User with id: ${id} is deleted`);
        setShowDeletePopup(false);
        setDeleteUserId(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="userCard">
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
            <Link className="editButton" href={`/users/${user.id}`}>
              <div>
                <div className="edit-icon-label-container">
                  <MdEdit size={18} />
                  <div>EDIT</div>
                </div>
              </div>
            </Link>
            <div onClick={() => showDeleteConfirmation(user.id)} className="deleteButton">
              <IoTrashOutline size={20} />
            </div>
          </div>
        </div>
      ))}
      
      {showDeletePopup && (
        <div className="popup">
          <div className="popupContent">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => deleteUser(deleteUserId)}>Yes</button>
            <button onClick={() => setShowDeletePopup(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
