import { useState, ChangeEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { AuthInfo } from "../../interfaces_and_types"
import { register } from "../../lib/crud-operations";
import { useMutation } from "react-query"
import Register from "../../styles/styled-components/form"

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
    <Register>
      <body className="text-center">
        <main className="form-signin">
          <form>
              {/* <Image className="mb-4" src="" alt="" width="72" height="57" /> */}
              <h1 className="h3 mb-3 fw-normal">Register</h1>
          
              <div className="form-floating">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
              <p className="mt-5 mb-3 text-muted">&copy; 2021–2022</p>
          </form>
        </main>
      </body>
    </Register>
  )
}