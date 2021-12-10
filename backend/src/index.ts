import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { eggMetadataRouter } from "./routes/egg-metadata";
dotenv.config();

const app = express();

app.use(cors());
app.use(eggMetadataRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
