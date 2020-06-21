import React from "react";
import ContactInfo from "../Shared/ContactInfo";

export default function Footer({ phone, email, address, openingDayHours }) {
  return (
    <ContactInfo
    containerClass="flex flex-col sm:flex-row justify-center sm:h-40 w-full sm:py-10 py-5 pl-5 sm:pl-0 bg-gray-200"
    itemClass="flex items-center sm:items-start md:mx-2 lg:mx-10 mb-5 sm:mb-0"
    phone={phone}
    email={email}
    address={address}
    openingDayHours={openingDayHours}
  />
  );
}
