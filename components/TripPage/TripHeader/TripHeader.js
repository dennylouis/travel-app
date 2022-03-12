import { useState } from "react";
import Modal from "components/Modal/Modal";
import CreateActivityForm from "components/Forms/CreateActivityForm";
import Header from "components/Header/Header";
import Avatar from "components/Avatar/Avatar";
import { useRouter } from "next/router";
import { formatRange } from "lib/dateHelpers";
import styles from "./TripHeader.module.scss";

export default function TripHeader({ trip }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { name, start_date, end_date, description, _id, owner } = trip;

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateActivityForm trip_id={_id} />
      </Modal>

      <div className={styles.stickyBit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className={styles.iconButton} onClick={() => router.back()}>
            ←
          </button>
        </div>
        {/* <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "0.5rem" }}>
          <button>Category View</button>
          <button>Calendar View</button>
          <button>Map View</button>
        </div> */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridGap: "0.5rem",
          }}
        >
          <Avatar user={owner[0]} />
          {/* <button>Invite a traveller</button> */}
        </div>
      </div>

      <div className={styles.scrollingBit}>
        <div className={styles.details}>
          <h2>{name}</h2>
          <p className="caption">{formatRange(start_date, end_date)}</p>
          <p className="caption">{description}</p>
        </div>

        <div className={styles.actions}>
          <button onClick={() => setShowModal(true)}>Add new activity</button>
          {/* <button
          onClick={async () => {
              await fetch(`/api/trips/${_id}`, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                    },
                });
            }}
            >
            Delete trip
        </button> */}
        </div>
      </div>
    </>
  );
}
