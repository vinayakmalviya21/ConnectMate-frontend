import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "John Doe", friendCount: 3 });
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Sample friends data, replace with actual API call
    setFriends([
      { id: 1, name: "Alice Johnson" },
      { id: 2, name: "Bob Brown" },
      { id: 3, name: "Charlie Smith" },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-5">
        <h1 className="text-3xl font-semibold mb-4">Profile: {user.name}</h1>
        <p className="mb-6">Friends Count: {user.friendCount}</p>

        <div>
          <h2 className="font-semibold text-xl mb-4">Your Friends</h2>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} className="mb-2">
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
