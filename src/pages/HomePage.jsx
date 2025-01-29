import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  // Sample users data, replace with actual API call
  useEffect(() => {
    // Mocking data, replace with actual API call
    setUsers([
      { id: 1, name: 'John Doe', isFriend: false },
      { id: 2, name: 'Jane Smith', isFriend: false },
      { id: 3, name: 'Alice Johnson', isFriend: true },
    ]);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSendRequest = (userId) => {
    setRequests([...requests, userId]);
  };

  const handleUnfriend = (userId) => {
    setFriends(friends.filter((friend) => friend !== userId));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <Navbar />
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Users"
          className="p-2 border rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* User List */}
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Users</h2>
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between mb-2">
              <span>{user.name}</span>
              <div>
                {!user.isFriend && !requests.includes(user.id) ? (
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Send Request
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnfriend(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Unfriend
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
            <li key={friendId} className="flex items-center mb-2">
              <span>{users.find((user) => user.id === friendId)?.name}</span>
              <button
                onClick={() => handleUnfriend(friendId)}
                className="bg-red-500 text-white px-3 py-1 rounded ml-2"
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
