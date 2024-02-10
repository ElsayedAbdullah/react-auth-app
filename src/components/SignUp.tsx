import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { FirebaseError } from "firebase/app";

interface Error extends FirebaseError {
  message: string;
  code: string;
}

const SignUp = () => {
  // States
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // Handlers
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to check if the email or password are empty or not
    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    // to check if the password and confirm password are identical or not
    if (passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setError("Passwords don't match");
        return;
      }
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current!.value, passwordRef.current!.value);

      navigate("/");
    } catch (err) {
      if ((err as Error)["code"] === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Can't create an account");
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5 fs-3">Sign up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
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
                <span>SignUp</span>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 text-muted">
        Already have an account <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default SignUp;
