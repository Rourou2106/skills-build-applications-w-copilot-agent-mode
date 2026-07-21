"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const codespaces_1 = require("../utils/codespaces");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const teams = await team_1.default.find({}).lean();
        res.json({
            message: 'Teams endpoint',
            apiBaseUrl: (0, codespaces_1.getApiBaseUrl)(req),
            teams
        });
    }
    catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Unable to fetch teams' });
    }
});
exports.default = router;
