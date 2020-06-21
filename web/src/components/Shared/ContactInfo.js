import React from 'react';

import Icon from "@mdi/react";
import {
  mdiWhatsapp,
  mdiMapMarkerRadiusOutline,
  mdiClockOutline,
} from "@mdi/js";

const ContactInfo = ({ phone, email, address, openingDayHours, containerClass, itemClass }) => {
  return (
    <div className={containerClass}>
      <div className={itemClass}>
        <a target="_blank" rel="noopener noreferrer"
          href={`https://wa.me/${phone.replace(
            /\+|-/gi,
            ""
          )}?text=Ol%C3%A1%20Shopping%20da%20Fazenda%21`}
        >
          <Icon path={mdiWhatsapp} size={2} className="text-gray-500" />
        </a>
        <div className="text-xs text-gray-700 font-bold leading-tight ml-5">
          <a target="_blank" rel="noopener noreferrer"
            href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
          <br />
          <a target="_blank" rel="noopener noreferrer"
            href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
      <div className={itemClass}>
        <a target="_blank" rel="noopener noreferrer"
          href={`http://maps.google.com/?q=Shopping da Fazenda, ${address.lines.reduce(
            (acc, line) => `${acc} ${line} `
          )}`}
        >
          <Icon
            path={mdiMapMarkerRadiusOutline}
            size={2}
            className="text-gray-500"
          />
        </a>
        <div className="text-xs text-gray-700 font-bold leading-tight ml-5">
          {address.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      <div className={itemClass}>
        <Icon path={mdiClockOutline} size={2} className="text-gray-500" />
        <div className="text-xs text-gray-700 font-bold leading-tight ml-5">
          {openingDayHours.map((dayHours, i) => (
            <p key={i}>{dayHours}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatPhoneNumber = (phone) => {
  return `(${phone.slice(3, 5)}) ${phone.slice(5, 10)}-${phone.slice(10)}`;
};

export default ContactInfo;
