import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostData } from "../store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
export default function PostList() {
  const { postList,fetchingData  } = useContext(PostData);
  

  return (
    <div>
      {fetchingData && <LoadingSpinner />}
      {!fetchingData && postList.length === 0 && <WelcomeMessage />}
      {!fetchingData &&
        postList.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
}
