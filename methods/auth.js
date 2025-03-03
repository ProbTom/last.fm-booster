import http from 'http';

export default function (params, lfm) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      res.end('Missing token parameter');
      return;
    }

    lfm.authenticate(token, (err, session) => {
      if (err) {
        res.end(`Authentication failed: ${err.message}`);
        console.error('Auth error:', err);
        return;
      }

      const config = {
        lfm: {
          api_key: params.lfm.api_key,
          secret: params.lfm.secret
        },
        sessionCreds: session
      };

      res.end(`Add to config.json:\n${JSON.stringify(config, null, 2)}`);
      console.log('Session credentials:', session);
      server.close();
    });
  });

  server.listen(params.port || 3000, () => {
    const authUrl = lfm.getAuthenticationUrl({
      callbackUrl: `http://localhost:${params.port || 3000}/`
    });
    console.log(`Authorize here: ${authUrl}`);
  });
}