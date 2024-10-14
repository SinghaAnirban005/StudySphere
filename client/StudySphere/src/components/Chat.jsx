// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { useParams } from "react-router-dom";
// import axios from "axios"

// const socket = io('http://localhost:8000');  // Replace with your server URL if hosted elsewhere

// function Chat() {
//   const { groupId } = useParams(); // Extract groupId from URL params
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Connect to the chat room when the component mounts
//   useEffect(() => {
//     // Fetch messages when the component mounts or groupId changes
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/chat/${groupId}`, { withCredentials: true });
//         setMessages(response.data.data);
//       } catch (error) {
//         console.error('Failed to load messages:', error);
//       }
//     };
  
//     // Call the fetch function to load previous messages
//     fetchMessages();
  
//     // Join the socket group based on groupId
//     const joinGroup = () => {
//       if (groupId && socket.connected) {
//         socket.emit('join_group', groupId);
//       }
//     };
  
//     // Call joinGroup function initially
//     joinGroup();
  
//     // If socket isn't connected yet, join the group when the connection is established
//     socket.on('connect', () => {
//       joinGroup();
//     });
  
//     // Listen for incoming messages
//     const handleNewMessage = (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };
//     socket.on('receive_message', handleNewMessage);
  
//     // Handle disconnection and reconnection scenarios
//     socket.on('disconnect', () => {
//       console.warn('Socket disconnected. Attempting to reconnect...');
//     });
  
//     socket.on('reconnect', () => {
//       console.log('Socket reconnected. Rejoining the group...');
//       joinGroup(); // Rejoin the group after reconnection
//     });
  
//     // Cleanup function to run when the component unmounts
//     return () => {
//       // Leave the group if component unmounts or groupId changes
//       if (groupId) {
//         socket.emit('leave_group', groupId);
//       }
  
//       // Remove event listeners to avoid memory leaks
//       socket.off('receive_message', handleNewMessage);
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('reconnect');
//     };
//   }, [groupId]);
  
  

//   // Handle sending messages
//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       const messageData = {
//         groupId,
//         senderId: "your-user-id", // Replace with actual sender ID from your auth system
//         content: message,
//       };

//       // Emit the message to the server
//       socket.emit("send_message", messageData);

//       // Add the message to the local state
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { content: message, self: true }
//       ]);

//       // Clear the input field
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col h-full p-4">
//       {/* Message Display Area */}
//       <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 my-1 rounded-md ${
//               msg.self
//                 ? "bg-blue-500 text-white text-right"
//                 : "bg-gray-300 text-black text-left"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       {/* Message Input Field */}
//       <div className="flex mt-4">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
