const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');

// Make fetch and Headers available globally
globalThis.fetch = fetch;
globalThis.Headers = Headers;
const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyBI1oQzs-5eztDdHMKNa0a4ns5J8n_-r78");

router.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ text });
    } catch (error) {
        console.error('Error in Gemini API:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;