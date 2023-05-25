const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userInput = req.body.userInput;
  console.log("userInput: " + userInput);
  try {
    // 调用 ChatGPT API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    //   prompt: userInput,
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": userInput}],
    //   max_tokens: 50,
    //   n: 1,
    //   stop: null,
    //   temperature: 0.5,
    }, {
      headers: {
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});