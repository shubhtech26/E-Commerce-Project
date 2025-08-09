import express from 'express';

const router = express.Router();

function getOllamaHost() {
  return process.env.OLLAMA_HOST?.replace(/\/$/, '') || 'http://localhost:11434';
}

// List locally available Ollama models
router.get('/models', async (_req, res) => {
  try {
    const host = getOllamaHost();
    const resp = await fetch(`${host}/api/tags`);
    const data = await resp.json();
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch models from Ollama' });
  }
});

// Chat endpoint using Ollama
router.post('/chat', async (req, res) => {
  try {
    const { messages, question, model, stream = false, options = {} } = req.body || {};
    const msgs = Array.isArray(messages) && messages.length
      ? messages
      : [{ role: 'user', content: String(question || 'Hello') }];

    const host = getOllamaHost();
    const mdl = model || process.env.OLLAMA_MODEL || 'llama3.1:8b';

    const body = {
      model: mdl,
      messages: msgs,
      stream: Boolean(stream),
      options,
    };

    const resp = await fetch(`${host}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!stream) {
      const data = await resp.json();
      return res.json(data);
    }

    // Stream back as text
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of resp.body) {
      res.write(chunk);
    }
    res.end();
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Ollama chat failed' });
  }
});

export default router;


