const express = require("express");
const app = express();
const port = 80;
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const users = [{ address: "0x05599638C249d6e0f7b46d0f3091056f1e26Dfe1", nonce: "0", msg: "nftprove", signature: "", code: "hellocode" }];
const apiKey = "xwR98PPh7Dq1rVnEwPUbn2zyEyVvMJQG";
const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`;
// const provider = new ethers.providers.JsonRpcProvider(url);
// const ownerAddr = "0x05599638C249d6e0f7b46d0f3091056f1e26Dfe1";

// /address?code=abcdefghij
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/address", (req, res) => {
  const code = req.query.code;
  const user = users.find((u) => u.code === code);
  if (!user) {
    return res.status(400).end("cannot find user");
  }
  const config = {
    method: "get",
    url: `${baseURL}?owner=${user.address}`,
  };
  axios(config)
    .then((response) => {
      // res.send(`${user.address}`);
      // console.log(JSON.stringify(response.data, null, 2));
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).end({});
    });
});

app.get("/users", (req, res) => {
  res.json({ users: users });
});
app.post("/user", (req, res) => {
  // body: {address: '0xabcde', signature: '0xabcde', msg: 'dino-nft-service'}
  // verify signature with msg, address
  // generate random code
  // upsert user
  // return code
  console.log(req.body);
  const address = req.body.address;
  const user = users.find((u) => u.address === address);
  const code = `${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}${parseInt(Math.random() * 10)}`;
  if (user) {
    user.code = code;
  } else {
    const newUser = { address: address, nonce: "0", msg: "nftprove", signature: "", code: code };
    users.push(newUser);
  }

  res.json({ code: code });
});

// post code

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
