class AudioManager {
  constructor() {
    this.audio = new Audio("/complete.mp3");
    this.audio.volume = 0.5; // 0.0 - 1.0, 0.5 = 50% volume
    this.isPlaying = false;

    // Reset isPlaying when audio ends
    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
    });
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.audio.currentTime = 0; // Reset to start
      this.audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
        this.isPlaying = false;
      });
    }
  }
}

// single instance shared across the app
export const audioManager = new AudioManager();
