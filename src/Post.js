import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteForeverTwoTone from '@mui/icons-material/DeleteForeverTwoTone'

import { getComments } from './api/axios'
import Comment from "./Comment";

const Post = ({ post, setPosts, setSearchResults, setDeletePostsQueueCount, setSearchTextLength }) => {

    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletePost = (id) => {

        let previouslocalstorageValue = localStorage.getItem("deletePostsQueue");
        let obj = [];
        if (previouslocalstorageValue) {
            obj = JSON.parse(previouslocalstorageValue);
        }
        obj.push({ "id": id });
        localStorage.setItem("deletePostsQueue", JSON.stringify(obj));

        const deletePostsQueueCount = JSON.parse(localStorage.getItem("deletePostsQueue"))?.length;

        const savedPosts = localStorage.getItem("posts");
        const parsedPosts = JSON.parse(savedPosts);

        const savedPostsSearchResults = localStorage.getItem("postsSearchResults");
        const parsedSearchItems = JSON.parse(savedPostsSearchResults);

        const updatedPosts = parsedPosts.filter(post => post.id !== id);
        let updatedSearchPosts;

        if (parsedSearchItems) {
            updatedSearchPosts = parsedSearchItems.filter(post => post.id !== id);
            localStorage.setItem("postsSearchResults", JSON.stringify(updatedSearchPosts));
            setSearchResults(updatedSearchPosts);
            setSearchTextLength(updatedSearchPosts?.length);
        }

        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        setDeletePostsQueueCount(deletePostsQueueCount);
    }

    const showComments = (id) => {

        getComments(id).then(json => setComments(json));
        handleClickOpen();

    }

    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" style={{ cursor:"pointer", backgroundColor: "green", color: "whitesmoke", margin: "0.2em", padding: "0.2em", borderRadius: "15px" }} onClick={() => showComments(post.id)}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{post.title}</span>
                            <IconButton aria-label="delete" size="large">
                                <DeleteForeverTwoTone style={{ color: "red", fontSize: "60px" }} onClick={() => deletePost(post.id)} />
                            </IconButton>
                        </Typography>
                        <hr style={{ width: "40vw" }}></hr>
                        <Typography sx={{ mb: 0.5 }} color="text.secondary">
                            {post.body}
                        </Typography>
                        <Typography color="text.secondary">
                            Post ID: {post.id}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <h3>Comments for Post {post.id}</h3>
                {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default Post