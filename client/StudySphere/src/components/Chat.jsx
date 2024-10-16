import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment'; // To handle timestamp formatting

const socket = io('http://localhost:8000'); // Connect to the server

function ChatComponent({ groupId, userId, username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join_group', groupId);

    socket.on('chat_history', (history) => {
      setMessages(history);
    });

    socket.on('receive_message', (data) => {
      console.log(data)
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit('leave_group', groupId);
      socket.off('chat_history');
      socket.off('receive_message');
    };
  }, [groupId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { groupId, message, userId, username });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen p-4">
   
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.userId === userId ? 'justify-end' : 'justify-start'
            }`}
          >

            <div
              className={`p-3 max-w-xs rounded-lg shadow ${
                msg.userId === userId
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-400 text-black self-start'
              }`}
            >
              <p className="font-medium">
                {msg.userId !== userId && <span>{msg.username}</span>}
              </p>
              <p>{msg.message}</p>
              <p className="text-xs text-gray-200 mt-2 text-right">
                {moment(msg.timestamp).format('h:mm A')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
