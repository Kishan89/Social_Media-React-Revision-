import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
};

export const PostList = createContext(DEFAULT_CONTEXT);

const postListReducer = (currentPostList, action) => {
  if (action.type === "ADD_POST") {
    return [action.payload, ...currentPostList];
  } else if (action.type === "DELETE_POST") {
    return currentPostList.filter((post) => post.id !== action.payload.postId);
  } else if (action.type === "ADD_INITIAL_POSTS") {
    return [...action.payload.posts];
  } else {
    return currentPostList;
  }
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userID, title, body, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title,
        body,
        reactions,
        userID,
        tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: { posts },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
