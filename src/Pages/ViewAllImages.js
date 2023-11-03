import { CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import StandardImageList from "../Components/ImageList";

const ViewAllImages = ({selectImage}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get(process.env.REACT_APP_BASE_URL + "/get-all")
          .then((response) => {
            if (response.status == 200) {
              setImages(response.data);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{textAlign: "center", marginBottom: 1}} variant="h2">View All Images</Typography>
      {loading && <CircularProgress sx={{marginTop: 10}} />}
      {images && <StandardImageList selectImage={selectImage} images={images} />}
    </Container>
  );
};

export default ViewAllImages;
