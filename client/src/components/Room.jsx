import React from 'react';

const Room = ({
  username,
  room,
  setUsername,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const sendRoom = () => {
    socket.emit('room', room);
    setChatScreen(true);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[350px] bg-indigo-600 flex flex-col space-y-4 p-3 rounded-lg">
        <h1 className="font-bold text-2xl text-center my-4 ">NODE CHAT</h1>
        <input
          className="h-12 rounded-xl p-3 ouline-none"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="h-12 rounded-xl p-3 ouline-none"
          type="text"
          placeholder="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <div
          onClick={sendRoom}
          className="tracking-wider bg-indigo-900 text-white h-12 pt-2 text-lg text-center rounded-xl cursor-pointer hover:opacity-60"
        >
          log in
        </div>
      </div>
    </div>
  );
};

export default Room;
