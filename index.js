const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = [{ address: "0xabcd", nonce: "0", msg: "nftprove", signature: "", code: "hellocode" }];


// /address?code=abcdefghij
app.get("/address", (req, res) => {
  const code = req.query.code;
  const user = users.find((u) => u.code === code);
  if (!user) {
    return res.status(400).end('cannot find user');
    
  }
  res.send(`${user.address}`);
});

app.post("/user", (req, res) => {
  // body: {address: '0xabcde', signature: '0xabcde', msg: 'dino-nft-service'}
  // verify signature with msg, address
  // generate random code
  // upsert user
  // return code
  const code = req.body.code;
  const user = users.find((u) => u.code === code);
  if (!user) {
    return res.status(400).end('cannot find user');
    
  }
  res.send(`${user.address}`);
});

// post code

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
