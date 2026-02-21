const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/chat", (req, res) => {
  const { text } = req.body;

  // comando ollama
  exec(`ollama generate deepsekker-7b "${text}"`, (err, stdout) => {
    if (err) {
      return res.status(500).send({ error: "Erro no modelo" });
    }
    res.send({ reply: stdout.trim() });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));