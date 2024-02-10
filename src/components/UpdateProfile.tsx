import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useAuth } from "../hooks";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  // States
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Handlers
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to check if the email or password are empty or not
    if (!emailRef.current?.value) return;

    // to check if the password and confirm password are identical or not
    if (passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setError("Passwords don't match");
        return;
      }
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value != currentUser?.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }

    if (passwordRef.current!.value) {
      promises.push(updateUserPassword(passwordRef.current!.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update the account");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5 fs-3">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                defaultValue={currentUser?.email || ""}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button
              className="w-100 submit-signup"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" as={"span"} role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <span>UpdateProfile</span>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3">
        <Link to={"/"}>Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
