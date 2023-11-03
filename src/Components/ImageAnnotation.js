import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Browser } from "@syncfusion/ej2-base";
import React from "react";
import { Box, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

/*
    This portion has not been made responsive
    The annotations take into account the frame size of the canvas, and
    start from ~300 and ~15, instead of 0, 0 
    
    This can be fixed by subtracting the starting Xand Y, but has 
    not been done yet in the interest of time

    TBD: Add Responsiveness in the annotation section

*/
export default class ImageAnnotation extends React.Component {
  imgObj;
  height;
  width;
  x;
  y;
  constructor(props) {
    super(props);
    this.state = {
      annotations: {},
      labels: {},
    };
  }

  async componentDidMount() {
    let response = await axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/get-image/${this.props.image.filename}`
      )
      .then((response) => {
        let annotations = response.data.annotations;
        for (let i = 0; i <= annotations.length - 1; i++) {
          let bbox = annotations[i]["bbox"];
          this.imgObj.drawRectangle(
            bbox[0],
            bbox[1],
            bbox[2],
            bbox[3],
            undefined,
            "#ff0000"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  imageEditorCreated() {
    let img = this.props.image.image;
    if (Browser.isDevice) {
      let dimension = this.imgObj.getImageDimension();
      this.height = dimension.height;
      this.width = dimension.width;
      this.x = dimension.x;
      this.y = dimension.y;
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

  async getPredictions(e) {
    await axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/get-predictions/" +
          this.props.image.filename
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success("Generated predictions using YoloV5");
          let anns = response.data[0];
          console.log(anns);
          for (let i = 0; i <= anns.length - 1; i++) {
            console.log(anns[i]);
            let bbox = anns[i]["bbox"];
            let ratio_x = this.width / anns[i]["original_w"];
            let ratio_y = this.height / anns[i]["original_h"];

            console.log(anns[i]);
            this.imgObj.drawRectangle(bbox[0], bbox[1], bbox[2], bbox[3]);
          }
        }
      });
  }

  async deleteImage(e) {
    const { navigate } = this.props;
    await axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          "/delete-image/" +
          this.props.image.filename
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message);
          navigate("/all");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  async saveAnnotations(e) {
    let annotations = [];
    let keys = Object.keys(this.state.annotations);
    for (let i = 0; i <= keys.length - 1; i++) {
      annotations.push({
        bbox: this.state.annotations[keys[i]],
        label: this.state.labels[keys[i]],
      });
    }

    await axios
      .put(
        process.env.REACT_APP_BASE_URL + "/edit/" + this.props.image.filename,
        { annotations }
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  addedAnno(e) {
    if (e.action != "delete") {
      let curpos = e.currentShapeSettings;
      if (curpos.id == null) return;
      if (!this.state.labels[curpos.id]) {
        this.setState((prevState) => ({
          ...prevState,
          labels: {
            ...prevState.labels,
            [e.currentShapeSettings.id]: "",
          },
        }));
      }
      this.setState((prevState) => ({
        ...prevState,
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
    } else {
      let id = e.previousShapeSettings.id;
      // Create new objects without the specified ID
      const newAnnotations = { ...this.state.annotations };
      const newLabels = { ...this.state.labels };

      delete newAnnotations[id];
      delete newLabels[id];

      this.setState((prevState) => ({
        annotations: newAnnotations,
        labels: newLabels,
      }));
    }
  }

  render() {
    return (
      <div className="e-img-editor-sample">
        <ImageEditorComponent
          shapeChanging={(e) => {
            console.log(this.state);
            this.addedAnno(e);
          }}
          height={"400px"}
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
          <ButtonComponent
            style={{ marginLeft: 20 }}
            cssClass="e-info"
            content="Save Annotation"
            onClick={this.saveAnnotations.bind(this)}
          />
          <ButtonComponent
            style={{ marginLeft: 20 }}
            cssClass="e-info"
            content="Get Predictions"
            onClick={this.getPredictions.bind(this)}
          />
          <ButtonComponent
            style={{ marginLeft: 20 }}
            cssClass="e-info"
            content="Delete Image"
            onClick={this.deleteImage.bind(this)}
          />
        </StyledDiv>
        <div>
          {Object.keys(this.state.annotations).map((row) => (
            <Box display="flex" alignItems="center">
              <TextField
                disabled
                label="X"
                variant="outlined"
                value={this.state.annotations[row][0]}
                // onChange={(e) => setX(e.target.value)}
                margin="normal"
              />
              <TextField
                disabled
                label="Y"
                variant="outlined"
                value={this.state.annotations[row][1]}
                // onChange={(e) => setY(e.target.value)}
                margin="normal"
              />
              <TextField
                disabled
                label="Width"
                variant="outlined"
                value={this.state.annotations[row][2]}
                // onChange={(e) => setWidth(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Height"
                variant="outlined"
                disabled
                value={this.state.annotations[row][3]}
                // onChange={(e) => setHeight(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Label"
                variant="outlined"
                value={this.state.labels[row]}
                onChange={(e) => {
                  this.setState((prevState) => ({
                    ...prevState,
                    labels: {
                      ...prevState.labels,
                      [row]: e.target.value,
                    },
                  }));
                }}
                margin="normal"
              />
              {/* <Button variant="contained" color="primary" onClick={handleAddLabel}>
          Add Label
        </Button> */}
            </Box>
          ))}
        </div>
      </div>
    );
  }
}

const StyledDiv = styled.div`
  margin-top: 10px;
`;
