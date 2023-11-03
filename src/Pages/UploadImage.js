import { Container, Typography, Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <StyledDiv>
      <Typography variant="h2">Upload Image</Typography>
      <Typography variant="body1" sx={{fontWeight: 100, marginTop: 2, marginBottom: 5}}>Upload a file to get started. </Typography>
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
        <Button variant="contained" sx={{marginLeft: 2}} disabled={!selectedFile} component="span">
          Upload File
        </Button>
        
      </label>
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
