import { getPosts } from './api/axios'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ListPage from './ListPage'

function App() {

  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchTextLength, setSearchTextLength] = useState(() => {
    const savedPostsSearchResults = localStorage.getItem("postsSearchResults");
    const parsedSearchItems = JSON.parse(savedPostsSearchResults);
    return parsedSearchItems?.length || 0;
  });

  const [deletePostsQueueCount, setDeletePostsQueueCount] = useState(() => {
    const deletePostsQueueCount = JSON.parse(localStorage.getItem("deletePostsQueue"))?.length;
    return deletePostsQueueCount || 0;
  });

  useEffect(() => {

    const savedPosts = localStorage.getItem("posts");
    const parsedPosts = JSON.parse(savedPosts);

    const savedPostsSearchResults = localStorage.getItem("postsSearchResults");
    const parsedSearchItems = JSON.parse(savedPostsSearchResults);

    if (parsedPosts)
      setPosts(parsedPosts)
    else {
      getPosts().then(json => {
        localStorage.setItem("posts", JSON.stringify(json));
        setPosts(json)
      })
    }

    if (parsedSearchItems)
      setSearchResults(parsedSearchItems)
    else {
      getPosts().then(json => {
        localStorage.setItem("postsSearchCharacters", JSON.stringify(""));
        localStorage.setItem('postsSearchResults', JSON.stringify(json));
        setSearchResults(json)
      })
    }

  }, [])



  return (
    <>
      <SearchBar posts={posts} searchTextLength={searchTextLength} setPosts={setPosts} setSearchResults={setSearchResults} deletePostsQueueCount={deletePostsQueueCount} setDeletePostsQueueCount={setDeletePostsQueueCount} setSearchTextLength={setSearchTextLength} />
      <ListPage searchResults={searchResults} setPosts={setPosts} setSearchResults={setSearchResults} setDeletePostsQueueCount={setDeletePostsQueueCount} setSearchTextLength={setSearchTextLength} />
    </>
  )
}

export default App;
