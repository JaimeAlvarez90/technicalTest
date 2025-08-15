import {Router} from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { walletCreateSchema,walletUpdateSchema } from "../../schemas/wallet.schema.js";
import{
  listWalletsHandler,
  getWalletHandler,
  createWalletHandler,
  updateWalletHandler,
  deleteWalletHandler
} from "./wallets.controller.js";
export const walletsRouter = Router();

walletsRouter.use(requireAuth);
walletsRouter.get("/", listWalletsHandler);
walletsRouter.get("/:id", getWalletHandler);
walletsRouter.post("/", validate(walletCreateSchema), createWalletHandler);
walletsRouter.put("/:id", validate(walletUpdateSchema), updateWalletHandler);
walletsRouter.delete("/:id", deleteWalletHandler);
