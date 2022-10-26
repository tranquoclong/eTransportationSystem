import React from "react";
import { Link } from "react-router-dom";

function PhotosSetting({ carDetail }) {
  return (
    <div className="list-photos settings">
      <div className="list-thumb">
        <div className="draggable">
          <div className="obj-photo">
            <div className="fix-img no-drag">
              <div className="fileUploader" style={{ width: "100%" }}>
                <div
                  className="fileContainer"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "70px",
                  }}
                >
                  <div className="errorsContainer" />
                  <button
                    type="button"
                    className="chooseFileButton btn btn-primary btn--m"
                  >
                    Chọn hình
                  </button>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="btn"
                    style={{
                      opacity: 0,
                      position: "absolute",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {carDetail.carImages.map((carImages, index) => (
          <div className="draggable" key={index}>
            <div className="obj-photo">
              <div className="fix-img no-drag">
                <img src={carImages.image} alt="" />
              </div>
              <Link to="#" className="func-remove">
                <i className="ic ic-remove" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotosSetting;
