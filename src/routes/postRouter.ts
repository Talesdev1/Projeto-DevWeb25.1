import * as express from "express";
import { authentification, authorization } from "../middlewares/auth.js";
import { AuthController } from "../controllers/authController.js";
import { PostController } from "../controllers/postController.js";

const Router = express.Router();

Router.get("/post/:id", PostController.getPost);
Router.post(
  "/posts",
  authentification,
  authorization(["user", "admin"]),
  PostController.createPost
);
Router.delete(
  "/posts/delete/:id",
  authentification,
  authorization(["user", "admin"]),
  PostController.deletePost
);
export { Router as userRouter };
