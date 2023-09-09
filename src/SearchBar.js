import Fuse from 'fuse.js';
import { useEffect, useState } from 'react'
import { getPosts, deletePost } from './api/axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import DeleteForeverTwoTone from '@mui/icons-material/DeleteForeverTwoTone'

const SearchBar = ({ posts, searchTextLength, setPosts, setSearchResults, deletePostsQueueCount, setDeletePostsQueueCount, setSearchTextLength }) => {

    const [searchText, setSearchText] = useState(() => {
        const savedItem = localStorage.getItem("postsSearchCharacters");
        const parsedItem = JSON.parse(savedItem);
        return parsedItem || "";
    });

    const fuse = new Fuse(posts, {
        keys: [
            'title',
            'body'
        ]
    })

    useEffect(() => {
        localStorage.setItem("postsSearchCharacters", JSON.stringify(searchText));
    }, [searchText])

    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {

        if (!e.target.value) {
            localStorage.setItem('postsSearchResults', JSON.stringify(posts));
            setSearchText(e.target.value);
            return setSearchResults(posts)
        }

        const results = fuse.search(e.target.value);
        const postsSearchResults = results.map(post => post.item);

        localStorage.setItem('postsSearchResults', JSON.stringify(postsSearchResults));

        setSearchText(e.target.value);
        setSearchResults(postsSearchResults);
        setSearchTextLength(postsSearchResults.length);
    }

    const getDataFromAPI = () => {

        localStorage.removeItem("postsSearchResults");
        localStorage.removeItem("postsSearchCharacters");

        const deletePostsQueue = JSON.parse(localStorage.getItem("deletePostsQueue"));

        deletePostsQueue?.length > 0 && console.log("***** Queued up Local DELETE API request has been intialized to API Server *****")

        deletePostsQueue?.forEach(post => {
            deletePost(post.id);
        });

        localStorage.removeItem("deletePostsQueue");
        setDeletePostsQueueCount(0);

        getPosts().then(json => {

            setSearchText("");
            localStorage.setItem("posts", JSON.stringify(json));
            localStorage.setItem("postsSearchResults", JSON.stringify(json));
            setPosts(json)
            setSearchResults(json)

        })

    }

    return (
        <>
            <header>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        className="search__input"
                        type="text"
                        id="search"
                        onChange={handleSearchChange}
                        value={searchText}
                    />
                    <button className="search__button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
                <Button variant="contained" onClick={getDataFromAPI}>Refresh State</Button>
                <Badge badgeContent={deletePostsQueueCount} showZero color="primary">
                    <DeleteForeverTwoTone color="action" style={{color: "red"}} />
                </Badge>
            </header>
            <div>{searchText ? <span style={{ color: 'red' }}>Showing <b>{searchTextLength}</b> fuzzy search results for <b>{searchText}</b></span> : <></>}</div>
        </>
    )
}
export default SearchBar