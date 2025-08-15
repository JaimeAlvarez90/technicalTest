import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { walletsRouter } from "../modules/wallets/wallets.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRouter);
router.use("/wallets", walletsRouter);

export default router;
