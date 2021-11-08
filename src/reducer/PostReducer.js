import {
  GET_ALL_POSTS,
  CREATE,
  CHANGUE_EDIT_ID,
  UPDATE_POST,
  DELETE_POST,
} from "../constants/actions";

const reducer = (state, action) => {
  if (action.type === GET_ALL_POSTS) {
    return { ...state, posts: action.payload };
  }
  if (action.type === CREATE) {
    return { ...state, posts: [action.payload, ...state.posts] };
  }
  if (action.type === CHANGUE_EDIT_ID) {
    return { ...state, editID: action.payload };
  }
  if (action.type === UPDATE_POST) {
    const newPosts = state.posts.map((post) => {
      if (post._id === action.payload._id) {
        return action.payload;
      } else {
        return post;
      }
    });
    return { ...state, posts: newPosts, editID: null };
  }

  if (action.type === DELETE_POST) {
    const newPosts = state.posts.filter((item) => {
      if (item._id !== action.payload) {
        return item;
      }
    });

    return { ...state, posts: newPosts };
  }

  return state;
};

export default reducer;
