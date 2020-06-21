import React from "react";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

const NextArrow = ({ onClick }) => (
  <div onClick={onClick} className="-mr-16 transform -translate-x-16">
    <Icon
      path={mdiChevronRight}
      size={2}
      className="text-white bg-gray-800 opacity-75"
    />
  </div>
);

export default NextArrow;
