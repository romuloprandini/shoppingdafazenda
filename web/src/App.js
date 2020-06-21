import React, { Component } from "react";

import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import Section from "./components/Shared/Section";
import Products from "./components/Products/Products";
import Gallery from "./components/Gallery/Gallery";
import Location from "./components/Location/Location";

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
      openingDayHours,
      slider,
      products,
      gallery,
    } = this.state.data;

    return (
      <div className="w-full mx-auto">
        <Header
          phone={phone}
          email={email}
          address={address}
          openingDayHours={openingDayHours}
        />
        <Slider imgs={slider} imageStyle={{ objectPosition: "50% 22%" }} />
        <Section
          id="products"
          title="NOSSOS PRODUTOS"
          subtitle="Temos o orgulho em dizer que nossos produtos são todos caseiros e vem direto da fazenda, livre de agrotóxicos, conservantes e aditivos."
        />
        <Products products={products} />
        <Section id="galery" title="GALERIA" />
        <Gallery images={gallery} />
        <Section id="location" title="LOCALIZAÇÃO" />
        <Location
          zoom={18}
          center={address.position}
          popupText={
            <div>
              {address.lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          }
        />
      </div>
    );
  }
}

export default App;
