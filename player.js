class MusicPlayer {
    constructor() {
        this.songs = document.querySelectorAll('.song');
        this.currentAudio = null;
        this.currentSong = null;
        this.isPlaying = false;
        this.initializePlayer();
    }

    initializePlayer() {
        this.songs.forEach(song => {
            song.addEventListener('click', () => this.handleSongClick(song));
        });
    }

    handleSongClick(song) {
        if (this.currentSong === song) {
            // Toggle play/pause for current song
            this.togglePlayPause();
        } else {
            // Play new song
            this.stopCurrentSong();
            this.playSong(song);
        }
    }

    playSong(song) {
        const songPath = song.dataset.song;
        if (!songPath) return;

        // Create new audio element
        this.currentAudio = new Audio(songPath);
        this.currentSong = song;
        
        // Update UI
        song.classList.add('playing');
        const playBtn = song.querySelector('.fa-play');
        if (playBtn) playBtn.classList.replace('fa-play', 'fa-pause');

        // Setup audio events
        this.setupAudioEvents();
        
        // Play the song
        this.currentAudio.play()
            .catch(error => {
                console.error('Error playing audio:', error);
                this.updatePlayButton(song, true);
            });
    }

    stopCurrentSong() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        if (this.currentSong) {
            this.currentSong.classList.remove('playing');
            const playBtn = this.currentSong.querySelector('.fa-pause');
            if (playBtn) playBtn.classList.replace('fa-pause', 'fa-play');
        }
    }

    togglePlayPause() {
        if (!this.currentAudio) return;

        if (this.currentAudio.paused) {
            this.currentAudio.play();
            this.updatePlayButton(this.currentSong, false);
        } else {
            this.currentAudio.pause();
            this.updatePlayButton(this.currentSong, true);
        }
    }

    updatePlayButton(song, isPlayIcon) {
        const icon = song.querySelector('.song-play-btn i');
        if (icon) {
            if (isPlayIcon) {
                icon.classList.replace('fa-pause', 'fa-play');
                song.classList.remove('playing');
            } else {
                icon.classList.replace('fa-play', 'fa-pause');
                song.classList.add('playing');
            }
        }
    }

    setupAudioEvents() {
        if (!this.currentAudio || !this.currentSong) return;

        const progressBar = this.currentSong.querySelector('.progress');
        const timeDisplay = this.currentSong.querySelector('.time');

        this.currentAudio.addEventListener('timeupdate', () => {
            const progress = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
            if (progressBar) progressBar.style.width = `${progress}%`;
            
            if (timeDisplay) {
                const currentTime = this.formatTime(this.currentAudio.currentTime);
                timeDisplay.textContent = currentTime;
            }
        });

        this.currentAudio.addEventListener('ended', () => {
            this.updatePlayButton(this.currentSong, true);
            if (progressBar) progressBar.style.width = '0%';
            if (timeDisplay) timeDisplay.textContent = '0:00';
        });

        // Add click handler for progress bar
        const progressBarContainer = this.currentSong.querySelector('.progress-bar');
        if (progressBarContainer) {
            progressBarContainer.addEventListener('click', (e) => {
                const rect = progressBarContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                this.currentAudio.currentTime = pos * this.currentAudio.duration;
            });
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize player when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});
