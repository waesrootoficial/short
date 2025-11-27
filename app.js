const socket = io();

let roomName = '';
const player1ScoreEl = document.getElementById('player1Score');
const player2ScoreEl = document.getElementById('player2Score');
const clickBtn = document.getElementById('clickBtn');
const joinBtn = document.getElementById('joinBtn');
const roomInput = document.getElementById('roomInput');

joinBtn.onclick = () => {
  roomName = roomInput.value.trim();
  if(roomName) {
    socket.emit('joinRoom', roomName);
    document.getElementById('roomSelect').style.display = 'none';
  }
};

clickBtn.onclick = () => {
  if(roomName) socket.emit('clickPotion', roomName);
};

socket.on('updatePlayers', players => {
  const ids = Object.keys(players);
  if(ids[0] === socket.id) {
    player1ScoreEl.textContent = players[socket.id].clicks;
    if(ids[1]) player2ScoreEl.textContent = players[ids[1]].clicks;
  } else if(ids[1] === socket.id){
    player1ScoreEl.textContent = players[ids[0]].clicks;
    player2ScoreEl.textContent = players[socket.id].clicks;
  } else {
    player2ScoreEl.textContent = ids[0] ? players[ids[0]].clicks : 0;
  }
});
