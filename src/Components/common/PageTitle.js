import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(className, "text-md-left", "mb-sm-0");

  return (
    <Card className="mb-4 mt-4">
      <Card.Body>
        <div className={classes} {...attrs}>
          <h3 className="page-title mt-0">{title}</h3>
          {subtitle ? <span className="text-uppercase page-subtitle">{subtitle}</span> : null }
        </div>
      </Card.Body>
    </Card>
  );
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string,
};

export default PageTitle;
