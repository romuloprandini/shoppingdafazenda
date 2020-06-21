import React, { Component } from "react";
import FullScreenImage from "./FullScreenImage";

class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFullSreen: false,
      fullScreenImage: null,
      fullScreenPosition: 0
    };

    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyboard);
  }

  render() {
    return (
      <div>
        <FullScreenImage
          image={this.state.fullScreenImage}
          show={this.state.showFullSreen}
          onClose={() => this.setState({ showFullSreen: false })}
          onPrevImage={this.handlePrevImage}
          onNextImage={this.handleNextImage}
        />
        <div className="grid row-gap-2 sm:gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ml-auto sm:w-10/12 mr-auto">
          { this.props.images.map((image, index) => (
              <img
                className="w-full h-48 object-cover cursor-pointer"
                key={image.id}
                src={image.src}
                alt={image.caption}
                onClick={() =>
                  this.setState({
                    showFullSreen: true,
                    fullScreenImage: image,
                    fullScreenPosition: index
                  })
                }
              />
          ))}
        </div>
      </div>
    );
  }

  handleKeyboard(ev) {
    if (this.state.showFullSreen) {
      const key = ev.keyCode ? ev.keyCode : ev.which;
      switch (key) {
        case 37:
          return this.handlePrevImage();
        case 39:
          return this.handleNextImage();
        case 27:
          return this.setState({ showFullSreen: false });
        default:
          break;
      }
    }
  }

  handlePrevImage() {
    // const prevPosition = Math.max(0, this.state.fullScreenPosition - 1);
    // console.log("Prev Image: ", prevPosition, this.props.images[prevPosition]);
    // this.setState({ fullScreenImage: this.props.images[prevPosition] });

    this.setState((state, props) => {
      const prevPosition = Math.max(0, state.fullScreenPosition - 1);
      return {
        fullScreenPosition: prevPosition,
        fullScreenImage: props.images[prevPosition]
      }
    });
  }

  handleNextImage() {
    // const nextPosition = Math.min(this.props.images.length - 1, this.state.fullScreenPosition + 1);
    // console.log("Next Image: ", nextPosition, this.props.images[nextPosition]);
    // this.setState({ fullScreenImage: this.props.images[nextPosition] });

    this.setState((state, props) => {
      const nextPosition = Math.min(props.images.length - 1, state.fullScreenPosition + 1);
      return {
        fullScreenPosition: nextPosition,
        fullScreenImage: props.images[nextPosition]
      }
    });
  }
}

export default Gallery;
