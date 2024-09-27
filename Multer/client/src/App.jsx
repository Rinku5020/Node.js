import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const baseurl = "http://localhost:8080"

function App() {
  const [file, setFile] = useState("")
  const [getimage, setGetimage] = useState([])
  const getDataFromDb = () => {
    axios.get(`${baseurl}/getImageData`).then((res) => {
      setGetimage(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleSubmit = () => {
    axios.post(`${baseurl}/upload`, { file },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }).then(res => {
        console.log(res)
        getDataFromDb()

      }).catch(err => {
        console.log(err)
      })
  }
useEffect(()=>{
getDataFromDb()
},[])


  return (
    <>
      <div>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" name="file" />
        <button onClick={handleSubmit}>Submit</button>
        <h1>Upload files</h1>
        {
          getimage.map((el)=>{
            return <img key={el._id} height={200} width={200} src={baseurl+"/"+el.imagefilename} alt="uploaded image" />
          })
        }
      </div>

    </>
  )
}

export default App
