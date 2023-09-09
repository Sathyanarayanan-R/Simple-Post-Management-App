import Post from "./Post"

const ListPage = ({ searchResults, setPosts, setSearchResults, setDeletePostsQueueCount, setSearchTextLength }) => {

    const results = searchResults.map(post => <Post key={post.id} post={post} setPosts={setPosts} setSearchResults={setSearchResults} setDeletePostsQueueCount={setDeletePostsQueueCount} setSearchTextLength={setSearchTextLength} />)

    const content = results?.length ? results : <article><p>No Matching Posts</p></article>

    return (
        <main>{content}</main>
    )
}
export default ListPage