# Last.fm Booster

A Node.js script to automate Last.fm scrobbling and library management. Easily scrobble random tracks, add artists to your library, and more.

---

## Installation

1. **Install Node.js**:
   - Download and install Node.js from [here](https://nodejs.org/).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/ProbTom/last.fm-booster.git
   cd lastfm-booster
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Get API Credentials**:
   - Create an application on Last.fm to get your API key and secret:
     [Last.fm API Account](http://www.last.fm/api/account/create).

5. **Edit `config.json`**:
   - Add your Last.fm API credentials:
     ```json
     {
       "lfm": {
         "api_key": "YOUR_API_KEY",
         "secret": "YOUR_API_SECRET"
       }
     }
     ```

6. **Authenticate**:
   - Run the `auth` method to generate a session key:
     ```bash
     node index.js --method=auth
     ```
   - Follow the instructions to authorize the application.
   - Update `config.json` with the session key:
     ```json
     {
       "lfm": {
         "api_key": "YOUR_API_KEY",
         "secret": "YOUR_API_SECRET"
       },
       "sessionCreds": {
         "username": "YOUR_USERNAME",
         "key": "YOUR_SESSION_KEY"
       }
     }
     ```

---

## Usage

Run the script with the desired method:
```bash
node index.js --method METHOD [OPTIONS]
```

### Available Methods

- **`auth`**:
  - Authenticate with Last.fm and generate a session key.
  - Example:
    ```bash
    node index.js --method=auth
    ```

- **`scrobbleRandom`**:
  - Scrobble random tracks to your Last.fm account.
  - Example:
    ```bash
    node index.js --method=scrobbleRandom
    ```

- **`addToLibrary`**:
  - Add artists from a specific user to your library.
  - Example:
    ```bash
    node index.js --method=addToLibrary --user=TaggingMachine
    ```

### Options

- **`--nolog`**: Disable logging.
- **`--user`**: Specify a Last.fm user (for `addToLibrary`).
- **`--dm`**: Delay multiplier (e.g., `--dm=2` for slower execution).

---

## Examples

1. **Scrobble Random Tracks**:
   ```bash
   node index.js --method=scrobbleRandom
   ```

2. **Add Artists from TaggingMachine**:
   ```bash
   node index.js --method=addToLibrary --user=TaggingMachine
   ```

3. **Disable Logging**:
   ```bash
   node index.js --method=scrobbleRandom --nolog
   ```

---

## Troubleshooting

### Invalid Session Key
If you see errors like `Invalid session key`, re-authenticate:
```bash
node index.js --method=auth
```

### API Rate Limits
If you hit API rate limits, increase the delay between actions:
```bash
node index.js --method=scrobbleRandom --dm=5
```
---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## Support

If you find this project useful, consider giving it a ⭐ on GitHub!

---

## Contact

- [Discord](https://discord.com/users/229396464848076800)
- Telegram [@ProbTom](https://t.me/ProbTom)

---

## Credits

[Yura415](https://github.com/yura415/lastfm-booster)
