import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type Post = {
  userId:number,
  id:number,
  title:string,
  body:string,
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const MAX_POSTS = 10

function App() {

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    function getData() {
      axios.get(`${API_URL}?_page=${page}&_per_page`)
      .then(({data}:{data:Post[]}) => setPosts(data))
    }
    getData()
  }, [page])

  return (
    <div className="App">
      <h1>Get content</h1>
      <div className='container-content'>
        <ul>
          {posts.map((post) => <li key={post.id}>{post.id}</li> )}
        </ul>
      </div>
      <div style={{display:'flex', justifyContent: 'center'}}>
        {page > 1 && <button className="button" onClick={() => setPage(page - 1)}>Previous</button> }
        <p>Current page {page}</p>
        {page < posts.length && <button className="button" onClick={() => setPage(page + 1)}>Next</button> }
      </div>
    </div>
  );
}

export default App;
