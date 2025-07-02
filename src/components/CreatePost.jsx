import { Form } from "react-router-dom";
import { redirect } from "react-router-dom";
function CreatePost() {
  return (
    <Form method="post" className="create-post">
      <div className="form-group">
        <label htmlFor="userId">Enter your UserId here:</label>
        <input
          type="text"
          name="userId"
          className="form-control"
          id="userId"
          placeholder="Your user id"
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Post Content:</label>
        <textarea
          rows="4"
          name="body"
          className="form-control"
          id="body"
          placeholder="Tell us more about it."
        />
      </div>

      <div className="form-group">
        <label htmlFor="reactions">Number of reactions:</label>
        <input
          type="number"
          name="reactions"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post."
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Enter your Hashtags here:</label>
        <input
          type="text"
          name="tags"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </Form>
  );
}

export async function createPostAction({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const newPost = {
    title: postData.title,
    body: postData.body,
    reactions: parseInt(postData.reactions),
    userId: postData.userId,
    tags: postData.tags.split(" "),
  };

  const response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Failed to create post.");
  }

  const result = await response.json();
  console.log("Post created:", result);

  return redirect("/");
}

export default CreatePost;
