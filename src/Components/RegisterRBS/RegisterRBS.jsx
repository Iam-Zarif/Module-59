import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterRBS = () => {
  const handleRegister = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.password.value;
    console.log(name, email);
  }
  return (
    <div className="mx-auto w-50">
      <h1>helol rbs</h1>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3"  controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted"  > 
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterRBS;
