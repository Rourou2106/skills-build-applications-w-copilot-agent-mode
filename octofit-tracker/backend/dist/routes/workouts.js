"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const codespaces_1 = require("../utils/codespaces");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const workouts = await workout_1.default.find({}).lean();
        res.json({
            message: 'Workouts endpoint',
            apiBaseUrl: (0, codespaces_1.getApiBaseUrl)(req),
            workouts
        });
    }
    catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Unable to fetch workouts' });
    }
});
exports.default = router;
