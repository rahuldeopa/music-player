const musicContainer = document.querySelector('.audio-container');
const forward = document.querySelector('#forward');
const play = document.querySelector('#btn-play');
const skip = document.querySelector('#btn-skip-forward');
const audio = document.querySelector('#audio');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const cover = document.querySelector('#cover');

const tracks = [
    {
        name: "beat1",
        artist: "Alec Benjamin",
        cover: "beat1.jpg",
        source: "beat1.mp3"
    },
    {
        name: "Let me love you",
        artist: "DJ Snake/Justin Beiber",
        cover: "beat2.jpg",
        source: "beat2.mp3"
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        cover: "beat3.jpg",
        source: "beat3.mp3"
    }
];

let songId = 0;

function loadTrack(tracks) {
    title.innerText = tracks.name;
    artist.innerText = tracks.artist;
    audio.src = `music/${tracks.source}`;
    cover.src = `images/${tracks.cover}`;
    audio.load();
}

function playSong() {
    musicContainer.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    cover.classList.add('pulse');
    
    audio.play(); // Make sure to start playing
}

function pauseSong() {
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.add('fa-play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    cover.classList.remove('pulse');
    audio.pause();
}

play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Load metadata to get duration
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.innerText = formatTime(audio.duration);
    progressBar.style.width = '0%';
});

// Update current time and progress bar
audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
    progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

// Function to format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load the first track
loadTrack(tracks[songId]);

// Add event listener for skip forward button
skip.addEventListener('click', () => {
    songId = (songId + 1) % tracks.length; // Loop back to the first track if at the end
    loadTrack(tracks[songId]);
    audio.play(); // Ensure the track plays automatically
    playSong();   // Update UI to play mode
});

// Add event listener for forward button
forward.addEventListener('click', () => {
    songId = (songId - 1 + tracks.length) % tracks.length; // Loop back to the last track if at the start
    loadTrack(tracks[songId]);
    audio.play(); // Ensure the track plays automatically
    playSong();   // Update UI to play mode
});

// Update audio current time when clicking on the progress bar
const progressContainer = document.querySelector('.audio-progress');
progressContainer.addEventListener('click', (e) => {
    const progressBarWidth = progressContainer.clientWidth; // Width of the progress bar container
    const clickX = e.clientX - progressContainer.getBoundingClientRect().left; // Click position
    const percentage = clickX / progressBarWidth; // Percentage of the click
    audio.currentTime = percentage * audio.duration; // Set audio current time
});

// Automatically play the next track when the current one ends
audio.addEventListener('ended', () => {
    songId = (songId + 1) % tracks.length; // Move to the next track
    loadTrack(tracks[songId]);
    playSong(); // Play the next track automatically
});
