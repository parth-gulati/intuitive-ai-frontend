import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Browser } from "@syncfusion/ej2-base";
import React from "react";
import styled from "styled-components";

/*
    This portion has not been made responsive
    TBD: Add Responsiveness in the annotation section

*/
export default class ImageAnnotation extends React.Component {
  imgObj;
  constructor(props) {
    super(props);
    this.state = {
      annotations: {},
      labels: {},
    };
  }

  imageEditorCreated() {
    let img = this.props.image.image;
    if (Browser.isDevice) {
      this.imgObj.open(`data:image/jpeg;base64,${this.props.image.image}`);
    } else {
      this.imgObj.open(`data:image/jpeg;base64,${this.props.image.image}`);
    }
  }
  btnClick() {
    let dimension = this.imgObj.getImageDimension();
    this.imgObj.drawRectangle(
      dimension.x,
      dimension.y,
      undefined,
      undefined,
      undefined,
      "#ff0000"
    );
  }

  addedAnno(e) {
    console.log(e.currentShapeSettings);
    let curpos = e.currentShapeSettings;
    if (curpos.id == null) return;
    if (!this.state.labels[curpos.id]) {
      this.setState((prevState) => ({
        labels: {
          ...prevState.labels,
          [e.currentShapeSettings.id]: "",
        },
      }));
    }
    this.setState((prevState) => ({
      annotations: {
        ...prevState.annotations,
        [e.currentShapeSettings.id]: [
          curpos.startX,
          curpos.startY,
          curpos.width,
          curpos.height,
        ],
      },
    }));
  }

  render() {
    return (
      <div className="e-img-editor-sample">
        <ImageEditorComponent
          shapeChanging={(e) => {
            this.addedAnno(e);
          }}
          height="400px"
          ref={(img) => {
            this.imgObj = img;
          }}
          created={this.imageEditorCreated.bind(this)}
          toolbar={[]}
        ></ImageEditorComponent>
        <StyledDiv>
          <ButtonComponent
            cssClass="e-info"
            content="Add Annotation"
            onClick={this.btnClick.bind(this)}
          />
        </StyledDiv>
      </div>
    );
  }
}

const StyledDiv = styled.div`
  margin-top: 10px;
`;
