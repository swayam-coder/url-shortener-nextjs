import {  } from "next/router"
import { ChangeEvent, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { AuthInfo } from "../../interfaces-and-types"

export default function Handler() {
    const [userInfo, setUserInfo] = useState<AuthInfo>({ email: "", password: "" })

    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit() {
      await fetch('/api/login', { method: "POST", body: JSON.stringify(userInfo) })
      // router.replace('/');  // client side redirect...but we are using server side redirect using _middleware
    }
    
    return (
      <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange}/>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
        </Form>
      </>
    )
}

