import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64"; //para transformar imagenes
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { usePostContext } from "../../context/PostContext";

const Form = () => {
  const classes = useStyles();
  //recordar intentar hacerlo una variable global
  const profile = JSON.parse(localStorage.getItem("profile"));
  const { createPost, editID, updatePost, posts } = usePostContext();

  //en mi proyecto hacerlo global usando context para que cuando edito algo o subo algo estos valores vuelvan a ""
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editID) {
      updatePost(editID, postData);
    } else {
      createPost(postData);
    }
    clear();
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  //fill the form with the info of the item we want to edit
  useEffect(() => {
    const selectedItem = posts.find((post) => {
      if (post._id === editID) {
        return post;
      }
    });
    console.log(selectedItem);
    if (selectedItem) {
      setPostData({
        ...postData,
        creator: selectedItem.creator,
        title: selectedItem.title,
        message: selectedItem.message,
        tags: selectedItem.tags,
        selectedFile: selectedItem.file,
      });
    }
  }, [editID]);

  //conditional render. Si tengo profile como variable global (sacado del localStorage) esto se
  //va a volver a renderizar solo. Cuando clickeo logout podria hacer que profile sea null
  if (!profile) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like others memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {editID ? "Editing a Memory" : "Creating a Memory"}
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) => {
            setPostData({ ...postData, creator: e.target.value });
          }}
        />
        <TextField
          name='title'
          variant='outlined'
          label='title'
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name='message'
          variant='outlined'
          label='message'
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={
              (base64) =>
                setPostData({ ...postData, selectedFile: base64.base64 }) //importante agregar
            }
          />
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='secondary'
            size='small'
            type='submit'
            fullWidth
            onCLick={clear}
          >
            claer
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
