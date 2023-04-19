import express, { Application, Request, Response } from "express";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const morgan = require("morgan");

import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
import contactroute from "./routes/contactroute";
import cors from "cors";

const app: Application = express();

const port: number = 3005;
const bodyParser = require("body-parser");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/ContactsAnu",

          "f586d61f-8d63-4168-9bca-6f5f5eddf545",

          "YCK1iUgDuCXKOGIP5U6z8KzTczzyXxqYCwLTxqXCLIE="
        ),
    },
  });
};
SpfxConnection();
app.use("/get", contactroute);



app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});
