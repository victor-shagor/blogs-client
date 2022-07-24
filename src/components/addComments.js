import { TextareaAutosize, TextField, Stack, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { green, red } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createNewComment } from "../state/action";

const useStyles = makeStyles({
  submit: {
    backgroundColor: "black",
    color: "white",
    width: "50px",
  },
  box: {
    height: "380px",
    width: "100%",
    padding: "15px",
    marginBottom: "40px",
  },
  textArea: {
    width: "100%",
    "&:focus": {
      border: (props) =>
        props.comment ? `2px solid ${red[400]}` : `2px solid ${green[400]}`,
      outline: "none !important",
    },
  },
});

const AddComments = ({ blogId, handleClose }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.box} elevation={6}>
      <h4>Add a Comment</h4>
      <AddCommentForm blogId={blogId} handleClose={handleClose} />
    </Paper>
  );
};

export const AddCommentForm = ({ modal, blogId, handleClose }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      comment: "",
    },
  });

  const onSubmit = (data) => {
    const parantID = modal ? localStorage.getItem("parentId") : blogId;
    dispatch(createNewComment(blogId, data, parantID));
    if (modal) {
      handleClose();
    }
    reset();
  };

  const classes = useStyles(errors);
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width="100%">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              error={errors.name ? true : false}
              label="Name"
              helperText={errors?.name?.message}
              color="success"
            />
          )}
        />
        <Controller
          name="comment"
          control={control}
          rules={{ required: "comment is required" }}
          render={({ field, formState: { errors } }) => (
            <TextareaAutosize
              {...field}
              error={errors.comment ? true : false}
              placeholder="Comment"
              helperText={errors?.comment?.message}
              minRows={10}
              className={classes.textArea}
              autoFocus={errors.comment ? true : false}
            />
          )}
        />
        <LoadingButton
          sx={{
            marginLeft: "auto",
            backgroundColor: green[400],
            width: modal ? "40%" : "20%",
          }}
          variant="contained"
          color="success"
          type="submit"
          // onClick={toggleModal}
        >
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default AddComments;
