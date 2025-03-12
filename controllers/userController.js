const pool = require('../config/db');

const follow = async (req, res) => {
    const followerId = req.user.id;
    const followedId = req.params.id;

    if (followerId === followedId) {
        return res.status(400).json({ error: "You can't follow yourself" });
    };

    try {
        const userExists = await pool.query(
            'SELECT id FROM users WHERE id = $1',
            [followedId]
        );

        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        };

        await pool.query(
            'INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)',
            [followerId, followedId]
        );
        res.status(201).json({ message: "Followed successfully" });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: "Already following this user!" });
        }
        res.status(500).json({ error: "Failed to follow user" });
    }
};

const unfollow = async (req, res) => {
    const follower_id = req.user.id;
    const followed_id = req.params.id;

    try {
        const { rowCount } = await pool.query(
            'DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2',
            [follower_id, followed_id]
        );

        if (rowCount === 0) {
            return res.status(500).json({ error: "Not following this user" });
        }
        res.status(201).json({ message: "Unfollowed Succesfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to unfollow user" });
    }
};

module.exports = {
    follow,
    unfollow
};