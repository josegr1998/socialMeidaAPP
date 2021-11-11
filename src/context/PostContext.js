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
import { useUserContext } from "./UserContext";

const url = "https://memories-project1515.herokuapp.com/posts/";

// const url = "http://localhost:5000/posts/";
const PostContext = React.createContext();

const initialState = {
  posts: [],
  editID: null,
};
//importante
let token;
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const googleUser = useUserContext();

  useEffect(() => {
    if (profile) {
      token = profile.token;
    }
  }, [googleUser]);

  const fetchPosts = async (url) => {
    const response = await axios.get(url);

    const posts = response.data.postMessages;

    dispatch({ type: GET_ALL_POSTS, payload: posts });
  };

  const createPost = async (postData) => {
    if (token) {
      const reqBody = { ...postData, name: profile.result.name };

      try {
        const response = await axios.post(url, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); //req body === postData
        const newPost = response.data.newPost;
        console.log(newPost);

        //dispatch action type create
        dispatch({ type: CREATE, payload: newPost });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //change edit id
  const changeEditID = (id) => {
    dispatch({ type: CHANGUE_EDIT_ID, payload: id });
  };
  //update post

  const updatePost = async (id, postData) => {
    if (token) {
      const response = await axios.patch(`${url}${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedPost = response.data.post;

      dispatch({ type: UPDATE_POST, payload: updatedPost });
    }
  };
  //delete post

  const deletePost = async (id) => {
    if (token) {
      try {
        await axios.delete(`${url}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch({ type: DELETE_POST, payload: id });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const likePost = async (id) => {
    console.log(id);
    //update the post
    //mando el id en el body para que me tome el header

    if (token) {
      const response = await axios.patch(`${url}${id}/likePost`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedPost = response.data;

      dispatch({ type: UPDATE_POST, payload: updatedPost });
    }

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
