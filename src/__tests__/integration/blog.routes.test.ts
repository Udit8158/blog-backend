import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.schema.js";
import Blog from "../../models/blog.schema.js";
import mongoose from "mongoose";

const apiBaseUrl = "/api/v1/blogs";

describe("Blog Routes", () => {
  let adminUserId: any;
  let blogId: any;

  beforeEach(async () => {
    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });
    adminUserId = admin._id;

    // Create a published blog
    const blog = await Blog.create({
      title: "Test Blog",
      slug: "test-blog",
      content: "This is a test blog content.",
      author: admin._id,
      status: "published",
      publishedAt: new Date(),
    });
    blogId = blog._id;

    // Update admin with blog
    admin.blogs.push(blog._id as any);
    await admin.save();
  });

  describe("GET /blogs", () => {
    it("should return a list of published blogs from admin", async () => {
      const res = await request(app).get(`${apiBaseUrl}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].title).toBe("Test Blog");
    });

    it("should not return draft blogs", async () => {
      // Create a draft blog
      const draftBlog = await Blog.create({
        title: "Draft Blog",
        slug: "draft-blog",
        content: "Draft content",
        author: adminUserId,
        status: "draft",
      });
      const admin = await User.findById(adminUserId);
      admin?.blogs.push(draftBlog._id as any);
      await admin?.save();

      const res = await request(app).get(`${apiBaseUrl}`);

      expect(res.status).toBe(200);
      const blogs = res.body.data;
      const found = blogs.find((b: any) => b.title === "Draft Blog");
      expect(found).toBeUndefined();
    });
  });

  describe("GET /blogs/:blogId", () => {
    it("should return blog details for valid ID", async () => {
      const res = await request(app).get(`${apiBaseUrl}/${blogId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Test Blog");
    });

    it("should return 404 for non-existent blog ID", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`${apiBaseUrl}/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should return 404 if blog is not published", async () => {
      /*
       Note: The controller code checks:
         const foundBlog = await Blog.findOne({ _id: blogId, status: "published" }).populate("author");
       So it returns 404 if not found OR not published (since query filters by status).
       It sends "No blog found" message.
       */
      const draftBlog = await Blog.create({
        title: "Draft Blog 2",
        slug: "draft-blog-2",
        content: "Draft content",
        author: adminUserId,
        status: "draft",
      });

      const res = await request(app).get(`${apiBaseUrl}/${draftBlog._id}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No blog found");
    });
  });
});
