import React, { Component } from "react";

import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";
import ContactInfo from "../Shared/ContactInfo";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

render() {
  const { phone, email, address, openingDayHours } = this.props;
  
  return (
    <div className="h-70px md:h-150px">
      <nav
        className="h-70px fixed w-full flex items-center justify-between flex-wrap bg-gray-900 px-1 sm:px-6 z-20">
        <div
          className="flex items-center flex-shrink-0 text-white mr-6 p-2">
          <Icon
            path={mdiHome}
            size={1.5}
            className="fill-current h-8 w-8 mr-2"
          />
          <div className="tracking-tight flex flex-col leading-none">
            <span className="font-semibold text-xl">Shopping da Fazenda</span>
            <span className="text-gray-400 text-sm">Só o melhor da roça</span>
          </div>
        </div>
        <div className="block md:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" onClick={() => this.toggleMenu()}>
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow md:flex md:items-center md:w-auto block hidden md:show">
          <div className="lg:flex-grow inline-flex text-sm">
            {this.anchorLinks("Produtos")}
            {this.anchorLinks("Galeria")}
            {this.anchorLinks("Localização")}
            {this.anchorLinks("Contato")}
          </div>
        </div>
      </nav>
      
      <div className={`w-full fixed flex flex-col z-20 ${this.state.showMenu ? "" : "hidden"}`} style={{top: "70px"}}>
        {this.anchorLinks("Produtos", true)}
        {this.anchorLinks("Galeria", true)}
        {this.anchorLinks("Localização", true)}
        {this.anchorLinks("Contato", true)}
      </div>
      <div  className="hidden md:block h-full" style={{paddingTop: "70px"}}>
      <ContactInfo
        containerClass="w-full h-full md:flex md:items-center md:justify-around md:items-end"
        itemClass="flex items-center"
        phone={phone}
        email={email}
        address={address}
        openingDayHours={openingDayHours}
      /></div>
    </div>
  );
}

toggleMenu = (status) => {
  if(status !== undefined) {
    this.setState({showMenu: status});
  } else {
    this.setState((state, props) => ({showMenu: !state.showMenu}))
  }
}

anchorLinks = (name, horizontal) => {

  const className = `bg-gray-900 text-gray-200 font-bold ${horizontal ? "py-3 pl-5" : "hover:bg-purple-900 px-4 py-6"}`;
  const activeClass = `bg-purple-900 text-gray-200 font-bold ${horizontal ? "py-3 pl-5" : ""}`;

  return (
    <a className={`bg-gray-900 text-gray-200 font-bold ${horizontal ? "py-3 pl-5" : "hover:bg-purple-900 px-4 py-6"}`}
      onClick={()=> this.toggleMenu(false)}
    >
      {name}
    </a>
  );
}
}
export default Header;
