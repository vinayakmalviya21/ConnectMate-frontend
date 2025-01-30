import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and friend data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call to get users
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`);
        setUsers(userResponse.data.users);

        // Replace with actual API call to get friends
        const friendResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/friends`);
        setFriends(friendResponse.data.friends);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load data. Please try again.",
        });
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSendRequest = async (userId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/friend-request/send`, { userId });
      setRequests([...requests, userId]);
      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Friend request sent successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send friend request.",
      });
    }
  };

  const handleUnfriend = async (userId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/friend-request/remove`, { userId });
      setFriends(friends.filter((friend) => friend !== userId));
      Swal.fire({
        icon: "success",
        title: "Unfriended",
        text: "You have unfriended the user.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to unfriend user.",
      });
    }
  };

  console.log("Users:", users);
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <Navbar />
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Users"
          className="p-2 border rounded w-full max-w-md mx-auto"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* User List */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Users</h2>
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between mb-2 border-b py-2"
            >
              <span>{user.username}</span>
              <div className="space-x-2">
                {user.isFriend || friends.includes(user.id) ? (
                  <button
                    onClick={() => handleUnfriend(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Unfriend
                  </button>
                ) : requests.includes(user.id) ? (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Request Sent
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Send Request
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Friend List */}
      <div>
        <h2 className="font-semibold text-xl">Your Friends</h2>
        <ul>
          {friends.map((friendId) => (
            <li
              key={friendId}
              className="flex items-center justify-between mb-2 border-b py-2"
            >
              <span>{users.find((user) => user.id === friendId)?.name}</span>
              <button
                onClick={() => handleUnfriend(friendId)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Unfriend
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
