import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import { Collapse, Stack } from "@mui/material";

const Comments = ({ comments, id, toggleModal }) => {
  const blogComment = comments.filter((res) => res.parentId === id);
  return (
    <Stack width="100%">
      {blogComment.length > 0 &&
        blogComment.map((el) => (
          <CommentCard
            key={el._id}
            name={el.name}
            date={el.created_at}
            comment={el.comment}
            id={el._id}
            comments={comments}
            toggleModal={toggleModal}
          />
        ))}
    </Stack>
  );
};

export default Comments;

const CommentCard = ({
  id,
  name,
  date,
  comment,
  comments,
  bg,
  toggleModal,
}) => {
  const replies = comments.filter((res) => res.parentId === id);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          marginBottom: "5px",
          backgroundColor: bg ? bg : "",
        }}
      >
        <CardHeader
          avatar={<Avatar src="https://picsum.photos/200" />}
          title={name}
          subheader={date}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              localStorage.setItem("parentId", id);
              toggleModal();
            }}
          >
            Reply
          </Button>
          {replies.length > 0 && (
            <Button onClick={handleExpandClick} size="small">
              {expanded ? "Close Replies" : "View Replies"}
            </Button>
          )}
        </CardActions>
      </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack>
          {replies.map((el) => (
            <div key={el._id} style={{ marginLeft: "10px" }}>
              <CommentCard
                key={el._id}
                id={el._id}
                name={el.name}
                date={el.date}
                comment={el.comment}
                comments={comments}
                bg={"#f3f6ff"}
                toggleModal={toggleModal}
              />
            </div>
          ))}
        </Stack>
      </Collapse>
    </>
  );
};
