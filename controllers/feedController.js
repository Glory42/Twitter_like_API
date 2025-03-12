const pool = require('../config/db');

const getFeed = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(
            `SELECT tweets.id, tweets.content, tweets.created_at, users.username 
                FROM tweets 
                JOIN users ON tweets.user_id = users.id 
                WHERE tweets.user_id IN (
                    SELECT followed_id FROM follows WHERE follower_id = $1
                )
                ORDER BY tweets.created_at DESC
                LIMIT $2 OFFSET $3`,
                [userId, limit, offset]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feed" });
    }
};

module.exports = {
    getFeed
};