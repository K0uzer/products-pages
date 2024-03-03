import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type contentProps = {
  userId:number,
  id:number,
  title:string,
  body:string
}

function App() {
  const [content, setContent] = useState([])
  const [list, setList] = useState([])

  let maxIdInPage:number = 10;
  const changePage = (maxIdInPage) => {

    setList(currentList(maxIdInPage))
  }

  const currentList:any = (maxIdInPage) => content.filter(({userId, id, title, body}:contentProps) => id <= maxIdInPage && id >= maxIdInPage - 10).map(({userId, id, title, body}:contentProps) => <p key={id} >{id}</p>)

  useEffect(() => {
    async function getData() {
      await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setContent(response.data))
    }
    getData()
    setList(currentList)
  }, [])

  console.log(content)
  console.log(list)

  return (
    <div className="App">
      <h1>Get content</h1>
      <div className='container-content'>
        {list}
      </div>
      <div>
        <button className="button" onClick={() => changePage(maxIdInPage)}>Previous</button>
        <button className="button" onClick={() => changePage(maxIdInPage)}>Next</button>
      </div>
    </div>
  );
}

export default App;
