import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.schema.js";

const apiBaseUrl = "/api/v1/auth"; // Assuming apiBaseUrl from env is /api/v1, checking app.ts usage

describe("Auth Routes", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post(`${apiBaseUrl}/register`).send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User created successfully");

      const user = await User.findOne({ email: "test@example.com" });
      expect(user).toBeTruthy();
      expect(user?.name).toBe("Test User");
    });

    it("should fail if email already exists", async () => {
      await User.create({
        name: "Existing User",
        email: "existing@example.com",
        password: "password123",
      });

      const res = await request(app).post(`${apiBaseUrl}/register`).send({
        name: "Test User 2",
        email: "existing@example.com",
        password: "password123",
      });

      expect(res.status).toBe(409); // Controller returns 409
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /login", () => {
    beforeEach(async () => {
      // Create user including password hashing which happens in model presave usually
      // However here we might need to rely on the endpoint or model logic.
      // Let's create via endpoint to ensure hash is correct or use model directly if we know it hashes.
      // Assuming model hashes on save or register endpoint was used.
      // Let's use register endpoint to be safe or create with a known password if we are sure.
      // Better to create via model but we need to know if pre-save hook exists.
      // Let's assume standard behavior.
      await request(app).post(`${apiBaseUrl}/register`).send({
        name: "Login User",
        email: "login@example.com",
        password: "password123",
      });
    });

    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post(`${apiBaseUrl}/login`).send({
        email: "login@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should fail with incorrect password", async () => {
      const res = await request(app).post(`${apiBaseUrl}/login`).send({
        email: "login@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401); // Controller returns 401
      expect(res.body.success).toBe(false);
    });

    it("should fail with non-existent email", async () => {
      const res = await request(app).post(`${apiBaseUrl}/login`).send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(res.status).toBe(404); // Controller returns 404
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /logout", () => {
    it("should logout successfully", async () => {
      const res = await request(app).post(`${apiBaseUrl}/logout`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // Check if cookie is cleared (often by setting it to empty with past expiry)
      // Implementation dependent, but usually set-cookie is present
    });
  });
});
