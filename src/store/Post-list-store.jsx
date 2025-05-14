import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  fetchingData: false,
  deletePost: () => {},
});
const postListReducer = (currentPostList,  action) => {
  // console.log(action);
  // console.log(currentPostList);
  let newPostList=currentPostList
  if(action.type ==="Delete_Post"){
    newPostList=currentPostList.filter((post) => post.id !== action.payload.postId);
  }else if(action.type ==="Add_Post"){
    newPostList = [action.payload.posts,...currentPostList ]
  }
  else if (action.type === "Add_Initial_Posts") {
    newPostList = [...currentPostList, ...action.payload.posts];
  }  
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer,[]);
 
  const addPost = (posts) => {
    // console.log('add post called',posts);
    dispatchPostList({
      type: "Add_Post",
      payload: {
        posts
      },
    });
  };
  

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type:"Add_Initial_Posts",
      payload:{
       posts
      }
    })
  };

  const deletePost = (postId) => {
    console.log(`${postId}`);
    dispatchPostList({
      type:"Delete_Post",
      payload:{
        postId
      }
    })
  };
  const [fetchingData, setfetchingData] = useState(false);
  useEffect(() => {
    setfetchingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        // console.log(addInitialPosts);
        setfetchingData(false);
      });
    return () => {
      // console.log("cleninig up useEffect");
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider value={{ postList, addPost, fetchingData ,deletePost }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
