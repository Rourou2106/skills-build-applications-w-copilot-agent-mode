"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const codespaces_1 = require("../utils/codespaces");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const leaderboard = await leaderboard_1.default.find({}).lean();
        res.json({
            message: 'Leaderboard endpoint',
            apiBaseUrl: (0, codespaces_1.getApiBaseUrl)(req),
            leaderboard
        });
    }
    catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Unable to fetch leaderboard' });
    }
});
exports.default = router;
