import { useAppSelector } from "@store/hooks";
import { AnimatePresence, motion } from "motion/react";
import ToastItem from "./ToastItem";
import styles from "./styles.module.css";
const { toastList } = styles;

const ToastList = () => {
  const { records } = useAppSelector((state) => state.toasts);

  return (
    <div className={toastList}>
      <AnimatePresence>
        {records.map((record) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
          >
            <ToastItem
              id={record.id}
              title={record.title}
              type={record.type}
              message={record.message}
              delayAnimation={record.delayAnimation}
              onCloseToast={record.onCloseToast}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastList;
