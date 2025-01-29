import { useState } from "react";
import FriendCard from "../components/FriendCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]);

  // Friend requests state
  const [friendRequests, setFriendRequests] = useState({
    1: "pending", // Friend ID with request status ("pending", "sent", "accepted", "rejected")
    2: "sent",
  });

  const handleSendRequest = (id) => {
    setFriendRequests((prevRequests) => ({ ...prevRequests, [id]: "sent" }));
  };

  const handleAcceptRequest = (id) => {
    setFriendRequests((prevRequests) => ({ ...prevRequests, [id]: "accepted" }));
  };

  const handleRejectRequest = (id) => {
    setFriendRequests((prevRequests) => ({ ...prevRequests, [id]: "rejected" }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to ConnectMate</h1>
        <p className="text-gray-600 mt-2">Connect with friends and grow your network!</p>

        <div className="mt-6 flex gap-4">
          <input
            type="text"
            placeholder="Search Friends..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded-lg"
          />
        </div>

        <div className="mt-8 w-full max-w-md">
          <h3 className="text-xl font-semibold text-blue-500">Suggested Friends</h3>
          <div className="space-y-4 mt-4">
            {filteredUsers.map((user) => (
              <FriendCard
                key={user.id}
                friend={user}
                onSendRequest={handleSendRequest}
                onAcceptRequest={handleAcceptRequest}
                onRejectRequest={handleRejectRequest}
                requestStatus={friendRequests[user.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
