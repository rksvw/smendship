# 📘 REST API Reference (Express.js)

Base URL: `http://localhost:4000/api`

---

## 🔐 Authentication

### ➤ POST /auth/signup
Registers a new user.
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
