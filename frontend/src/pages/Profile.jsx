import { useState } from "react";
import FriendCard from "../components/FriendCard";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [user] = useState({
    username: "John Doe",
    email: "john@example.com",
  });

  // Dummy Friend Data
  const friends = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];

  // Dummy Friend Requests
  const [friendRequests, setFriendRequests] = useState({
    3: "pending", // New friend request from Charlie
  });

  const handleUnfriend = (id) => {
    console.log(`Unfriended user with ID: ${id}`);
  };

  const handleSendRequest = (id) => {
    console.log(`Friend request sent to user with ID: ${id}`);
  };

  const handleAcceptRequest = (id) => {
    setFriendRequests((prevRequests) => ({ ...prevRequests, [id]: "accepted" }));
  };

  const handleRejectRequest = (id) => {
    setFriendRequests((prevRequests) => ({ ...prevRequests, [id]: "rejected" }));
  };

  // Dummy Mutual Friends
  const mutualFriends = [
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center mt-20 h-[80vh]">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-600">Profile</h2>
          <div className="mt-4">
            <p className="text-lg font-semibold">Username: {user.username}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-500">Your Friends</h3>
            <div className="space-y-4 mt-4">
              {friends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onSendRequest={handleSendRequest}
                  onAcceptRequest={handleAcceptRequest}
                  onRejectRequest={handleRejectRequest}
                  requestStatus="accepted"
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-500">Pending Friend Requests</h3>
            <div className="space-y-4 mt-4">
              {Object.keys(friendRequests).map((key) => (
                <FriendCard
                  key={key}
                  friend={{ id: key, name: "Charlie", email: "charlie@example.com" }}
                  onSendRequest={handleSendRequest}
                  onAcceptRequest={handleAcceptRequest}
                  onRejectRequest={handleRejectRequest}
                  requestStatus={friendRequests[key]}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-500">Mutual Friends</h3>
            <div className="space-y-4 mt-4">
              {mutualFriends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onSendRequest={handleSendRequest}
                  onAcceptRequest={handleAcceptRequest}
                  onRejectRequest={handleRejectRequest}
                  requestStatus="accepted"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
