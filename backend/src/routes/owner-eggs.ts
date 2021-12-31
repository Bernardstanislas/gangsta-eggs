import express, { Request, Response } from "express";
import { eggToken } from "../contracts/egg-token";

export const ownerEggsRouter = express.Router();

ownerEggsRouter.get(
  "/owners/:address/eggs",
  async (req: Request, res: Response) => {
    const { address } = req.params;

    try {
      const events = await eggToken.queryFilter(
        eggToken.filters.Transfer(null, address, null)
      );
      const eggs = events.map((event) => parseInt(event.topics[3]));

      res.json(eggs);
    } catch (error) {
      res.json([]);
    }
  }
);
