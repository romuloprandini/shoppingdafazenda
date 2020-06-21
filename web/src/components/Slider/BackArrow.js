import React from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";


// position: absolute;
// top: 25%;
// margin-top: -1.5em;
// right: 15px;
// cursor: pointer;

const BackArrow = ({ onClick }) => (
  <div onClick={onClick} className="-ml-16 transform translate-x-16">
    <Icon
      path={mdiChevronLeft}
      size={2}
      className="text-white bg-gray-800 opacity-75"
    />
  </div>
);

export default BackArrow;
