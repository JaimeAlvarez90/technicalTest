import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { signInSchema} from "../../schemas/auth.schema.js";
import { signInHandler,signOutHandler } from "./auth.controller.js";
import { requireAuth } from "../../middleware/auth.js";

export const authRouter = Router();
authRouter.post("/signin", validate(signInSchema), signInHandler);
authRouter.post("/signout", requireAuth, signOutHandler);