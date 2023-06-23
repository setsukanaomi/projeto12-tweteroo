import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const tweets = [];
const users = [];

// Post de /sign-up
app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(200).send("Ok!");
});
//

// Post de /tweets
app.post("/tweets", (req, res) => {
  const { tweet, username } = req.body;

  const existingUser = users.find((user) => user.username === username);

  if (!existingUser) {
    res.status(401).send("Usuário não cadastrado!");
    return;
  }

  const tuite = {
    username: username,
    tweet: tweet,
  };

  tweets.push(tuite);
  res.status(200).send("Ok!");
});
//

// Get de /tweets
app.get("/tweets", (req, res) => {
  let recentTweets = [];

  if (tweets.length > 10) {
    recentTweets = tweets.slice(tweets.length - 10);
  } else {
    recentTweets = tweets.slice();
  }

  recentTweets = recentTweets.map((tweet) => {
    const user = users.find((user) => user.username === tweet.username);
    if (user) {
      return {
        ...tweet,
        avatar: user.avatar,
      };
    }
    return tweet;
  });

  res.send(recentTweets);
});
//

app.listen(port, () => console.log(chalk.green(`API rodando na porta ${port}.`)));
