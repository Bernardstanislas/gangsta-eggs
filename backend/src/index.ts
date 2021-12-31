/* eslint-disable import/first */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { eggMetadataRouter } from "./routes/egg-metadata";
import { ownerEggsRouter } from "./routes/owner-eggs";

const app = express();

app.use(cors());
app.use(eggMetadataRouter);
app.use(ownerEggsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
