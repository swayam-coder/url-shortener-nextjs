import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { AuthInfo } from "../../interfaces_and_types"
import { useMutation, useQuery } from "react-query"
import { login } from "../../lib/crud-operations"
import Login from "../../styles/styled-components/form"
import { useUserContext } from "../../contexts"
import { HttpError } from "http-errors-enhanced"
import { useLoginMutation } from "../../hooks/react-query/mutations/auth"

export default function Handler() {
    const [userInfo, setUserInfo] = useState<AuthInfo>({ email: "", password: "" })
    const router = useRouter();

    const { mutate, isLoading, isError, isSuccess, error, data } = useLoginMutation(userInfo)

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
  
        if(isSuccess){
          if(data) {
            router.replace('/');  // client side redirect...
          } else {
            throw new HttpError(500, "something wrong happened")
          }
        }

        setUserInfo({ email: "", password: "" });
      } catch (error) {
        console.log((error as Error).message);
      }
    }
    
    return (
      <Login>
        <body className="text-center">
            <main className="form-signin">
                <form>
                {/* <Image className="mb-4" src="" alt="" width="72" height="57" /> */}
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021–2022</p>
                </form>
            </main>
        </body>
      </Login>
    )
}

