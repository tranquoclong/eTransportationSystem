import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaInfoCircle,
  FaCameraRetro,
  FaAddressCard,
  FaClipboardList,
} from "react-icons/fa";
import Load from "../../../components/Load";
import Tabs from "./tab/tabs";
import PapersSetting from "./paperssetting";
import PhotosSetting from "./photossetting";
import TripsSetting from "./tripssetting";
import InfoSetting from "./infosetting";

function CarSetting() {
  const { carId } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  useEffect(() => {
    const getAccountInfo = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/car/details/${carId}`,
      })
        .then((res) => {
          setCarDetail(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [carId]);

  return (
    <section className="body">
      {carDetail ? (
        <>
          <div className="module-settings">
            <div className="info-car status-trips">
              <div className="info-img">
                <div className="fix-img">
                  <img
                    src={carDetail.carImages[0].image}
                    alt="Cho thuê xe tự lái AUDI A6 2017"
                  />
                </div>
              </div>
              <div className="info-desc hide-on-small">
                <div className="group-name">
                  <span className="lstitle">DÒNG XE</span>
                  <h1 className="title-car">{carDetail.name}</h1>
                  <span className="text-disabled">Chưa có chuyến</span>
                  <div className="space " />
                  {carDetail.status === "ACTIVE" ? (
                    <p className="status-info">
                      <span className="status green-dot" />
                      {carDetail.status}
                    </p>
                  ) : (
                    <>
                      {carDetail.status === "PENDING_APPROVAL" ? (
                        <p className="status-info">
                          <span className="status orange-dot" />
                          {carDetail.status}
                        </p>
                      ) : (
                        <p className="status-info">
                          <span className="status red-dot" />
                          {carDetail.status}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>

          <Tabs>
            <div label="Thông tin" Icon={FaInfoCircle}>
              <InfoSetting carDetail={carDetail} />
            </div>
            <div label="Hình ảnh" Icon={FaCameraRetro}>
              <PhotosSetting carDetail={carDetail} />
            </div>
            <div label="Giấy tờ xe" Icon={FaAddressCard}>
              <PapersSetting />
            </div>
            <div label="Quản lý chuyến" Icon={FaClipboardList}>
              <TripsSetting />
            </div>
          </Tabs>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Load />
        </div>
      )}
    </section>
  );
}

export default CarSetting;
