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
    //cuando todavia no tengo la autenticacion aca va creator
    name,
    createdAt,
    tags,
    message,
    likes,
    _id,
    creator,
  } = props;

  //se pueden crear subcomponents inside the component, pretty cool

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FaRegThumbsUp fontSize='small' />{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others liked this post`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FaRegThumbsUp fontSize='small' />
          {likes.length} {likes.length === 1 ? `like` : "likes"}
        </>
      );
    } else {
      return (
        <>
          <FaRegThumbsUp fontSize='small' /> &nbsp;like
        </>
      );
    }
  };

  const { changeEditID, deletePost, likePost } = usePostContext();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

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
        {/*cuando todavia no creo la autenticacion aca iba creator. Una vez que creo la autenticacion puedo
        sacar el name de el perfil que guardo en el localStorage o de la variable global */}
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={() => {
              changeEditID(_id);
            }}
          >
            <BsThreeDots fontSize='default' style={{ color: "black" }} />
          </Button>
        )}

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
              <Likes />
            </Button>
            {(user?.result?.googleId === creator ||
              user?.result?._id === creator) && (
              <Button
                size='small'
                color='primary'
                onClick={() => {
                  deletePost(_id);
                }}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default Post;
