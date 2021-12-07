import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { AuthInfo } from "../../interfaces_and_types"
import { useMutation } from "react-query"
import { login } from "../../lib/crud-operations"

export default function Handler() {
    const [userInfo, setUserInfo] = useState<AuthInfo>({ email: "", password: "" })
    const router = useRouter();
    const { mutate, isLoading, isError, isSuccess, error } = useMutation("userlogin", login);

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
        console.log((error as Error).message);
      }
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

