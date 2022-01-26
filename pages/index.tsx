import { ChangeEvent, useState } from "react"
import { UrlMetaData } from "../interfaces_and_types"
import { AxiosError } from "axios"
import { getHistory } from "../lib/crud-operations"
import { useRouter } from "next/router";
import Form from "../styles/styled-components/form"
import styles from "../styles/Home.module.css"
import toast from "react-hot-toast"
import { useHistoryQuery, useShortenQuery } from "../hooks/react-query/queries/main"
import { useLoginQuery } from "../hooks/react-query/queries/auth"

export default function Home(): JSX.Element  {
  const [url, setUrl] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [urlMetaData, setUrlMetaData] = useState<UrlMetaData>({ title: "", category: undefined, description: undefined })

  const { data: loginInfo } = useLoginQuery();

  const { 
    error: historyerror,
    isSuccess: isHistorySuccess,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    refetch: refetchHistory 
  } = useHistoryQuery(loginInfo!);

  const { refetch: refetchurl } = useShortenQuery(url, urlMetaData, setShortUrl);

  const router = useRouter();
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if(url != null) {
        const { isLoading, isFetching } = await refetchurl();

        if(isFetching) {
          toast.loading('Getting short url..please wait 🏃🏻‍♀️', {
            id: "datastate"
          });
        }

        if(isLoading) {
          toast.loading("Loading shortened url ⌛", {
            id: "datastate"
          });
        }
      }
    } catch (error) {
      console.log(error);
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
    refetchHistory();  // runs query to fetch history

    if(isHistoryLoading) {
      // show loading spinner
    }

    if(isHistoryError) {
      toast.error((historyerror as (AxiosError | Error)).message);  // show error on screen
    }

    if(isHistorySuccess) {
      router.push('/history');
    }
  }

  return (
    <div className={styles.formparent}>
      <div className={styles.forminputdiv}>
      {
        <Form>
          <body className="text-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
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
                    </div> <br />
                    <button className="w-100 btn btn-lg btn-dark generatebutton" type="submit">Generate Shortened URL</button>
                </form>
            </main>
          </body>
        </Form>
      }
      {shortUrl && <div>
          <h2>Your shortened url is ready!</h2>
          <p>{shortUrl}</p>
        </div>
      }
      {(loginInfo && loginInfo.data === undefined) && 
        <div>
          <p className={styles.logininfo}>Login or Register to save history of shortened urls</p>
          <button className={`btn btn-sm btn-outline-light ${styles.register}`} onClick={() => router.push('/auth/register')}>Register</button> &nbsp;
          <button className={`btn btn-sm btn-dark ${styles.loginbutton}`} onClick={() => router.push('/auth/login')}>Login</button>
        </div>
      }
      {(loginInfo && loginInfo.data != undefined) && <button onClick={handleButtonClick}>Your Links</button>}
      </div>
    </div>
  )
}