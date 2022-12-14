import { FcHighPriority } from "react-icons/fc";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import Load from "../../../../components/Load";
import BlockUserModal from "../../../../components/Modal/BlockUserModal";
import DriverUserModal from "../../../../components/Modal/DriverUserModal";
import GrantUserModal from "../../../../components/Modal/GrantUserModal";
import { OPEN_MODAL } from "../../../../store/constants/modal.const";
import styles from "../../Dashboard/dashboard.module.css";

function TableAdmin({ loadingInfo, userList, setUsername, setHandleGrant }) {
  console.log(userList);
  const dispatch = useDispatch();
  const onGrantUser = (id, role) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <GrantUserModal id={id} role={role} setHandleGrant={setHandleGrant} />
      ),
    });
  };
  const onBlockUser = (id, status) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <BlockUserModal
          id={id}
          status={status}
          setHandleGrant={setHandleGrant}
        />
      ),
    });
  };
  const onDriverUser = (id, status) => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <DriverUserModal
          id={id}
          status={status}
          setHandleGrant={setHandleGrant}
        />
      ),
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: "left", borderRadius: "30px 0 0 30px" }}>
            User Name
          </th>
          <th style={{ width: 270 }}>Driving</th>
          <th style={{ width: 85 }}>Grant</th>
          <th style={{ width: 100, borderRadius: "0px 30px 30px 0px" }}>
            Block
          </th>
        </tr>
      </thead>
      <tbody>
        {loadingInfo ? (
          <tr>
            <td style={{ textAlign: "end" }}>
              <Load />
            </td>
          </tr>
        ) : (
          userList &&
          userList.map((listUser, index) => {
            return (
              <tr key={index}>
                <td onClick={() => setUsername(listUser.id)}>
                  <div className={styles.align_items_center}>
                    <div style={{ marginRight: "20px" }}>
                      <img
                        src={
                          listUser.avatar === "" || listUser.avatar === null
                            ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                            : listUser.avatar
                        }
                        alt="img"
                      />
                    </div>
                    <p>{listUser.username}</p>
                  </div>
                </td>
                <td onClick={() => onDriverUser(listUser.id)}>
                  {listUser.drivingLicense &&
                  listUser.drivingLicense.status === "PENDING" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="verify btn btn--s prevent-click">
                        ??ang x??c th???c GPLX
                      </div>
                      <span>
                        <i className="ic ic-verifying" />
                      </span>
                    </div>
                  ) : (
                    <>
                      {listUser.drivingLicense &&
                      listUser.drivingLicense.status === "VERIFIED" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="verify btn btn--s prevent-click">
                            ???? x??c th???c GPLX
                          </div>
                          <span>
                            <i className="ic ic-verify" />
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="verify btn btn--s prevent-click">
                            Ch??a x??c th???c GPLX
                          </div>
                          <span>
                            <i className="ic ic-error" />
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </td>
                <td>
                  {listUser.roles?.length === 2 ? (
                    <button>
                      <MdAdminPanelSettings
                        color="#1E82C8"
                        onClick={() =>
                          onGrantUser(listUser.id, listUser.roles?.length)
                        }
                      />
                    </button>
                  ) : (
                    <button style={{ opacity: "50%" }}>
                      <MdAdminPanelSettings
                        color="#1E82C8"
                        onClick={() =>
                          onGrantUser(listUser.id, listUser.roles?.length)
                        }
                      />
                    </button>
                  )}
                </td>
                <td>
                  {listUser.status === "ACTIVE" ? (
                    <button
                      style={{ opacity: "50%" }}
                      onClick={() => onBlockUser(listUser.id, listUser.status)}
                    >
                      <FcHighPriority />
                    </button>
                  ) : (
                    <button
                      onClick={() => onBlockUser(listUser.id, listUser.status)}
                    >
                      <FcHighPriority />
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default TableAdmin;
