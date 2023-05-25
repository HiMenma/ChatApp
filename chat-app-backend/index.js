const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
const apiKey = 'your api token'; // 替换为你的 OpenAI API 密钥
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userInput = req.body.userInput;
  res.setHeader('Transfer-Encoding', 'chunked');
  const requestBody = {
    model: 'gpt-3.5-turbo', // 模型版本
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userInput }
    ]
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      responseType: 'stream' // 设置响应类型为流
    });

    if (response.status === 200) {
      res.type('text/plain'); // 设置响应类型为纯文本

      response.data.pipe(res); // 将响应流直接发送给客户端
    } else {
      console.error('Error:', response.status);
      res.status(500).json({ error: 'An error occurred' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
