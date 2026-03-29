import React from "react";
import "../css/DummyCard.css";

const DummyCard = () => {
  return (
    <div className="product-card shimmer-card" aria-hidden="true">
      <div className="shimmer-header" />
      <div className="shimmer-img" />
      <div className="shimmer-body">
        <div className="shimmer-line title" />
        <div className="shimmer-line desc" />
        <div className="shimmer-line desc short" />
      </div>

      <div className="shimmer-footer">
        <div className="shimmer-pill" />
        <div className="shimmer-pill small" />
      </div>
    </div>
  );
};

export default DummyCard;
