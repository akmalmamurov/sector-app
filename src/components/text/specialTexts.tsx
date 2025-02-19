import React from "react";

const sunColorNBD = {
  text: "NBD",
  className: "text-sunColor font-bold pl-1 pr-1 inline align-baseline",
};

const SpecialTexts = () => {
  return <span className={sunColorNBD.className}>{sunColorNBD.text}</span>;
};

export default SpecialTexts;
