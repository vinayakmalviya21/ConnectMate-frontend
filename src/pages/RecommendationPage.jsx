import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const RecommendationsPage = () => {
  const [mutualFriends, setMutualFriends] = useState([]);
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [commonInterests, setCommonInterests] = useState([]);

  // Sample data, replace with actual API calls
  useEffect(() => {
    setMutualFriends([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
    setRecommendedFriends([
      { id: 3, name: 'Alice Johnson' },
      { id: 4, name: 'Bob Brown' },
    ]);
    setCommonInterests(['Music', 'Technology']);
  }, []);

  return (
    <div className="p-5">
        <Navbar />
      {/* Mutual Friends */}
      <div className="mb-6">
        <h2 className="font-semibold text-xl">Mutual Friends</h2>
        <ul>
          {mutualFriends.map((friend) => (
            <li key={friend.id} className="mb-2">
              {friend.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Common Interests */}
      {commonInterests.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-xl">Common Interests</h2>
          <ul>
            {commonInterests.map((interest, idx) => (
              <li key={idx} className="mb-2">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Friends */}
      <div>
        <h2 className="font-semibold text-xl">Friend Recommendations</h2>
        <ul>
          {recommendedFriends.map((friend) => (
            <li key={friend.id} className="mb-2">
              {friend.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsPage;
