const Score = require('../models/score.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.addScore = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const score = new Score({ userId: decoded.userId, score: req.body.score, mode: req.body.mode });
        await score.save();

        res.status(201).json({ message: 'Score added successfully', score });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getScores = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const scores = await Score.find({ userId: decoded.userId })
            .populate('userId', 'username -_id') 
            .exec();

        const scoresWithUsername = scores.map(score => ({
            score: score.score,
            date: score.date.toLocaleDateString('fr-FR'), 
            mode: score.mode,
            username: score.userId.username 
        }));

        res.json(scoresWithUsername);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBestScores = async (req, res) => {
    try {
        const { mode } = req.body; 

        if (!mode) {
            return res.status(400).json({ error: "Mode is required" });
        }

        const scores = await Score.find({ mode }) 
            .sort({ score: -1 })
            .limit(10)
            .populate('userId', 'username -_id')
            .exec();

        const bestScoresWithUsername = scores.map(score => ({
            score: score.score,
            date: score.date.toLocaleDateString('fr-FR'),
            username: score.userId.username 
        }));

        res.json(bestScoresWithUsername);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
