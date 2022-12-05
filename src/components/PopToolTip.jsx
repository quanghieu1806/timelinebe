import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const PopTooltip = ({ children, description }) => {
  return <Tippy content={description}>{children}</Tippy>;
};

export default PopTooltip;
