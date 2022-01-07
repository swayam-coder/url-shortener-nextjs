import { ChangeEvent, useState } from "react"
import { UrlMetaData } from "../interfaces_and_types"
import { useQuery, useMutation } from "react-query"
import axios from "axios"
import { getHistory } from "../lib/crud-operations"
import { useRouter } from "next/router"
import Form from "../styles/styled-components/form"

export default function Home(): JSX.Element  {
  const [url, setUrl] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [urlMetaData, setUrlMetaData] = useState<UrlMetaData>({ title: "", category: undefined, description: undefined })
  
  const logininfo = useQuery<{ userId: string }, Error>('userlogin')

  const { error, isSuccess, isLoading, isError, refetch } = useQuery(['/api/getHistory', logininfo.data?.userId ?? ""], getHistory, {
    // enabled: logininfo ? (logininfo.userId ? true : false) : false,  // this is to prevent loading if logininfo isnt available and if login is available then fetching is done before hand
    enabled: false,
    refetchOnWindowFocus: false
  });

  const router = useRouter()
  
  async function handleSubmit() {
    try {
      if(url != null) {
        const { data } = await axios.post('/api/', {url, ...urlMetaData})
  
        setShortUrl(
          `${document.location.protocol}//${document.location.host}/${data.shortenedUrlpath}`
        );
      }
    } catch (error) {
      // show this error on screen
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>, fn: Function) {
    fn(e.target.value)
  }

  function handleChangeJSON(e: ChangeEvent<HTMLInputElement>, fn: Function) {
    if(urlMetaData)
      fn((prevData: typeof urlMetaData) => ({
        ...prevData,
        [e.target.name]: e.target.value
      }))
  }

  function handleButtonClick() {
    refetch();  // runs query to fetch history

    if(isLoading) {
      // show loading spinner
    }

    if(isError) {
      console.log(error);  // show error on screen
    }

    if(isSuccess) {
      router.push('/history');
    }
  }

  return (
    <>
      {
        shortUrl ?
        <div>
          <h2>Your shortened url is ready!</h2>
          <p>{shortUrl}</p>
        </div>
        :
        <Form>
          <body className="text-center">
            <main className="form-signin">
                <form>
                {/* <Image className="mb-4" src="" alt="" width="72" height="57" /> */}
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" name="title" value={urlMetaData.title ?? ""} required placeholder="Enter url title here" onChange={(e) => handleChangeJSON(e, setUrlMetaData)} />
                        <label htmlFor="floatingInput">Enter Title</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingPassword" name="url" value={url ?? ""} required placeholder="Enter your url here" onChange={(e) => handleChange(e, setUrl)} />
                        <label htmlFor="floatingPassword">Enter Url</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingPassword" name="description" value={urlMetaData.description ?? ""} placeholder="Enter your url description" onChange={(e) => handleChangeJSON(e, setUrlMetaData)} />
                        <label htmlFor="floatingPassword">Enter Description</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingPassword" name="category" value={urlMetaData.category ?? ""} placeholder="Enter url category here" onChange={(e) => handleChangeJSON(e, setUrlMetaData)} />
                        <label htmlFor="floatingPassword">Enter Category</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-dark btn-outline-light" type="submit">Generate Shortened URL</button>
                </form>
            </main>
          </body>
        </Form>
      }
      {(logininfo.data === undefined) && 
        <div>
          <p>Login or Register to save history of shortened urls</p>
          <button className="btn btn-sm btn-outline-dark" onClick={() => router.push('/auth/register')}>Register</button> &nbsp;
          <button className="btn btn-sm btn-dark" onClick={() => router.push('/auth/login')}>Login</button>
        </div>
      }
      {(logininfo.data != undefined) && <button onClick={handleButtonClick}>Your Links</button>}
    </>
  )
}