const pool  = require('../config/db');

const extractHashtags = (content) => {
    const hashtags = content.match(/#\w+/g) || [];
    return [...new Set(hashtags.map(tag => tag.slice(1).toLowerCase()))];
};

const createTweet = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
        return res.status(400).json({ error: 'Tweet content is required' });
    };

    try {
        await pool.query('BEGIN');

        const tweet = await pool.query(
            'INSERT INTO tweets(user_id, content) VALUES ($1, $2) RETURNING *',
            [userId, content]
        );

        const hashtags = extractHashtags(content);
        for (const tag of hashtags) {
            const hashtags = await pool.query(
                'INSERT INTO hashtags(tag) VALUES($1) ON CONFLICT(tag) DO NOTHING RETURNING *',
                [tag]
            );

            if (hashtags.rows[0]) {
                await pool.query(
                    'INSERT INTO tweet_hashtags(tweet_id, hashtag_id) VALUES ($1, $2)',
                    [tweet.rows[0].id, hashtags.rows[0].id]
                );
            }
        }
        await pool.query('COMMIT');
        res.status(201).json(tweet.rows[0]);
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to post tweet' });
    }
};

const getTweetAll = async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT tweets.*, users.username 
            FROM tweets 
            JOIN users ON tweets.user_id = users.id
            ORDER BY tweets.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
}

module.exports = {
    createTweet,
    getTweetAll
};