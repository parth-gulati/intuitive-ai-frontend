import styled from "styled-components";
import ImageAnnotation from "../Components/ImageAnnotation";

const ViewImage = () => {
  return (
    <StyledDiv>
      <ImageAnnotation />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
    padding-left: 400px;
`

export default ViewImage;
