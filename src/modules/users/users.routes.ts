import {Router} from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";  
import { userCreateSchema, userUpdateSchema } from "../../schemas/user.schema.js";
import {
  listUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from "./users.controller.js";

export const usersRouter = Router();

usersRouter.get("/", requireAuth, listUsersHandler);
usersRouter.get("/:id", requireAuth, getUserByIdHandler);
usersRouter.post("/", requireAuth, validate(userCreateSchema), createUserHandler);
usersRouter.put("/:id", requireAuth, validate(userUpdateSchema), updateUserHandler);
usersRouter.delete("/:id", requireAuth, deleteUserHandler);

