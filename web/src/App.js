import React, { Component } from "react";

import Header from "./components/Header/Header";
import NotificationPanel from "./components/Notification/NotificationPanel";
import Slider from "./components/Slider/Slider";
import Section from "./components/Shared/Section";
import Products from "./components/Products/Products";
import Gallery from "./components/Gallery/Gallery";
import Location from "./components/Location/Location";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

import "./tailwind.generated.css";

class App extends Component {
  state = {
    data: null,
    notificationPanel: {
      show: false,
      title: "",
      message: "",
      type: ""
    },
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
        <NotificationPanel
            {... this.state.notificationPanel}
            onClose={() => this.setState({ notificationPanel: { show: false } })}
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
        <Section
          id="contact"
          title="CONTATO"
          subtitle="Caso tenha alguma dúvida ou sugestão, entre em contato conosco através do formulário dos informações abaixo:"
        />
        <Contact notification={{show: this.showNotification}} />
        <div className="mt-20">
          <Footer
            phone={phone}
            email={email}
            address={address}
            openingDayHours={openingDayHours}
          />
        </div>
      </div>
    );
  }

  showNotification = (title, message, type) => {
    this.setState({
      notificationPanel: {
        show: true,
        title,
        message,
        type,
      },
    });
    setTimeout(() => this.setState({
      notificationPanel: {
        show: false
      }
    }), 3000);
  }
}

export default App;
