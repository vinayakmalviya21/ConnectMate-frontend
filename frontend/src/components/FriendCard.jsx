const FriendCard = ({ friend, onSendRequest, onAcceptRequest, onRejectRequest, requestStatus }) => {
  const renderRequestButton = () => {
    if (requestStatus === "pending") {
      return (
        <div>
          <button
            onClick={() => onAcceptRequest(friend.id)}
            className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2"
          >
            Accept
          </button>
          <button
            onClick={() => onRejectRequest(friend.id)}
            className="bg-red-500 text-white px-4 py-1 rounded-lg"
          >
            Reject
          </button>
        </div>
      );
    }
    if (requestStatus === "sent") {
      return <p className="text-gray-500">Request Sent</p>;
    }
    return (
      <button
        onClick={() => onSendRequest(friend.id)}
        className="bg-blue-500 text-white px-4 py-1 rounded-lg"
      >
        Send Friend Request
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold">{friend.name}</h3>
        <p className="text-gray-500">{friend.email}</p>
      </div>
      {renderRequestButton()}
    </div>
  );
};

export default FriendCard;
