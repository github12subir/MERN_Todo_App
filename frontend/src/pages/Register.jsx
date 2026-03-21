import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch(register(form));
      navigate("/"); // go to login
    } catch (err) {
      console.error("Register failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Row>
        <Col>
          <Card style={{ width: "400px" }} className="p-3 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>

              <Button
                variant="outline-secondary"
                size="sm"
                className="mb-3"
                onClick={() => navigate(-1)}
              >
                ⬅ Back
              </Button>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}