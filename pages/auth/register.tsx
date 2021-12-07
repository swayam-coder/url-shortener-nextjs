import { useState, ChangeEvent } from "react"
import { Form, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import { AuthInfo } from "../../interfaces_and_types"
import { register } from "../../lib/crud-operations";
import { useMutation } from "react-query"

export default function Handler() {
  const [userInfo, setUserInfo] = useState<AuthInfo>({ email: "", password: "" })
  const router = useRouter();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(register);

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit() {
    try {
      mutate(userInfo)

      if(isLoading) {
        // show loading spinner
      }

      if(isError) {
        throw error;
      }

      if(isSuccess) {
        router.replace('/');  // client side redirect...
      } 

      setUserInfo({ email: "", password: "" });
    } catch (error) {
      console.log((error as Error).message); // show error on screen
    }
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
            <Form.Text className="text-muted">
              We will never share your info with anyone else.
            </Form.Text>
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
      </Form>
    </>
  )
}