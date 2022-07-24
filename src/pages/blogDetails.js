import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddComments from "../components/addComments";
import Comments from "../components/comments";
import { fetchBlog } from "../state/action";
import { Box } from "@mui/material";
import AppBar from "../components/appBar";
import CreateModal from "../components/createModal";

const BlogDetails = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.post.comments);
  const blog = useSelector((state) => state.post.blog);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchBlog(id)); // eslint-disable-next-line
  }, [id]);
  return (
    <>
      <AppBar />
      <Box
        sx={{
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <AddComments blogId={id} handleClose={toggleModal} />
        <Comments comments={comments} id={id} toggleModal={toggleModal} />
        <CreateModal open={open} handleClose={toggleModal} blogId={id} />
      </Box>
    </>
  );
};

export default BlogDetails;
