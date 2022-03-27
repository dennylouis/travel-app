import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.scss";

export default function Modal({ isOpen, close, children, size }) {
  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const modalVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: "25%",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={styles.container}>
          <motion.div
            className={`${styles.modal} ${size === "small" ? styles.small : styles.large}`}
            variants={modalVariants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            transition={{
              mass: 0.4,
              damping: 18,
              stiffness: 250,
              type: "spring",
            }}
          >
            <button className={styles.closeButton} onClick={close}>
              <svg width="24px" height="24px" viewBox="0 0 24 24">
                <g stroke="#000000" strokeWidth="2" fill="none">
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <line x1="7" y1="17" x2="17" y2="7" />
                </g>
              </svg>
            </button>
            <div className={styles.contents}>{children}</div>
          </motion.div>
          <motion.div
            className={styles.overlay}
            onClick={close}
            variants={overlayVariants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
