import { setTimeout } from 'timers/promises';

export default function (params, lfm) {
  (async () => {
    while (true) {
      try {
        const artist = Math.random().toString(36).slice(2, 7);
        const track = Math.random().toString(36).slice(2, 7);

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

        const delay = 450 + Math.random() * 100;
        await setTimeout(delay);
      } catch (err) {
        console.error('Scrobble loop error:', err);
      }
    }
  })();
}