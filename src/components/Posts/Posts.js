import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { usePostContext } from "../../context/PostContext";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const { posts } = usePostContext();
  console.log(posts);

  if (posts.length < 1) {
    return <CircularProgress />;
  }
  return (
    <>
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        {posts.map((item) => {
          return (
            <Grid item key={item._id} item xs={12} sm={6}>
              <Post {...item} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Posts;
