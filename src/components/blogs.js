import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardHeader,
  IconButton,
  Avatar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red, green, blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, content, id, date }) => {
  const colors = [red[500], green[400], blue[200]];
  const Navigate = useNavigate();
  return (
    <Card sx={{ width: 400, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: colors[0] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <CardActionArea onClick={() => Navigate(`/${id}`)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://picsum.photos/400/140"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content.substr(0, 125) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.length > 0 &&
        blogs.map((el) => (
          <>
            <BlogCard
              id={el._id}
              key={el._id}
              title={el.title}
              content={el.content}
              date={el.created_at}
            />
          </>
        ))}
    </>
  );
};

export default Blogs;
