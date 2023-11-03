import { Container, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const UploadImage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("annotations", []);

    await axios
      .post(process.env.REACT_APP_BASE_URL + "/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message);
          navigate("/all");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <StyledDiv>
      <Typography variant="h2">Upload Image</Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 100, marginTop: 2, marginBottom: 5 }}
      >
        Upload a file to get started.{" "}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Select File
          </Button>
        </label>
        <Button
          onClick={(e) => {
            handleSubmit(e);
          }}
          variant="contained"
          sx={{ marginLeft: 2 }}
          disabled={!selectedFile}
          component="span"
        >
          Upload File
        </Button>
      </Box>
    </StyledDiv>
  );
};

const StyledDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default UploadImage;
