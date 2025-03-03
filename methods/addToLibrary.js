import { setTimeout } from 'timers/promises';

export default function (params, lfm) {
  const artist = "The Weeknd"; // Focus on The Weeknd
  const tracks = [
    "Blinding Lights",
    "Starboy",
    "Save Your Tears",
    "Can't Feel My Face",
    "The Hills"
  ]; // Add more tracks if needed

  (async () => {
    while (true) {
      for (const track of tracks) {
        try {
          await new Promise((resolve) => {
            lfm.track.scrobble({
              artist,
              track,
              timestamp: Math.floor(Date.now() / 1000)
            }, (err) => {
              if (err) {
                console.error(`Error scrobbling ${artist} - ${track}:`, err.message);
              } else if (params.log) {
                console.log(`Scrobbled: ${artist} - ${track}`);
              }
              resolve();
            });
          });

          const delay = 3000; // 3-second delay to avoid rate limits
          await setTimeout(delay);
        } catch (err) {
          console.error('Fatal error:', err.message);
          process.exit(1);
        }
      }
    }
  })();
}