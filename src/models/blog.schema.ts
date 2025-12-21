import { model, Schema, Model } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  status: "draft" | "published";
  author: Schema.Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date || null,
    required: true,
    default: null, // if not published yet
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
