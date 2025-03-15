# 📱 Social Media API

## 📌 Description  
🚀 *Social Media API* is a backend system for a simplified Twitter-like platform. It allows users to 📝 post tweets with hashtags, 🔄 follow/unfollow users, and 📜 view a personalized feed. Built with **Express.js** and **PostgreSQL**, it utilizes **advanced SQL queries** for hashtag detection and feed generation.

## 🎯 Objective  
Build a scalable and efficient backend for a social media platform with essential features like user interactions, feeds, and hashtags.

## 🚀 Key Features  
- 📝 **Post tweets** with hashtags.
- 🔄 **Follow/unfollow** users.
- 📜 **Feed** showing tweets from followed users.
- 🔍 **Hashtag detection** using LIKE queries.
- 🗄 **Optimized SQL queries** for better performance.

## 🏗 Steps to Build  
1️⃣ **Database Setup**: Create tables for `users`, `tweets`, `hashtags`, and `follows`.  
2️⃣ **Followers System**: Add a `followers` join table (`follower_id`, `followed_id`).  
3️⃣ **Hashtag Detection**: Implement `LIKE` queries to detect hashtags (e.g., `#express`).  
4️⃣ **Feed Generation**: Use complex SQL queries to fetch tweets from followed users.  
5️⃣ **Real-Time Updates** (Optional): Implement WebSockets for live tweet updates.  

## 🛠 Technologies Used  
- **Backend Framework**: Express.js  
- **Database**: PostgreSQL  
- **Authentication**: JWT  
- **WebSockets** (Optional for real-time updates)  

## 📂 Project Structure  
```sh
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
```

## 📌 API Endpoints  
| ⚡ Method | 🔗 Endpoint       | 📝 Description |
|--------|--------------|-------------|
| POST   | /auth/register | 🆕 User registration |
| POST   | /auth/login | 🔑 User login |
| POST   | /tweets | 📝 Create a tweet |
| GET    | /tweets/:id | 🔍 View a tweet |
| GET    | /feed | 📜 Get user feed |
| POST   | /users/:id/follow | 🔄 Follow a user |
| POST   | /users/:id/unfollow | ❌ Unfollow a user |

## 📚 Concepts Learned  
- 📊 **Advanced SQL queries** for efficient data retrieval.  
- 📜 **Feed algorithms** to generate personalized timelines.  
- 🔄 **Real-time updates** (with WebSockets, optional).  

## 🤝 Contributing  
Contributions are welcome! Open an issue or submit a pull request.  

## 📜 License  
This project is licensed under the MIT **[License](LICENSE)**.