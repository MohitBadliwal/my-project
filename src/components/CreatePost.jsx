import React, { useContext, useRef } from "react";
import { PostList } from "../store/Post-list-store";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();
  const userIdElement = useRef();
  const userTitleElement = useRef();
  const userContentElement = useRef();
  const userLikeReactionsElement = useRef();
  const userDislikeReactionsElement = useRef();
  const userTagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const title = userTitleElement.current.value;
    const body = userContentElement.current.value;
    const reactions = {
      likes: Number(userLikeReactionsElement.current.value),
      dislikes: Number(userDislikeReactionsElement.current.value),
    };
    const tags = userTagsElement.current.value.split(" ");

    console.log("sending post ot server");
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        body: body,
        reactions: reactions,
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((posts) => {
        console.log("got respose from server");
        addPost(posts);
        navigate("/");
      });

    userIdElement.current.value = "";
    userTitleElement.current.value = "";
    userContentElement.current.value = "";
    userLikeReactionsElement.current.value = "";
    userDislikeReactionsElement.current.value = "";
    userTagsElement.current.value = "";
  };
  return (
    <>
      <form className="Create_Card" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="text"
            ref={userIdElement}
            className="form-control"
            id="userId"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            ref={userTitleElement}
            className="form-control"
            id="title"
            placeholder="Enter the Post heading."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Post Content
          </label>
          <textarea
            type="text"
            ref={userContentElement}
            className="form-control"
            rows={4}
            id="body"
            placeholder="Enter the content regarding the Post subject."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Post reactions
          </label>
          <input
            type="number"
            ref={userLikeReactionsElement}
            className="form-control"
            id="reaction"
            placeholder="Enter the likes "
          />
          <input
            type="number"
            ref={userDislikeReactionsElement}
            className="form-control"
            id="reactions"
            placeholder="Enter the dislikes"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Post Tags
          </label>
          <input
            type="text"
            ref={userTagsElement}
            className="form-control"
            id="tags"
            placeholder="Enter the hashtags you want to add with a space."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
}
