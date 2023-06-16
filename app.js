/*
// var https = require('https');
// var fs = require('fs');
import https from 'https'
import fs from 'fs'

let https_options = {
    key: fs.readFileSync("api/private.key"),
    cert: fs.readFileSync("api/borapp.cac.gov.ng.crt"),
    ca: [
        fs.readFileSync('api/CA_root.crt'),
        fs.readFileSync('api/ca_bundle_certificate.crt')
    ] };
https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Welcome to Node.js HTTPS Server");
}).listen(8443)
*/
