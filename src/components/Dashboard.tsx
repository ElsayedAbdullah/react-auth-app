import { useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

const Dashboard = () => {
  // States
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handlers
  const handleLogout = async () => {
    try {
      setError("");
      setLoading(true);
      await logout();

      navigate("/login");
    } catch (err) {
      setError("Failed to logout");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5 fs-3">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p className="text-center">
            <strong>Email: </strong> {currentUser && currentUser.email}
          </p>
          <div className="text-center mt-3">
            <Link className="btn btn-outline-success" to="/update-profile">
              Update Profile
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 text-muted">
        <Button
          className="btn btn-danger"
          disabled={loading}
          onClick={handleLogout}
        >
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <span>Log out</span>
          )}
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
