import React, { useEffect, useState } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import BlogsCard from "../components/blogs";
import { fetchBlogs } from "../state/action";
import AppBar from "../components/appBar";
import { green } from "@mui/material/colors";
import CreateBlogModal from "../components/createModal";
import Loader from "../components/loading";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.post.blogs);
  const loadingBlogs = useSelector((state) => state.post.loadingBlogs);
  const error = useSelector((state) => state.post.error);
  const count = useSelector((state) => state.post.count);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const toggleModal = () => setOpen(!open);

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(fetchBlogs(page, query));
    }, 1000);

    return () => clearTimeout(getData); // eslint-disable-next-line
  }, [page, query]);
  return (
    <>
      <AppBar onChangeSearch={onChangeSearch} query={query} />
      <Box sx={{ display: "flex", width: "95%", marginTop: "20px" }}>
        <Button
          sx={{ marginLeft: "auto", backgroundColor: green[400] }}
          variant="contained"
          size="large"
          color="success"
          onClick={toggleModal}
        >
          Add Blog
        </Button>
      </Box>
      {loadingBlogs && !error ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              p: 1,
              m: 1,
              borderRadius: 1,
              marginLeft: "2%",
              marginRight: "2%",
            }}
          >
            <BlogsCard blogs={blogs} key={1} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {count > 6 && (
              <Pagination
                count={Math.ceil(count / 6)}
                color="success"
                onChange={(e, p) => setPage(p)}
                page={page}
              />
            )}
          </Box>
        </>
      )}
      <CreateBlogModal open={open} handleClose={toggleModal} blog={true} />
    </>
  );
};

export default Blogs;
