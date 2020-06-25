const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repository/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <div>
    <form method="POST">
        <input name="email" placeholder="email"/>
        <input name="password" placeholder="password"/>
        <input name="passwordConfirmation" placeholder="password confirmation"/>
        <button>Sign up</button>
    </form>
  </div>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send(`This email has alrealy been used`);
  }

  if (password !== passwordConfirmation) {
    return res.send("Password does not match");
  }

  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("Listening");
});
