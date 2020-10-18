const http = require('http');
const axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const getData = async () => {
        try {
            const response = await axios.get(
                'https://api.github.com/repos/nodejs/node'
            );

            const {
                stargazers_count,
                forks_count,
                open_issues_count,
            } = response.data;

            res.end(
                `Stargazers: ${stargazers_count}` +
                    '\n' +
                    `Forks: ${forks_count}` +
                    '\n' +
                    `Open Issues: ${open_issues_count}`
            );
        } catch (e) {
            res.statusCode = 500;
            res.end('Internal error issued.');
        }
    };

    getData();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
