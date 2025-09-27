import { Request, Response } from "express";
import { encrypt } from "../utils/encrypt.js";
import { PostResponce } from "../models/dto/post.dto.js";
import { PostRepository } from "../repository/PostRepository.js";

const postRepo = new PostRepository();

export class PostController {
  static async createPost(req: any, res: Response) {
    const userTryingToCreate = req.user;
    if (!userTryingToCreate) {
      throw new Error("User not authenticated or dont allowed");
    }
    let ownerId = userTryingToCreate.id;
    let ownerUsername = userTryingToCreate.username;
    const post = await postRepo.createPost({
      ...req.body,
      ownerId: ownerId,
      ownerUsername,
    });

    return res.status(201).json(new PostResponce(post.toJSON()).toJSON());
  }

  static async getPost(req: Request, res: Response) {
    const postId = req.params.id;
    const post = await postRepo.getPostById(Number(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(new PostResponce(post.toJSON()).toJSON());
  }

  static async getPosts(req: Request, res: Response) {
    const posts = (await postRepo.getAllPosts()).map(
      (post) => new PostResponce(post.toJSON())
    );
    return res.status(200).json(posts);
  }

  static async getUserPosts(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const posts = (await postRepo.getAllUserPosts(userId)).map(
      (post) => new PostResponce(post.toJSON())
    );
    return res.status(200).json(posts);
  }

  static async deletePost(req: Request, res: Response) {
    const postId = req.params.id;
    const post = await postRepo.getPostById(Number(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await postRepo.deletePost(post);
    res.status(200).end();
  }
}
