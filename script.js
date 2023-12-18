const audio = document.getElementById('audio');
  const playPauseButton = document.getElementById('playPause');
  const stopButton = document.getElementById('stop');
  const volumeControl = document.getElementById('volume');
  const fileInput = document.getElementById('fileInput');
  const playlistContainer = document.getElementById('playlist');

  playPauseButton.addEventListener('click', togglePlayPause);
  stopButton.addEventListener('click', stopAudio);
  volumeControl.addEventListener('input', setVolume);
  fileInput.addEventListener('change', loadFiles);

  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = 'Pause';
    } else {
      audio.pause();
      playPauseButton.textContent = 'Play';
    }
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    playPauseButton.textContent = 'Play';
  }

  function setVolume() {
    audio.volume = volumeControl.value;
  }

  function loadFiles() {
    const files = fileInput.files;

    if (files.length === 0) return;

    playlistContainer.innerHTML = ''; // Limpar a lista de reprodução antes de adicionar novos itens

    for (let i = 0; i < files.length; i++) {
      const fileURL = URL.createObjectURL(files[i]);
      const listItem = document.createElement('div');
      listItem.textContent = files[i].name;
      listItem.classList.add('playlist-item');
      listItem.addEventListener('click', () => playFile(fileURL));
      playlistContainer.appendChild(listItem);
    }

    playFile(URL.createObjectURL(files[0])); // Reproduzir a primeira música automaticamente
  }

  function playFile(fileURL) {
    audio.src = fileURL;
    audio.load();
    playPauseButton.textContent = 'Play';
  }