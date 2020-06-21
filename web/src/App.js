import React, { Component } from "react";

import Header from "./components/Header/Header";

import "./tailwind.generated.css";

class App extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    const {
      phone,
      email,
      address,
      openingDayHours
    } = this.state.data;

    return (
      <div className="w-full mx-auto">
        <Header
          phone={phone}
          email={email}
          address={address}
          openingDayHours={openingDayHours}
        />
      </div>
    );
  }
}

export default App;
