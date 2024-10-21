"use client";
import { useState, useEffect } from "react";
import "../../home-page.css";
import { useRouter } from "next/navigation";

const EditUser = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
        address: {
            street: "",
            city: ""
        }
    });

    const [successfulMessage, setSuccessfulMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const editForm = async (e) => {
        e.preventDefault();
        const editedUser = {
            ...user
        };

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedUser),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                console.log(`User with id: ${id} has been edited`);
                setSuccessfulMessage(true);
                console.log(`User with id: ${id} is updated`);
                console.log("Updated User Data:", updatedUser);
                // setTimeout(() => {
                //     router.push("/");
                // }, 1500);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    if (isLoading) {
        return <p className="loading-status">Loading user data...</p>;
    }

    return (
        <div className="userFormContainer">
            <form onSubmit={editForm}>
                <div className="userFormGroup">
                    <label className="userLabel">Name</label>
                    <input
                        type="text"
                        required
                        className="userInput"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Email</label>
                    <input
                        type="email"
                        required
                        className="userInput"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Username</label>
                    <input
                        type="text"
                        required
                        className="userInput"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Phone</label>
                    <input
                        type="text"
                        required
                        className="userInput"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">Street</label>
                    <input
                        type="text"
                        required
                        className="userInput"
                        value={user.address.street}
                        onChange={(e) =>
                            setUser({ ...user, address: { ...user.address, street: e.target.value } })
                        }
                    />
                </div>
                <div className="userFormGroup">
                    <label className="userLabel">City</label>
                    <input
                        type="text"
                        required
                        className="userInput"
                        value={user.address.city}
                        onChange={(e) =>
                            setUser({ ...user, address: { ...user.address, city: e.target.value } })
                        }
                    />
                </div>

                <div className="formButtons">
                    <button type="submit" className="userButton">Save Changes</button>
                </div>
            </form>
            {successfulMessage && (
                <div className="userSuccessMessage" aria-live="polite">
                    You have successfully edited the user
                </div>
            )}
        </div>
    );
};

export default EditUser;
