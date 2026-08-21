import React, { useEffect, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div id="main">
      <h1>Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;