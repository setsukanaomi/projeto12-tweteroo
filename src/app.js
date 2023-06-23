import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const tweets = [];
const users = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet, username } = req.body;

  const existingUser = users.find((user) => user.username === username);

  if (!existingUser) {
    res.send("UNAUTHORIZED");
    return;
  }

  const tuite = {
    username: username,
    tweet: tweet,
  };

  tweets.push(tuite);
  res.send(tuite);
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(port, () => console.log(chalk.green(`API rodando na porta ${port}.`)));
