````
social-media-api/
├── config/
│   └── db.js           # PostgreSQL connection
├── routes/
│   ├── auth.js         # User registration/login
│   ├── tweets.js       # Tweet CRUD, hashtag extraction
│   ├── users.js        # Follow/unfollow, profile
│   └── feed.js         # User feed logic
├── controllers/
│   ├── authController.js
│   ├── tweetController.js
│   ├── userController.js
│   └── feedController.js
├── models/
│   ├── User.js         # User schema/queries
│   ├── Tweet.js        # Tweet schema/queries
│   ├── Hashtag.js      # Hashtag schema/queries
│   └── Follow.js       # Follow schema/queries
├── middleware/
│    ├── auth.js         # Authentication
│    └── errorHandler.js # Global error handling
└── app.js
````
