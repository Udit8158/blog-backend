# Test Coverage Report

## Overview

This document outlines the current state of your test suite, identifying what is covered, what critical edge cases are missing, and recommendations for improvement.

## 1. Authentication (`auth.routes.test.ts`)

### ✅ Currently Covered

- **Registration**:
  - Success case (201).
  - Duplicate email handling (409).
- **Login**:
  - Success case with cookie set (200).
  - Incorrect password (401).
  - Non-existent email (404).
- **Logout**:
  - Success case (200).

### 🚨 Critical Missing Cases

- **Input Validation**: Check how the API behaves if `email`, `password`, or `name` are missing or empty strings.
- **Invalid Email Format**: Test registering/logging in with "invalid-email" (no @ symbol, etc).
- **Password Strength**: If you have policies (e.g., min length 6), test that short passwords are rejected.

### ⚠️ Optional / Good-to-Have

- **SQL/NoSQL Injection**: Attempt to send malicious payloads in login fields (though libraries usually handle this).
- **Rate Limiting**: If implemented, test that too many login attempts block the IP.

---

## 2. Public Blog Routes (`blog.routes.test.ts`)

### ✅ Currently Covered

- **List Blogs**:
  - Returns published blogs.
  - Does **not** return draft blogs.
- **Get Single Blog**:
  - Returns valid, published blog by ID.
  - Returns 404 for non-existent ID.
  - Returns 404 if trying to fetch a draft blog by ID.

### 🚨 Critical Missing Cases

- **Invalid ID Format**: What happens if you send `GET /api/v1/blogs/junk-id` (not a valid MongoDB ObjectId)? Expect 400 or 404, ensure server doesn't crash (500).

### ⚠️ Optional / Good-to-Have

- **Pagination**: If you have 50 blogs, does it return all? Test limit/offset query params.
- **Empty State**: Verify response structure when there are 0 published blogs.

---

## 3. Admin Blog Routes (`blog.admin.routes.test.ts`)

### ✅ Currently Covered

- **Create Blog**: Success case (Draft status default).
- **Update Blog**: Success case (Title/content update).
- **Publish Blog**: Success case (Status changes to published).
- **Delete Blog**: Success case.

### 🚨 Critical Missing Cases

- **Unauthorized Access**: Try hitting THESE endpoints **without** a login cookie. Expect 401. This is crucial to ensure your admin routes are actually protected.
- **Missing Payload**: Try creating/updating a blog with missing `title` or `content`.
- **Delete/Update Non-Existent**: Try operating on a valid but non-existent ID.

### ⚠️ Optional / Good-to-Have

- **Authorization**: If you add more roles (e.g. "Editor" vs "Admin"), test that an Editor cannot delete an Admin's post.
- **Double Publish**: What happens if you try to publish a blog that is _already_ published?

## Summary of Comparison

| Feature Area     | Current Status      | Priority Action Items                                      |
| :--------------- | :------------------ | :--------------------------------------------------------- |
| **Auth**         | Good basic coverage | Add input validation (empty/invalid fields).               |
| **Public Blogs** | Good logic checks   | Test invalid ID formats (crash prevention).                |
| **Admin Blogs**  | **Risky**           | **MUST ADD:** Tests for unauthenticated access (security). |

## Recommended Next Steps

1.  **Security First**: Add the "Unauthorized Access" tests to `blog.admin.routes.test.ts`.
2.  **Stability**: Add "Invalid ID Format" tests to `blog.routes.test.ts`.
3.  **Robustness**: Add Input Validation tests to `auth.routes.test.ts`.
