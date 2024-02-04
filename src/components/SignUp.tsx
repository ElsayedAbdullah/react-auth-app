import { Button, Card, Form } from "react-bootstrap";

const SignUp = () => {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;
