const express = require('express');
const helmet = require('helmet');
const app = express();

// Use helmet middleware to hide X-Powered-By header
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

const timeInseconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({maxAge: timeInseconds, force: true}));

//prefect controller
app.use(helmet.dnsPrefetchControl());
//disble client-side Cashing 
app.use(helmet.noCache());


//Security Policy 
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
  })
);







module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});