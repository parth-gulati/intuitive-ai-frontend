import { Container, Typography } from "@mui/material";

const Unauthorised = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        {"Eep sorry, this route is either protected or incorrect :("}
      </Typography>
    </Container>
  );
};

export default Unauthorised;
