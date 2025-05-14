import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../store/Post-list-store";
export default function Post({ post }) {
  const { deletePost } = useContext(PostList);
  return (
    <>
      <div className="card Post-card" style={{ width: "38rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {post.title}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={() => {
                deletePost(post.id);
              }}
            >
              <MdDeleteForever />
            </span>
            <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-primary">
              👍 {post.reactions?.likes ?? 0} | 👎{" "}
              {post.reactions?.dislikes ?? 0}
            </span>
          </h5>
          <p className="card-text">{post.body}</p>
          {post.tags.map((tag) => (
            <span className="badge text-bg-primary hashtag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
