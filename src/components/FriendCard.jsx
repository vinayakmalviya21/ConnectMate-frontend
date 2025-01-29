const FriendCard = ({ friend, onSendRequest, onAcceptRequest, onRejectRequest, requestStatus }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="font-semibold">{friend.name}</h4>
      <p>{friend.email}</p>

      {/* Render appropriate button based on the request status */}
      {requestStatus === "pending" && (
        <div>
          <button
            onClick={() => onAcceptRequest(friend.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Accept
          </button>
          <button
            onClick={() => onRejectRequest(friend.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Reject
          </button>
        </div>
      )}

      {requestStatus === "sent" && (
        <button
          disabled
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Request Sent
        </button>
      )}

      {requestStatus === "accepted" && (
        <button
          disabled
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Friends
        </button>
      )}

      {requestStatus === "rejected" && (
        <button
          disabled
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Rejected
        </button>
      )}

      {requestStatus === undefined && (
        <button
          onClick={() => onSendRequest(friend.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Send Friend Request
        </button>
      )}
    </div>
  );
};

export default FriendCard;