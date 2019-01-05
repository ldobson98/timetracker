const app = require('./app.js');

const port = process.env.PORT || 4000;
app.listen(port, () => {
    const hostname = process.env.C9_HOSTNAME || `localhost:${port}`;
    console.log(`App running at http://${hostname}`);
});
