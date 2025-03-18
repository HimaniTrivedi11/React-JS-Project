import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users") // API call
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;