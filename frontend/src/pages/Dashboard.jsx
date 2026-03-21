import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  removeTask,
  addTask,
  updateTask,
} from "../features/task/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks = [] } = useSelector((state) => state.tasks);
  const { token, user } = useSelector((state) => state.auth);

  // =========================
  // CREATE TASK STATES
  // =========================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  // =========================
  // EDIT TASK STATES
  // =========================
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState({
    _id: "",
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // =========================
  // ADD TASK (3 FIELDS)
  // =========================
  const handleAdd = async () => {
    if (!title.trim()) return;

    await dispatch(
      addTask({
        title,
        description,
        status,
      })
    );

    setTitle("");
    setDescription("");
    setStatus("pending");

    dispatch(fetchTasks());
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleEditClick = (task) => {
    setEditTask(task);
    setShowEdit(true);
  };

  // =========================
  // UPDATE TASK
  // =========================
  const handleUpdate = async () => {
    await dispatch(
      updateTask({
        id: editTask._id,
        data: {
          title: editTask.title,
          description: editTask.description,
          status: editTask.status,
        },
      })
    );

    setShowEdit(false);
    dispatch(fetchTasks());
  };

  // =========================
  // DELETE TASK
  // =========================
  const handleDelete = async (id) => {
    await dispatch(removeTask(id));
    dispatch(fetchTasks());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container className="mt-4">

      {/* HEADER */}
      <Row className="mb-3 align-items-center">
        <Col><h3> Welcome {user?.name?.split(" ")[0] || "User"} 👋</h3></Col>
        <Col className="text-end">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* =========================
          CREATE TASK (3 FIELDS)
      ========================= */}
      <Row className="mb-4">

        {/* TITLE */}
        <Col md={4}>
          <Form.Control
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>

        {/* DESCRIPTION */}
        <Col md={4}>
          <Form.Control
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>

        {/* STATUS */}
        <Col md={2}>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>

        {/* BUTTON */}
        <Col md={2}>
          <Button variant="primary" onClick={handleAdd} className="w-100">
            Create +
          </Button>
        </Col>

      </Row>

      {/* TASK LIST */}
      <Row>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((t) => (
            <Col md={4} key={t._id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>

                  <div className="d-flex justify-content-between">
                    <Card.Title>{t.title}</Card.Title>

                    <Badge bg="warning" text="dark">
                      {t.status || "pending"}
                    </Badge>
                  </div>

                  <Card.Text>
                    {t.description || "No description"}
                  </Card.Text>

                  {/* BUTTONS */}
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(t)}
                    >
                      <FaEdit /> Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(t._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* =========================
          EDIT MODAL
      ========================= */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
          </Form.Group>

          {/* STATUS */}
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={editTask.status}
              onChange={(e) =>
                setEditTask({ ...editTask, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleUpdate}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}