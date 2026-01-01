import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.schema.js";
import Blog from "../../models/blog.schema.js";
import { hashPassword } from "../../utils/hashpassword.utils.js";

const apiBaseUrl = "/api/v1/admin/blogs";
const authUrl = "/api/v1/auth";

describe("Admin Blog Routes", () => {
  let adminCookie: string;
  let adminUserId: any;

  beforeAll(async () => {
    // Create admin user
    const hashedPassword = await hashPassword("password123");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
    adminUserId = admin._id;

    // Login to get cookie
    const res = await request(app).post(`${authUrl}/login`).send({
      email: "admin@example.com",
      password: "password123",
    });
    const cookies = res.headers["set-cookie"];
    adminCookie = cookies.find((c: string) => c.startsWith("access-token"));
  });

  describe("POST /", () => {
    it("should create a new blog post", async () => {
      const res = await request(app)
        .post(`${apiBaseUrl}`)
        .set("Cookie", adminCookie)
        .send({
          title: "New Blog Post",
          content: "Content of the new blog post.",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Blog is created successfully 🎉");

      const blog = await Blog.findOne({ title: "New Blog Post" });
      expect(blog).toBeTruthy();
      expect(blog?.status).toBe("draft"); // Default should be draft usually, checking controller might reveal
    });
  });

  describe("PUT /:blogId", () => {
    let blogId: any;
    beforeEach(async () => {
      const blog = await Blog.create({
        title: "Blog to Update",
        slug: "blog-to-update",
        content: "Original content",
        author: adminUserId,
        status: "draft",
      });
      blogId = blog._id;
      const admin = await User.findById(adminUserId);
      admin?.blogs.push(blog._id as any);
      await admin?.save();
    });

    it("should update an existing blog post", async () => {
      const res = await request(app)
        .put(`${apiBaseUrl}/${blogId}`)
        .set("Cookie", adminCookie)
        .send({
          title: "Updated Title",
          content: "Updated content",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const updatedBlog = await Blog.findById(blogId);
      expect(updatedBlog?.title).toBe("Updated Title");
      expect(updatedBlog?.content).toBe("Updated content");
    });
  });

  describe("PATCH /publish/:blogId", () => {
    let blogId: any;
    beforeEach(async () => {
      const blog = await Blog.create({
        title: "Blog to Publish",
        slug: "blog-to-publish",
        content: "Content",
        author: adminUserId,
        status: "draft",
      });
      blogId = blog._id;
      const admin = await User.findById(adminUserId);
      admin?.blogs.push(blog._id as any);
      await admin?.save();
    });

    it("should publish a draft blog", async () => {
      const res = await request(app)
        .patch(`${apiBaseUrl}/publish/${blogId}`)
        .set("Cookie", adminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Blog published successfully");

      const blog = await Blog.findById(blogId);
      expect(blog?.status).toBe("published");
    });
  });

  describe("DELETE /:blogId", () => {
    let blogId: any;
    beforeEach(async () => {
      const blog = await Blog.create({
        title: "Blog to Delete",
        slug: "blog-to-delete",
        content: "Content",
        author: adminUserId,
        status: "draft",
      });
      blogId = blog._id;
      const admin = await User.findById(adminUserId);
      admin?.blogs.push(blog._id as any);
      await admin?.save();
    });

    it("should delete the blog post", async () => {
      const res = await request(app)
        .delete(`${apiBaseUrl}/${blogId}`)
        .set("Cookie", adminCookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const blog = await Blog.findById(blogId);
      expect(blog).toBeNull();
    });
  });
});
