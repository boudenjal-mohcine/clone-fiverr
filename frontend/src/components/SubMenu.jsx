import React from "react";
import { Link } from "react-router-dom";

function SubMenu({ items }) {
  return (
    <div>
      <div className="menu">
        {items.map((item, index) => (
          <Link className="link menuLink" to={item.path} key={index}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubMenu;
