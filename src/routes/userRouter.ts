import * as express from "express";
import { authentification, authorization } from "../middlewares/auth.js";
import { AuthController } from "../controllers/authController.js";
import { UserController } from "../controllers/userController.js";
const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers
);
Router.get(
  "/profile",
  authentification,
  authorization(["user", "admin"]),
  AuthController.getProfile
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.put(
  "/users/update/:id",
  authentification,
  authorization(["user", "admin"]),
  UserController.updateUser
);
Router.delete(
  "/users/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser
);
export { Router as userRouter };
