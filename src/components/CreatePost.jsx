import { useContext, useRef } from "react";
import { PostList } from "../store/post-list";

function CreatePost() {
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = parseInt(reactionsElement.current.value) || 0;
    const tags = tagsElement.current.value.split(" ");

    // Clear input fields
    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    const newPost = {
      title: postTitle,
      body: postBody,
      reactions,
      userId,
      tags,
    };

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((resObj) => {
        console.log("Post created:", resObj);
        addPost(resObj);
      })
      .catch((err) => {
        console.error("Error adding post:", err);
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">Enter your UserId here:</label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Your user id"
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Post Content:</label>
        <textarea
          rows="4"
          ref={postBodyElement}
          className="form-control"
          id="body"
          placeholder="Tell us more about it."
        />
      </div>

      <div className="form-group">
        <label htmlFor="reactions">Number of reactions:</label>
        <input
          type="number"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post."
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Enter your Hashtags here:</label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CreatePost;
