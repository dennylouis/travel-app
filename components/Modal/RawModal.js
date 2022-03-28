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
            {children}
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
