#!/usr/bin/env node
/**
 * Author
 * @Olive Okechukwu
 **/
import express from 'express';
import { corAllowedList } from "./src/middlewares/cors.js";
import bodyParser from 'body-parser';
import cors from "cors";

import {route_get_psc} from "./src/routes/route_get_psc.js";
import {route_psc_details} from "./src/routes/route_psc_details.js";
import {route_admin_login} from "./src/routes/route_admin_login.js";
import {route_login} from "./src/routes/route_login.js";
import {route_logout} from "./src/routes/route_logout.js";
import {route_signup} from "./src/routes/route_signup.js";
import {route_eligibility} from "./src/routes/route_eligibility.js";
import {get_userTypes} from "./src/routes/get_userTypes.js";
import {route_portal_search} from "./src/routes/route_portal_search.js";
import {waiting_approval} from "./src/routes/waiting_approval.js";
import {approved_users} from "./src/routes/approved_users.js";
import {approved_admins} from "./src/routes/approved_admins.js";
import {inconsist_information} from "./src/routes/inconsist_information.js";
import {route_qk_action} from "./src/routes/route_qk_action.js";
import {route_recover} from "./src/routes/route_recover.js";
import {route_contact_us} from "./src/routes/route_contact_us.js";
import {route_feedback} from "./src/routes/route_feedback.js";
import {route_portal_download} from "./src/routes/route_portal_download.js";
import {route_user_data} from "./src/routes/route_user_data.js";
import {route_update_portal_user} from "./src/routes/route_update_portal_user.js";
import {route_account_update} from "./src/routes/route_account_update.js";
import {route_update_privilege} from "./src/routes/route_update_privilege.js";
import {admin_dashboard} from "./src/routes/admin_dashboard.js";

// import * as path from 'path'
import https from 'https'
import fs from 'fs'

const app = express();
const endpoint = '/api/';
const port = 5000;
const privateKey = fs.readFileSync('src/api/key.key');
const certificate = fs.readFileSync('src/api/cert.crt');

//const privateKey = fs.readFileSync('/var/www/httpd-cert/www-root/\*.cac.gov.ng_custom_1.key');
//const certificate = fs.readFileSync('/var/www/httpd-cert/www-root/\*.cac.gov.ng_custom_1.crt');

// app.get('/api/myIp',function(req, res) {
//     const ipAddress = req.socket.remoteAddress;
//     res.status(403).send(ipAddress);
// });

app.use(cors({
    origin: [`https://bor.cac.gov.ng`, `http://41.207.248.189:5003`,`http://localhost:5003`],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.json());

/*app.use(async (req, res, next) => {
        const origin = req.headers.origin;

        if (corAllowedList.includes(origin)) {
            console.log('Accepted by origin: ' + `${origin}`);

            res.setHeader('Access-Control-Allow-Origin', origin);
            // res.setHeader('Access-Control-Allow-Origin', `https://bor.cac.gov.ng`);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            return next()
        }
        console.log(`Blocked by origin: ${origin}`);
        res.status(403).send(`Request blocked by cross origin.!`);
        next();
    }
);*/

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

/*app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.post('/', function (req, res) {
    res.redirect('/index.html')
})*/

app.post(endpoint + 'login',async (req, res) => {
    res.status(200).send( await route_login([req.body],req));
});
app.post(endpoint + 'admin_login',async (req, res) => {
    await res.status(200).send( await route_admin_login([req.body],req));
});
app.post(endpoint + 'logout',async (req, res) => {
    res.status(200).send( await route_logout([req.body],req));
});
app.post(endpoint + 'signup',async (req, res) => {
    const origin = req.headers.origin;
    res.status(200).send(await route_signup([req.body],origin));
});
app.post(endpoint + 'contact_us',async (req, res) => {
    res.status(200).send(await route_contact_us([req.body],req));
});
app.post(endpoint + 'search_feedback',async (req, res) => {
    res.status(200).send(await route_feedback([req.body],req));
});
app.post(endpoint + 'get_psc',async (req,res) => {
    res.status(200).send(await route_get_psc([req.body]));
});
app.post(endpoint + 'update_portal_user',async (req,res) => {
    res.status(200).send(await route_update_portal_user([req.body],req));
});
app.post(endpoint + 'get_psc_details', async (req, res) => {
    res.status(200).send(await route_psc_details([req.body]));
});
app.post(endpoint + 'portal_search', async (req, res) => {
    res.status(200).send(await route_portal_search([req.body]));
});
app.post(endpoint + 'dataDownload', async (req, res) => {
    res.status(200).send(await route_portal_download([req.body]));
});
app.post(endpoint + 'quickAction', async (req, res) => {
    res.status(200).send(await route_qk_action(req.body));
});
app.post(endpoint + 'account_update', async (req, res) => {
    res.status(200).send(await route_account_update([req.body]));
});
app.post(endpoint + 'recover_password', async (req, res) => {
    res.status(200).send(await route_recover([req.body]));
});
app.post(endpoint + 'profile_user_data', async (req, res) => {
    res.status(200).send(await route_user_data(req.body.token,req));
});
app.post(endpoint + 'prepare_report', async (req, res) => {
    res.status(200).send(await route_eligibility(req.body.token,req));
});
app.post(endpoint + 'assign_pri', async (req, res) => {
    res.status(200).send(await route_update_privilege(req.body));
});
app.get(endpoint + 'userTypes', async (req, res) => {
    res.status(200).send(await get_userTypes());
});
app.get(endpoint + 'pending_approval', async (req, res) => {
    res.status(200).send(await waiting_approval());
});
app.get(endpoint + 'online_users', async (req, res) => {
    res.status(200).send(await approved_users());
});
app.get(endpoint + 'online_admins/:value', async (req, res) => {
    res.status(200).send(await approved_admins(req.params.value));
});
app.get(endpoint + 'inconsist_info', async (req, res) => {
    res.status(200).send(await inconsist_information());
});
app.get(endpoint + 'get_dashboard', async (req, res) => {
    res.status(200).send(await admin_dashboard());
});

app.listen(port,()=> {
    console.log(`API is running on port ${port}`);
})

/*
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port,()=> {
    console.log(`API is running on port ${port}`);
});
*/
