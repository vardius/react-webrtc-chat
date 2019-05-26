import React from "react";
import PropTypes from "prop-types";

function SidebarActions({ onToggleSidebar, count, isOpen, ...props }) {
  const handleToggleSidebar = () => {
    onToggleSidebar(!isOpen);
  };

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Sidebar controls"
      {...props}
    >
      <button
        type="button"
        className="btn btn-outline-secondary"
        title="Toggle sidebar"
        onClick={handleToggleSidebar}
      >
        <i
          className={`fa fa-chevron-${isOpen ? "right" : "left"}`}
          aria-hidden="true"
        />
        {count > 0 && <span className="badge badge-danger">{count}</span>}
      </button>
    </div>
  );
}

SidebarActions.propTypes = {
  count: PropTypes.number.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default SidebarActions;
