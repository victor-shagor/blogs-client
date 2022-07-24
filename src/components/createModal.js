import React, { useState } from "react";
import { TextField, Box, Modal, Stack, TextareaAutosize } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { green, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { AddCommentForm } from "./addComments";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../state/action";

const useStyles = makeStyles({
  textArea: {
    width: "100%",
    "&:focus": {
      border: (props) =>
        props.content ? `2px solid ${red[400]}` : `2px solid ${green[400]}`,
      outline: "none !important",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal({ open, handleClose, blog, blogId }) {
  const [date, setDate] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const classes = useStyles(errors);
  const onSubmit = (data) => {
    setLoading(true);
    const obj = { ...data, date };
    dispatch(createNewBlog(obj));
    handleClose();
    reset();
    setLoading(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>{blog ? "Add New Blog" : "Add New Comment"}</h3>
          {blog ? (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={6}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "title is required" }}
                  render={({ field, formState: { errors } }) => (
                    <TextField
                      {...field}
                      error={errors.title ? true : false}
                      label="title"
                      helperText={errors?.title?.message}
                      color="success"
                    />
                  )}
                />
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "content is required" }}
                  render={({ field, formState: { errors } }) => (
                    <TextareaAutosize
                      {...field}
                      error={errors.content ? true : false}
                      placeholder="Content"
                      helperText={errors?.content?.message}
                      minRows={10}
                      className={classes.textArea}
                      autoFocus={errors.content ? true : false}
                    />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="date"
                    disableFuture
                    disablePast
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField color="success" {...params} />
                    )}
                  />
                </LocalizationProvider>
                <LoadingButton
                  loading={loading}
                  sx={{ marginLeft: "auto", backgroundColor: green[400] }}
                  variant="contained"
                  size="large"
                  color="success"
                  type="submit"
                  // onClick={toggleModal}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </form>
          ) : (
            <AddCommentForm
              handleClose={handleClose}
              modal={true}
              blogId={blogId}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
