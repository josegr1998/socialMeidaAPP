import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/PostReducer";
import axios from "axios";
import {
  GET_ALL_POSTS,
  CREATE,
  CHANGUE_EDIT_ID,
  UPDATE_POST,
  DELETE_POST,
} from "../constants/actions";

const url = "https://memories-project1515.herokuapp.com/posts/";
const PostContext = React.createContext();

const initialState = {
  posts: [],
  editID: null,
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPosts = async (url) => {
    const response = await axios.get(url);

    const posts = response.data.postMessages;

    dispatch({ type: GET_ALL_POSTS, payload: posts });
  };

  const createPost = async (postData) => {
    try {
      const response = await axios.post(url, postData); //req body === postData
      const newPost = response.data.newPost;
      console.log(newPost);

      //dispatch action type create
      dispatch({ type: CREATE, payload: newPost });
    } catch (error) {
      console.log(error);
    }
  };

  //change edit id
  const changeEditID = (id) => {
    dispatch({ type: CHANGUE_EDIT_ID, payload: id });
  };
  //update post

  const updatePost = async (id, postData) => {
    const response = await axios.patch(`${url}${id}`, postData);
    const updatedPost = response.data.post;

    dispatch({ type: UPDATE_POST, payload: updatedPost });
  };
  //delete post

  const deletePost = async (id) => {
    try {
      await axios.delete(`${url}${id}`);

      dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    console.log(id);
    //update the post
    const selectedPost = state.posts.find((post) => {
      if (post._id === id) {
        return post;
      }
    });
    selectedPost.likeCount++;

    const updatedPost = await axios.patch(`${url}${id}`, selectedPost);

    dispatch({ type: UPDATE_POST, payload: updatedPost });

    //send the patch request
  };

  useEffect(() => {
    fetchPosts(url);
  }, []);

  return (
    <PostContext.Provider
      value={{
        ...state,
        createPost,
        changeEditID,
        updatePost,
        deletePost,
        likePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
