import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = `...`; // Use the full prompt above here

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
    });

    const reply = response.data.choices[0].message?.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error from OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
