import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function StandardImageList({ images, selectImage }) {
  const navigate = useNavigate();

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((item) => (
        <Button
          onClick={() => {
            selectImage(item);
            navigate("/view-image");
          }}
          sx={{ height: "250px" }}
        >
          <ImageListItem key={item.filename}>
            <img
              height="164px"
              width="164px"
              srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`data:image/jpeg;base64,${item.image}`}
              alt={item.filename}
              loading="lazy"
            />
          </ImageListItem>
        </Button>
      ))}
    </ImageList>
  );
}
