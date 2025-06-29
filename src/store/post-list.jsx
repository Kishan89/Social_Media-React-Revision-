import { createContext, useReducer, useState, useEffect } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  fetching: false,
  addPost: () => {},
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
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
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

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch posts:", error);
          setFetching(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, addPost, deletePost, fetching }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
