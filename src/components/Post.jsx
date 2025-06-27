import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list";

function Post({ post }) {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title position-relative">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag me-1">
            {tag}
          </span>
        ))}

        <div className="alert alert-success reactions mt-3" role="alert">
          👍 {post.reactions.likes} Likes &nbsp; | &nbsp; 👎{" "}
          {post.reactions.dislikes} Dislikes
        </div>
      </div>
    </div>
  );
}

export default Post;
