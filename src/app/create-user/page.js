"use client"

import { useState } from "react";

const CreateUser = () => {
    const [createdUserName, setCreatedUserName] = useState("")
    // const [createdUserAddress, setCreatedUserAddress] = useState("")
    const [createdUserEmail, setCreatedUserEmail] = useState("")
    const [createdUsername, setCreatedUsername] = useState("")
    const [createdUserPhone, setcreatedUserPhone] = useState("")

    const postNewUser = async (e) => {
        e.preventDefault();
        const newUser = {
            name: createdUserName,
            username: createdUsername,
            email: createdUserEmail,
            phone: createdUserPhone
        }
        try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(newUser)
        }
        )

        if (res.ok) {
            const confirmedCreatedUser = await res.json();
            console.log(`Ninja with ID ${confirmedCreatedUser.id} was successfully created!`, confirmedCreatedUser);
        }
    }
    catch {

    }
    }
    return ( 
        <div>
            <form onSubmit={postNewUser} action="">
                <input 
                    type="text"
                    required 
                    placeholder="Name"
                    value={createdUserName}
                    onChange={(e) => setCreatedUserName(e.target.value)}
                />
                <input 
                    type="text" 
                    required
                    placeholder="Email"
                    value={createdUserEmail}
                    onChange={(e) => setCreatedUserEmail(e.target.value)}
                />
                <input 
                    type="text"
                    required
                    placeholder="Username"
                    value={createdUsername} 
                    onChange={(e) => setCreatedUsername(e.target.value)}
                />
                <input 
                    type="number"
                    required
                    placeholder="Phone"
                    value={createdUserPhone}
                    onChange={(e) => setcreatedUserPhone(e.target.value)}
                />
                <button>Create New User</button>
            </form>
        </div>
     );
}
 
export default CreateUser;