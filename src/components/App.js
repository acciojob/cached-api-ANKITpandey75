import React, { useEffect, useMemo, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Stores prior API responses so the same request is not fetched again.
  const cache = useMemo(() => new Map(), []);

  const apiUrl = useMemo(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/posts";

    return userId ? `${baseUrl}?userId=${userId}` : baseUrl;
  }, [userId]);

  useEffect(() => {
    if (cache.has(apiUrl)) {
      setPosts(cache.get(apiUrl));
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        cache.set(apiUrl, data);
        setPosts(data);
      } catch (error) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl, cache]);

  return (
    <div id="main">
      <h1>Posts</h1>

      <label htmlFor="userId">User ID:</label>
      <input
        id="userId"
        type="number"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
        placeholder="Enter user ID"
      />

      {loading && <p>Loading...</p>}

      {!loading &&
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
