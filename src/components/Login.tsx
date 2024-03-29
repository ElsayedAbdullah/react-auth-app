import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { FirebaseError } from "firebase/app";

interface Error extends FirebaseError {
  message: string;
  code: string;
}

const Login = () => {
  // States
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  // Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Handlers
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to check if the email or password are empty or not
    if (!emailRef.current?.value || !passwordRef.current?.value) return;

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current!.value, passwordRef.current!.value);

      navigate(location.state?.path || "/", { replace: true });
    } catch (err) {
      console.log(err);

      if ((err as Error)["code"] === "auth/invalid-credential") {
        setError("Invalid Credential");
      } else {
        setError("Can't login into your account");
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5 fs-3">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                ref={passwordRef}
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
                <span>Login</span>
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to={"/forgot-password"}>Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mt-3 text-muted">
        Need an account <Link to={"/signup"}>Signup</Link>
      </div>
    </>
  );
};

export default Login;
