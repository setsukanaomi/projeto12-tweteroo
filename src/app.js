import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
const port = 5000;
app.use(cors());

app.get("/tweets", (req, res) => {
  const tweets = {
    username: "bobesponja",
    avatar:
      "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
    tweet: "Eu amo hambúrguer de siri!",
  };

  res.send(tweets);
});

app.listen(port, () => console.log(chalk.green(`API rodando na porta ${port}.`)));
