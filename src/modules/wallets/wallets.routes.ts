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

walletsRouter.get("/",requireAuth, listWalletsHandler);
walletsRouter.get("/:id",requireAuth, getWalletHandler);
walletsRouter.post("/",requireAuth, validate(walletCreateSchema), createWalletHandler);
walletsRouter.put("/:id",requireAuth, validate(walletUpdateSchema), updateWalletHandler);
walletsRouter.delete("/:id",requireAuth, deleteWalletHandler);
