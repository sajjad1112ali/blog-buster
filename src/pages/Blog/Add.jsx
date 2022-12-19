import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import { Box, Button, Alert, Paper } from "@mui/material";
import * as yup from "yup";
import FormikControll from "../../components/muiForm/FormikControll";
import { addBlog, getSingleBlog, updateBlog } from "../../redux";
import Loader from "../../components/Loader";

function Add() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogsData = useSelector((state) => state.blogs);
  const { singleBlog, loading, error } = blogsData;
  
  let initialValues = {};
  let schemaData = {};
  if (singleBlog) {
    initialValues = {
      title: singleBlog.title,
      content: singleBlog.body,
      image: [],
    };
    schemaData = {
      title: yup.string().required("Required"),
      content: yup.string().required("Required"),
    };
  } else {
    initialValues = {
      title: "",
      content: "",
      image: [],
    };
    schemaData = {
      title: yup.string().required("Required"),
      content: yup.string().required("Required"),
      image: yup.array().min(1, "select at least 1 file"),
    };
  }
  const [logoFile, setlogoFile] = useState("");
  const validationSchema = yup.object(schemaData);

  const { id } = useParams();
  const isAddMode = !id;
  useEffect(() => {
    if (!isAddMode) {
      dispatch(getSingleBlog(id, setlogoFile));
    }
  }, []);


  const onSubmit = (values, onSubmitProps) => {
    const { title, content, image } = values;
    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (!isAddMode) {
      if (image && image[0]) formData.append("image", image[0]);
      dispatch(updateBlog(id, formData, onSubmitProps, navigate));
    } else {
      formData.append("image", image[0]);
      dispatch(addBlog(formData, onSubmitProps, navigate));
    }
  };
  return (
    <Box autoComplete="off" sx={{ mt: 7 }}>
      {loading && !isAddMode ? (
        <Loader />
      ) : (
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Box
                height="50vh"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Form noValidate>
                  {error && <Alert severity="error">{error}</Alert>}

                  <FormikControll
                    controll="mui-input"
                    type="text"
                    label="Title"
                    name="title"
                    sx={{ mt: 2, mb: 2 }}
                  />
                  <FormikControll
                    controll="mui-input"
                    type="textarea"
                    label="Content"
                    name="content"
                  />

                  <input
                    accept="image/*"
                    className=""
                    style={{ display: "none" }}
                    type="file"
                    id="raised-button-file"
                    name="image"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        setlogoFile(URL.createObjectURL(event.target.files[0]));
                      }
                      const files = event.currentTarget.files;
                      let myFiles = Array.from(files);
                      formik.setFieldValue("image", myFiles);
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                      Upload Image
                    </Button>
                  </label>
                  {logoFile && (
                    <Paper variant="outlined" sx={{ mt: 2 }}>
                      <img height="250" width="250" src={logoFile} />
                    </Paper>
                  )}
                  <Box textAlign="center">
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      sx={{ mt: 2 }}
                    >
                      {!isAddMode ? "Update" : "Add"}
                    </Button>
                  </Box>
                </Form>
              </Box>
            );
          }}
        </Formik>
      )}
    </Box>
  );
}

export default Add;
