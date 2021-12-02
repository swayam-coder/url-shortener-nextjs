import { HSLADefinition } from "graphql-scalars"
import { ChangeEvent, useState } from "react"
import { UrlMetaData } from "../interfaces-and-types"

export default function Home(): JSX.Element  {
  const [url, setUrl] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [urlMetaData, setUrlMetaData] = useState<UrlMetaData>({ title: "", category: undefined, description: undefined })

  async function handleSubmit() {
    if(url != null) {
      const response = await fetch('/api/', { method: "POST", body: JSON.stringify({ url, ...urlMetaData }) })
      const { shortenedUrlpath } = await response.json()

      setShortUrl(
        `${document.location.protocol}//${document.location.host}/${shortenedUrlpath}`
      );
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

  return (
    shortUrl ?
      <div>
        <h2>Your shortened url is ready!</h2>
        <p>{shortUrl}</p>
      </div>
      :
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={urlMetaData.title ?? ""} required placeholder="Enter url title here" onChange={(e) => handleChangeJSON(e, setUrlMetaData)}/>
        <input type="text" name="url" value={url ?? ""} required placeholder="Enter your url here" onChange={(e) => handleChange(e, setUrl)}/>
        <input type="text" name="description" value={urlMetaData.description ?? ""} placeholder="Enter your url description" onChange={(e) => handleChangeJSON(e, setUrlMetaData)} />
        <input type="text" name="category" value={urlMetaData.category ?? ""} placeholder="Enter url category here" onChange={(e) => handleChangeJSON(e, setUrlMetaData)}/>
        
        <button type="submit">Generate Shortened URL</button>
      </form>
  )
}