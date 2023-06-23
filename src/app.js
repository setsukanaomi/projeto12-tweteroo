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
  users.push(user);
  res.sendStatus(200);
});

app.post("/tweets", (req, res) => {
  const { tweet, username } = req.body;

  const existingUser = users.find((user) => user.username === username);

  if (!existingUser) {
    res.sendStatus(401);
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
  let recentTweets = [];

  if (tweets.length > 10) {
    recentTweets = tweets.slice(tweets.length - 10);
  } else {
    recentTweets = tweets.slice();
  }

  res.send(recentTweets);
});

app.listen(port, () => console.log(chalk.green(`API rodando na porta ${port}.`)));
