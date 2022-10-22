const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const router = express.Router();
const DiscordOauth2 = require("discord-oauth2");
const  axios  = require('axios');

const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', async (req, res) => {
   const CLIENT_ID = process.env.CLIENT_ID;
   console.log(CLIENT_ID)
   res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20email%20guilds&response_type=code&redirect_uri=${redirect}`);

 });
router.get('/callback', catchAsync(async (req, res) => {


try{

    const code = req.query.code
    console.log("code",code)
    // const params = new URLSearchParams({
    //     client_id: process.env.CLIENT_ID,
    //     client_secret: process.env.CLIENT_SECRET,
    //     code: code,
    //     grant_type: 'authorization_code',
    //     redirect_uri: redirect
    // });
    const params = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect}`
  try{
    const tokenResponse = await axios.post(`https://discordapp.com/api/oauth2/token`, params,
       { headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
    console.log("token", tokenResponse.data)
    console.log(code)
    
    
    // You might want to store this in an environment variable or something
const token = tokenResponse.data.access_token
  console.log(fetchUser(token))

  }catch(e){
  //  console.log(e)
       console.log("THE ERROR",e.message)
  }
  res.redirect("http://localhost:50451")


   

}catch(e){
       console.log(e)
       console.log("HERE IS THE ERROR MESSAGE",e.message)
}

  }));

  const fetchUser = async (token) => {
    const user = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(user.data)
    const id = user.data.id
    const response = await fetch(`https://discord.com/api/users/${id}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    })
    console.log(response)
    
   
    // if (!response.ok) throw new Error(`Error status code: ${response.status}`)
    // return JSON.parse(await response.json())
  }

module.exports = router;