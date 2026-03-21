const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  console.log('✅ Registering Google Strategy');
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile received:', profile.displayName);
    
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });
      
      if (!user) {
        console.log('Creating new user for:', email);
        user = await User.create({
          name: profile.displayName,
          email: email,
          password: Math.random().toString(36).slice(-16),
          avatar: profile.photos?.[0]?.value,
          provider: 'google',
          providerId: profile.id
        });
        console.log('User created:', user._id);
      } else {
        console.log('Existing user found:', user._id);
      }
      
      const token = generateToken(user);
      user.token = token;
      
      done(null, user);
    } catch (err) {
      console.error('Google strategy error:', err);
      done(err, null);
    }
  }));
} else {
  console.log('❌ Google credentials missing. Cannot register Google Strategy');
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing');
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing');
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  console.log('✅ Registering GitHub Strategy');
  
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/github/callback',
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('GitHub profile received:', profile.displayName || profile.username);
    
    try {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
      let user = await User.findOne({ email });
      
      if (!user) {
        console.log('Creating new user for:', email);
        user = await User.create({
          name: profile.displayName || profile.username,
          email: email,
          password: Math.random().toString(36).slice(-16),
          avatar: profile.photos?.[0]?.value,
          provider: 'github',
          providerId: profile.id
        });
        console.log('User created:', user._id);
      } else {
        console.log('Existing user found:', user._id);
      }
      
      const token = generateToken(user);
      user.token = token;
      
      done(null, user);
    } catch (err) {
      console.error('GitHub strategy error:', err);
      done(err, null);
    }
  }));
} else {
  console.log('❌ GitHub credentials missing. Cannot register GitHub Strategy');
}

module.exports = passport;
