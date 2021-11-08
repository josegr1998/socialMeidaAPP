import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";
import { usePostContext } from "../../../context/PostContext";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import DeleteIcon from "@material-ui/icons/Delete";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import useStyles from "./styles";

const Post = (props) => {
  const {
    selectedFile,
    title,
    creator,
    createdAt,
    tags,
    message,
    likeCount,
    _id,
  } = props;
  const { changeEditID, deletePost, likePost } = usePostContext();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <img
        src={selectedFile}
        alt=''
        style={{
          height: "20rem",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{creator}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size='small'
          onClick={() => {
            changeEditID(_id);
          }}
        >
          <BsThreeDots fontSize='default' style={{ color: "black" }} />
        </Button>
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {tags.map((tag) => `#${tag} `)}
          </Typography>
          <CardContent>
            <Typography className={classes.title} variant='h5' gutterBottom>
              {message}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                likePost(_id);
              }}
            >
              <FaRegThumbsUp fontSize='small' />
              Like {likeCount}
            </Button>
            <Button
              size='small'
              color='primary'
              onClick={() => {
                deletePost(_id);
              }}
            >
              <FaRegThumbsUp fontSize='small' />
              Delete
            </Button>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default Post;
