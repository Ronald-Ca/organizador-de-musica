const entrySongInput = document.getElementById('entrySong');
const playlistInput = document.getElementById('playlist');
const generatePlaylistButton = document.getElementById('generatePlaylistButton');
const downloadPlaylistButton = document.getElementById('downloadPlaylistButton');
const audioPlayer = document.getElementById('audioPlayer');
const nextButton = document.getElementById('nextButton');
const playerDiv = document.querySelector('.player');
const downloadLinksDiv = document.querySelector('.downloadLinks');
const linksContainer = document.getElementById('linksContainer');

let entrySong;
let playlist = [];
let fullPlaylist = [];
let currentIndex = 0;

generatePlaylistButton.addEventListener('click', () => {
    if (entrySongInput.files.length === 0 || playlistInput.files.length === 0) {
        alert('Por favor, faça upload da música de entrada e da playlist.');
        return;
    }

    entrySong = URL.createObjectURL(entrySongInput.files[0]);
    playlist = Array.from(playlistInput.files).map(file => URL.createObjectURL(file));

    generateFullPlaylist();
    playerDiv.style.display = 'block';
    playNextSong();
    generateDownloadLinks();
    downloadLinksDiv.style.display = 'block';
    downloadPlaylistButton.style.display = 'block';
});

function generateFullPlaylist() {
    fullPlaylist = [];
    for (let i = 0; i < playlist.length; i++) {
        fullPlaylist.push(playlist[i]);
        if ((i + 1) % 3 === 0) {
            fullPlaylist.push(entrySong);
        }
    }
}

function playNextSong() {
    if (currentIndex < fullPlaylist.length) {
        audioPlayer.src = fullPlaylist[currentIndex];
        audioPlayer.play();
        currentIndex++;
    } else {
        currentIndex = 0; // Reinicia a playlist quando termina
        playNextSong();
    }
}

audioPlayer.addEventListener('ended', playNextSong);
nextButton.addEventListener('click', playNextSong);

function generateDownloadLinks() {
    linksContainer.innerHTML = ''; // Limpa links anteriores

    for (let i = 0; i < fullPlaylist.length; i++) {
        const a = document.createElement('a');
        a.href = fullPlaylist[i];
        a.download = `song${i + 1}.mp3`;
        a.textContent = `Download Música ${i + 1}`;
        a.style.display = 'block';
        linksContainer.appendChild(a);
    }
}

downloadPlaylistButton.addEventListener('click', () => {
    const links = document.querySelectorAll('#linksContainer a');
    let delay = 0;

    links.forEach(link => {
        setTimeout(() => {
            link.click();
        }, delay);
        delay += 1000; // Intervalo de 1 segundo entre cada download
    });
});
