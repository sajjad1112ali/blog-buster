import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { addBlogComment } from "../../redux";
import SendIcon from "@mui/icons-material/Send";
function Comment({ commentError, blogID, origCom }) {
  const dispatch = useDispatch();
  const authenticationData = useSelector((state) => state.authentication);
  const { currentUser } = authenticationData;

  const initialValues = {
    comment: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    origCom.push({
      comment: values.comment,
      user: { name: currentUser.name },
      date: "",
      time: "",
      id: Math.random(),
    });
    const commentData = { ...values, blog_id: blogID };
    dispatch(addBlogComment(commentData, onSubmitProps));
  };

  const validationSchema = yup.object({
    comment: yup.string().required("Required"),
  });

  return (
    <Box autoComplete="off" sx={{ px: 0 }}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <Box sx={{ px: 2 }}>
              {commentError && <Alert severity="error">{commentError}</Alert>}
              <Form noValidate>
                <FormikControll
                  controll="mui-input"
                  type="text"
                  label="Comment"
                  name="comment"
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: <SendIcon />,
                  }}
                />
                {/* <Box textAlign="center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Box> */}
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default Comment;
