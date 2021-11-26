import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {eggMetadataRouter} from './routes/egg-metadata';

const app = express();

app.use(eggMetadataRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on http://localhost:${process.env.PORT || 3000}`);
});
