const express = require('express');
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');
let user = {};

// PASSPORT FUNCTIONS -----------------------------------------

passport.serializeUser( (user, cb) => {
  cb(null, user);
})

passport.deserializeUser( (user, cb) => {
  cb(null, user);
})

passport.use(new GoogleStrategy({
  clientID: keys.CLIENT_ID,
  clientSecret: keys.CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
      user = { ...profile };
      return cb(null, profile);
}))

// EXPRESS SERVER FUNCTIONS ------------------------------------

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.get('/pages/*', async (req, res) => {
  await res.sendFile(`${process.cwd()}/public/index.html`, (err) => {
      if (err) {
          res.status(500).send(err)
      }
  })
});

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/pages/profile");
});

// endpoint to send back user data
app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.send(user);
});


// PORT CONNECTION STUFF ---------------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("The server failed to start ", err);
  } else {
    console.log('Server is listening on port ', PORT);
  }
})