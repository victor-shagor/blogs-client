import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetails from "./pages/blogDetails";
import Blogs from "./pages/blogs";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/:id" element={<BlogDetails />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
