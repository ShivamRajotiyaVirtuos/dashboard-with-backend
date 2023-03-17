const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require('body-parser');
const pool = require("./database");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/registerform", async (req, res) => {
  const email = req.body["email"];
  const name = req.body["name"];
  const password = req.body["password"];
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertINFO = `INSERT INTO users (name,email, password) VALUES ( '${name}', '${email}','${hashedPassword}')`;

  pool
    .query(insertINFO)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.body);
  // res.send("Hello User!" + req.body);
});

app.post('/loginform', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(result);
    if (result.rows.length === 0) {
      return res.status(401).send('Invalid email or password');
    }
    
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});






app.listen(4000, () => {
  console.log("listening on port 3000!");
});
