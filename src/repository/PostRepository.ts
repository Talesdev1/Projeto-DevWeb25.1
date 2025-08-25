import { Post } from "../models/Post.js";

export class PostRepository {
  async createPost(data: any) {
    return await Post.create(data);
  }

  async getAllPosts() {
    return await Post.findAll();
  }

  async getPostById(id: number) {
    return await Post.findOne({ where: { id: id } });
  }

  async updatePost(post: Post, data: any) {
    post.set(data);
    await post.save();
    return post;
  }

  async deletePost(post: Post) {
    await post.destroy();
  }
}
