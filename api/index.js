// api/index.js
const express = require('express');
const fetch = require('node-fetch'); // Using node-fetch version 2.x

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://hir-puce.vercel.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the app for Vercel to use as a serverless function
module.exports = app;
