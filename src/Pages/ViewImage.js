import styled from "styled-components";
import ImageAnnotation from "../Components/ImageAnnotation";
import { Box, Container, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { toast } from "react-toastify";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewImage = ({ image }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prediction, setPrediction] = React.useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log(image);
  return (
    <StyledDiv>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell align="right">x</TableCell>
                  <TableCell align="right">y</TableCell>
                  <TableCell align="right">w</TableCell>
                  <TableCell align="right">h</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prediction &&
                  prediction.map((row) => (
                    <TableRow
                      key={row.label}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell align="right">{row.bbox[0]}</TableCell>
                      <TableCell align="right">{row.bbox[1]}</TableCell>
                      <TableCell align="right">{row.bbox[2]}</TableCell>
                      <TableCell align="right">{row.bbox[3]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Typography
        sx={{ textAlign: "center", fontWeight: "light", marginBottom: "20px" }}
        variant="h2"
      >
        Draw Annotations
      </Typography>
      <Box sx={{ marginLeft: 30 }}>
        {image && (
          <ImageAnnotation
            handleOpen={handleOpen}
            handleClose={handleClose}
            prediction={prediction}
            setPrediction={setPrediction}
            navigate={navigate}
            image={image}
          />
        )}
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
