import { Container, Typography } from "@mui/material";

const Unauthorised = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography sx={{marginLeft: 6, textAlign: "center" }} variant="h5">
        {"Eep sorry, this route is either protected or incorrect :("}
      </Typography>
    </Container>
  );
};

export default Unauthorised;
