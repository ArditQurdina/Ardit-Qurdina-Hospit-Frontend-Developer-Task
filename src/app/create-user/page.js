"use client";

import { useState } from "react";
import '../home-page.css';

const CreateUser = () => {
    const [createdUserName, setCreatedUserName] = useState("");
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const [createdUserUsername, setCreatedUserUsername] = useState("");
    const [createdUserPhone, setCreatedUserPhone] = useState(""); // Fixed naming
    const [createdUserStreet, setCreatedUserStreet] = useState("");
    const [createdUserCity, setCreatedUserCity] = useState("");

    const postNewUser = async (e) => {
        e.preventDefault();
        const newUser = {
            name: createdUserName,
            username: createdUserUsername,
            email: createdUserEmail,
            phone: createdUserPhone,
            address: {
                street: createdUserStreet,
                city: createdUserCity
            }
        };

        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const confirmedCreatedUser = await res.json();
            console.log(`User with ID ${confirmedCreatedUser.id} was successfully created!`, confirmedCreatedUser);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return ( 
        <div className="userFormContainer">
            <form onSubmit={postNewUser}>
                <div className="userFormGroup">
                    <label className="userLabel">Name</label>
                    <input 
                        type="text"
                        required 
                        className="userInput"
                        value={createdUserName}
                        onChange={(e) => setCreatedUserName(e.target.value)}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Email</label>
                    <input 
                        type="email"
                        required
                        className="userInput"
                        value={createdUserEmail}
                        onChange={(e) => setCreatedUserEmail(e.target.value)}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Username</label>
                    <input 
                        type="text"
                        required
                        className="userInput"
                        value={createdUserUsername} 
                        onChange={(e) => setCreatedUserUsername(e.target.value)}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Phone</label>
                    <input 
                        type="tel" // Changed to tel
                        required
                        className="userInput"
                        value={createdUserPhone}
                        onChange={(e) => setCreatedUserPhone(e.target.value)}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Street</label>
                    <input 
                        type="text"
                        required
                        className="userInput"
                        value={createdUserStreet}
                        onChange={(e) => setCreatedUserStreet(e.target.value)}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">City</label>
                    <input 
                        type="text"
                        required
                        className="userInput"
                        value={createdUserCity}
                        onChange={(e) => setCreatedUserCity(e.target.value)}
                    />
                </div>
                <button type="submit" className="userButton">Create New User</button>
            </form>
        </div>
    );
};
 
export default CreateUser;
