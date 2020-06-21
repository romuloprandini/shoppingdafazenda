import React, { Component } from "react";
import SliderImage from "./SliderImage";
import BackArrow from "./BackArrow";
import NextArrow from "./NextArrow";

class Slider extends Component {
  state = {
    position: 0,
  };

  shouldComponentUpdate = (nexProps, nextState) => {
    if (nextState.position === this.state.position) {
      return false;
    }
    return true;
  };

  render() {
    const {
      imgs = [],
      style,
      className = "flex justify-center flex-center items-center w-full h-320px md:h-480px lg:h-640px select-none",
      imageStyle,
      imageClassName,
    } = this.props;
    return (
      <div className={className} style={style}>
        {imgs.length > 1 ? (
          <BackArrow
            onClick={(click) => this.updatePosition(this.state.position - 1)}
          />
        ) : null}
        <SliderImage
          className={imageClassName}
          style={imageStyle}
          img={imgs[this.state.position]}
        />
        {imgs.length > 1 ? (
          <NextArrow
            onClick={(click) => this.updatePosition(this.state.position + 1)}
          />
        ) : null}
      </div>
    );
  }

  updatePosition = (step) => {
    if (step > this.props.imgs.length - 1) {
      step = 0;
    } else if (step < 0) {
      step = this.props.imgs.length - 1;
    }
    this.setState({ position: step });
  };
}

export default Slider;
