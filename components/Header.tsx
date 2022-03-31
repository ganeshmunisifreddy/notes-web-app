import React from "react";
import { Add } from "react-uicons-beta";

type Props = {
  handleModal: any;
};

const Header = (props: Props) => {
  const { handleModal } = props;
  return (
    <header className="header">
      <div className="logo">Notes</div>
      {/* <div className="searchBox"></div> */}
      <button
        className="button__primary"
        onClick={handleModal}
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <Add fill="#fff" size={16} style={{ marginRight: 6 }} />
        Add new
      </button>
    </header>
  );
};

export default Header;
