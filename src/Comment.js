import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Comment = ({comment}) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{backgroundColor: "green", color: "whitesmoke", margin: "2px", borderRadius: "15px"}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {comment.name}
          </Typography>
          <hr style={{ width: "40vw" }}></hr>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {comment.body}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Comment ID: {comment.id}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Comment;