import styled from "styled-components";
import ImageAnnotation from "../Components/ImageAnnotation";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

const ViewImage = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(image);
  return (
    <StyledDiv>
      <Typography
        sx={{ textAlign: "center", fontWeight: "light", marginBottom: '20px' }}
        variant="h2"
      >
        Draw Annotations
      </Typography>
      <Box sx={{ marginLeft: 30, height: 20 }}>
        {image && <ImageAnnotation image={image} />}
      </Box>
    </StyledDiv>
  );
};

const StyledDiv = styled(Container)`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* margin-left: 500px; */
  height: 100vh;
  overflow-y: hidden;
`;

export default ViewImage;
