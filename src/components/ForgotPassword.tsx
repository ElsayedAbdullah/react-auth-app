import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const ForgotPassword = () => {
  // States
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Refs
  const emailRef = useRef<HTMLInputElement>(null);

  // Handlers
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to check if the email or password are empty or not
    if (!emailRef.current?.value) return;

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current!.value);
      setMessage("check your inbox");
    } catch (err) {
      setError("Can't reset your password");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5 fs-3">Sign up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                defaultValue={currentUser?.email ?? ""}
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
                <span>reset password</span>
              )}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to={"/login"}>login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 text-muted">
        Need an account <Link to={"/signup"}>signup</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
