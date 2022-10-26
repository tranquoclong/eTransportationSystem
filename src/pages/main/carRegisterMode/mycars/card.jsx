import React from "react";
import { Link } from "react-router-dom";

function Card({ car }) {
  return (
    <div className="trip-box">
      <Link to="#" className="func-remove">
        <i className="ic ic-remove" />
      </Link>
      <div className="box-wrap">
        <div className="item-car status-trips">
          {car.status === "ACTIVE" ? (
            <p className="status">
              <span className="status green-dot" />
              {car.status}
            </p>
          ) : (
            <>
              {car.status === "PENDING_APPROVAL" ? (
                <p className="status">
                  <span className="status orange-dot" />
                  PENDING
                </p>
              ) : (
                <p className="status">
                  <span className="status red-dot" />
                  {car.status}
                </p>
              )}
            </>
          )}
          <div className="car-img">
            <div className="fix-img">
              <a href="/car/bmw-520i-2017/KLAQ2V">
                <img src={car.carImage} alt={car.name} />
              </a>
            </div>
          </div>
        </div>
        <div className="desc-car">
          <h2>{car.name}</h2>
          <div className="wrap-line">
            <p>Chưa có chuyến</p>
          </div>
          <p className="cost">
            Giá tự lái: <span className="price">{car.price}K</span>
          </p>
          <p className="marginTop-xs">
            <i className="ic ic-sm-car-location" />
            {car.addressInfo}
          </p>
          <hr className="line-m" />
          <div style={{ display: "flex" }}>
            <Link
              to={`/car-detail/${car.id}`}
              className="btn btn-secondary btn--m"
            >
              Xem chi tiết
            </Link>
            <Link
              to={`/carSeting/${car.id}`}
              className="btn btn-primary btn--m"
            >
              Quản lý xe
            </Link>
          </div>
        </div>
      </div>
      <div className="trip-footer">
        <a
          className="btn btn-secondary btn--m"
          href="/car/bmw-520i-2017/KLAQ2V"
        >
          Xem chi tiết
        </a>
        <a
          className="btn btn-primary btn--m"
          href="/carsetting/KLAQ2V#infosetting"
        >
          Quản lý xe
        </a>
      </div>
    </div>
  );
}

export default Card;
