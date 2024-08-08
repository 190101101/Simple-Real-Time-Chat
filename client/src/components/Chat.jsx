import React from 'react';

const Chat = ({ username, room, socket }) => {
  const [message, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState('');

  React.useEffect(() => {
    socket.on('messageReturn', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date: new Date().getHours() + ':' + new Date().getMinutes(),
    };
    await socket.emit('message', messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage('');
  };

  console.log(messageList);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[600px] bg-indigo-600 relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-2">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                className={`${
                  username === msg.username ? 'flex justify-end' : ''
                }`}
              >
                <div
                  className={`${
                    username === msg.username
                      ? 'bg-green-600'
                      : 'bg-fuchsia-600'
                  } w-2/3 h-12 p-2 text-white m-1 rounded-xl  rounded-br-none`}
                >
                  <div>{msg.message}</div>
                  <div className="w-full flex justify-end text-xs">
                    {msg.username} {msg.date}
                  </div>
                </div>
              </div>
            ))}
          {/*  */}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <input
            className="w-3/4 h-12 border p-3 "
            type="text"
            placeholder="message send"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-green-600 text-white h-12 hover:opacity-70"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
