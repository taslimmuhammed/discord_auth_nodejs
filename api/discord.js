const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const router = express.Router();
const DiscordOauth2 = require("discord-oauth2");

const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', async (req, res) => {
   const CLIENT_ID = process.env.CLIENT_ID;
   res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

// try{
//         const oauth = new DiscordOauth2({});
//  oauth.tokenRequest({
// 	// clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
// 	clientId: CLIENT_ID,
// 	clientSecret: CLIENT_SECRET,
// 	scope: "identify guilds",
// 	grantType: "authorization_code",
// 	redirectUri: "http://localhost/callback",
// }).then(e=>{
//     console.log(e)
// }).catch(e=>{
//     console.log(e)
// })
// }catch(e){
//        console.log(e)
// }


 });
router.get('/callback', catchAsync(async (req, res) => {

    // const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    // const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Basic ${creds}`,
    //     },
    //   });
    // const json = await response.json();
    // console.log("hello",json, response)
    // res.redirect(`/?token=${json}`);
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    console.log("code",code)
     const CLIENT_ID = process.env.CLIENT_ID;
     const CLIENT_SECRET = process.env.CLIENT_SECRET;
try{
        const oauth = new DiscordOauth2();
        console.log({clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            code: code,
            grantType: "authorization_code",
            redirectUri: "http://localhost:50451",
        })
 oauth.tokenRequest({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	code: code,
	grantType: "authorization_code",
    // redirectUri: "http://localhost:50451",
}).then(e=>{
    console.log(e)
}).catch(e=>{
    console.log(e)
})
}catch(e){
       console.log(e)
}

  }));

module.exports = router;