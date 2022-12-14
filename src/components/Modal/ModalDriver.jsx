import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useIsLogin } from "../../hooks/useIsLogin";
import { putUpdateDriver } from "../../store/actions/user.action";
import { CLOSE_MODAL } from "../../store/constants/modal.const";
import { storeImageToFireBase } from "../../utils/storeImageToFirebase.";
import Load from "../Load";

export function ModalDriver({ driver, reload, setReload }) {
  const dispatch = useDispatch();
  const { loading } = useIsLogin();
  const userLogin = localStorage.getItem("userLogin");
  const account_Id = userLogin ? JSON.parse(userLogin).id : "";
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUsers] = useState(driver);
  const [imageFront, setImageFront] = useState(driver.imageFront);
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImageFront(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const onUpdateUser = (e) => {
    e.preventDefault();
    dispatch(
      putUpdateDriver(
        account_Id,
        user.numberDrivingLicense,
        user.name,
        user.birthDate,
        imageFront,
        reload,
        setReload
      )
    );
    closeModal();
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUsers({
      ...user,
      [name]: value,
    });
  };
  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };
  return (
    <>
      <div className="modal-header" style={{ padding: "0px 20px 40px" }}>
        <h4 className="modal-title">C???p nh???t gi???y ph??p l??i xe</h4>
      </div>
      <form onSubmit={onUpdateUser} noValidate>
        <div className="modal-body">
          <div className="form-default form-s">
            <div className="line-form">
              <label className="label">S??? GPLX</label>
              <p className="info">
                <i className="ic ic-infomation" />
                D??y 12 ch??? s??? ??? m???t tr?????c GPLX
              </p>
              <div className="wrap-input ">
                <input
                  type="text"
                  name="numberDrivingLicense"
                  placeholder="Nh???p s??? GPLX ???? c???p"
                  value={user.numberDrivingLicense}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="line-form">
              <label className="label">H??? t??n</label>
              <div className="wrap-input ">
                <input
                  type="text"
                  name="name"
                  placeholder="Nh???p ?????y ????? h??? t??n"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="line-form">
              <label className="label">Ng??y sinh</label>
              <div className="wrap-input ">
                <input
                  type="text"
                  name="birthDate"
                  placeholder="Nh???p ?????y ????? ng??y sinh"
                  value={user.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="line-form">
              <label className="label">???nh b???ng l??i xe</label>
              <div className="list-photos">
                <label>H??nh ???nh GPLX m???t tr?????c</label>
                <p className="info">
                  <i className="ic ic-infomation" />
                  H??nh ch???p c???n th???y ???????c
                  <span className="fontWeight-5">???nh ?????i di???n</span> v??
                  <span className="fontWeight-5">S??? GPLX</span>
                </p>
                <ul>
                  <li>
                    <div className="obj-photo">
                      <span className="ins">
                        <div className="fileUploader ">
                          <div className="fileContainer">
                            {isLoading ? (
                              <>
                                <button
                                  type="button"
                                  disabled
                                  style={{
                                    opacity: ".4",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="chooseFileButton btn btn-primary btn--m"
                                >
                                  Ch???n h??nh <Load isSmall={true} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="chooseFileButton btn btn-primary btn--m"
                                >
                                  Ch???n h??nh
                                </button>
                                <input
                                  type="file"
                                  name="profileImageUrl"
                                  accept="image/*"
                                  onChange={onSelectFile}
                                  id="upload"
                                  className="btn"
                                  style={{
                                    opacity: 0,
                                    zIndex: 1,
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    position: "absolute",
                                  }}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </span>
                    </div>
                  </li>
                  {imageFront !== "string" && imageFront !== null && (
                    <li>
                      <div
                        className="obj-photo"
                        style={{
                          backgroundImage: `url(${imageFront})`,
                        }}
                      >
                        <Link to="#" className="func-remove">
                          <i className="ic ic-remove" />
                        </Link>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="clear" />
            {loading ? (
              <button
                className="btn btn-primary btn--m"
                style={{
                  width: "96.5%",
                  opacity: ".4",
                  display: "flex",
                  justifyContent: "center",
                }}
                disabled
              >
                <span> C???p nh???t</span>
                <Load isSmall={true} />
              </button>
            ) : (
              <button className="btn btn-primary btn--m">
                <span> C???p nh???t</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
