import React from 'react';
import io from 'socket.io-client';
import Room from './components/Room';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:5000');

function App() {
  const [username, setUsername] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [chatScreen, setChatScreen] = React.useState(false);

  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      ) : (
        <Chat username={username} room={room} socket={socket} />
      )}
    </div>
  );
}

export default App;
