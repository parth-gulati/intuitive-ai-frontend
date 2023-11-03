import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export default function StandardImageList({ images }) {
  console.log(images);

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((item) => (
        <Button sx={{ height: "250px" }}>
          <ImageListItem key={item.img}>
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

