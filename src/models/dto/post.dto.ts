export class PostResponce {
  id: number;
  ownerId: number;
  title: string;
  body: string;
  status: string;
  type: string;
  parentId: number;
  ownerUsername: string;
  deleted: boolean;
  createdAt: any;
  updatedAt: any;

  constructor(poster: any) {
    this.id = poster.id;
    this.deleted = poster.deleted;
    this.ownerUsername = poster.ownerUsername;
    this.parentId = poster.parentId;
    this.type = poster.type;
    this.status = poster.status;
    this.body = poster.body;
    this.title = poster.title;
    this.ownerId = poster.ownerId;
    this.createdAt = poster.createdAt;
    this.updatedAt = poster.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      deleted: this.deleted,
      owner_id: this.ownerId,
      owner_username: this.ownerUsername,
      parent_id: this.parentId,
      title: this.title,
      body: this.body,
      status: this.status,
      type: this.type,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
