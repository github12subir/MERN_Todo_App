import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  // ✅ Redux state
  const { token, loading, error } = useSelector((state) => state.auth);

  // 🔁 Redirect after login
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ minWidth: "350px" }}>
            <Card.Body>

              <h3 className="text-center mb-3">Login</h3>

              {/* ❌ Error */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

              </Form>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </p>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}