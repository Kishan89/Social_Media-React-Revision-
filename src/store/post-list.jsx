import { createContext, useReducer } from "react";

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Delhi",
    body: "Hi, friends I am going to Delhi for my vacations. Hope to enjoy a location. Peace out",
    reactions: 2,
    userID: "user-7",
    tags: ["vacation", "Delhi", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho bhai",
    body: "4 sall ki masti k baad bhi hogye hain pass. Hard to believe.",
    reactions: 15,
    userID: "user-7",
    tags: ["Graduating", "Unbelievable"],
  },
];

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
};

export const PostList = createContext(DEFAULT_CONTEXT);

const postListReducer = (currentPostList, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [action.payload, ...currentPostList];

    case "DELETE_POST":
      return currentPostList.filter(
        (post) => post.id !== action.payload.postId
      );

    default:
      return currentPostList;
  }
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

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

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
