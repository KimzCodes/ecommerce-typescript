import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { removeToast, stopDelayAnimation } from "@store/toasts/toastsSlice";

import { TToast } from "@types";
import styles from "./styles.module.css";

const { toastItem } = styles;

const ToastItem = ({
  id,
  type,
  delayAnimation,
  title,
  message,
  onCloseToast,
}: TToast) => {
  const dispatch = useAppDispatch();

  const totalWidth = 100; // The progress bar width is 400 pixels, representing 100% completion.
  const duration = 4000; // Total duration in milliseconds
  const intervalTime = duration / totalWidth; // Interval time in milliseconds
  const delayAnimationDuration = duration / 2;
  const maxProgress = 100; // 100% completion

  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [pauseProgressBarIndicator, setPauseProgressBarIndicator] =
    useState(false);

  // remove toast handler
  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
    onCloseToast?.();
  }, [id, onCloseToast, dispatch]);

  //handle mouse hover over
  const handleMouseEvent = () => {
    setPauseProgressBarIndicator((prevState) => !prevState);
  };

  // progress bar indicator increment
  useEffect(() => {
    // if delay true stop progress bar
    if (delayAnimation) return;

    const timerId = setInterval(() => {
      setProgressBarIndicator((prevState) => {
        //if pause true stop incrementing progress
        if (!pauseProgressBarIndicator)
          if (prevState < maxProgress) {
            return prevState + 1; //increase 1 pixel
          }
        return prevState;
      });
    }, intervalTime);

    return () => clearInterval(timerId);
  }, [intervalTime, pauseProgressBarIndicator, delayAnimation]);

  //close toast when progress bar is completed
  useEffect(() => {
    if (progressBarIndicator === 100) {
      closeToastHandler();
    }
  }, [progressBarIndicator, closeToastHandler]);

  // handle delay animation
  useEffect(() => {
    if (delayAnimation) {
      const myTimeout = setTimeout(() => {
        dispatch(stopDelayAnimation(id));
      }, 1000);

      return () => clearTimeout(myTimeout);
    }
  }, [dispatch, delayAnimation, delayAnimationDuration, id]);

  // if delay true, return nothing
  if (delayAnimation) return;

  return (
    <div
      className={`alert ${`alert-${type}`} ${toastItem}`}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <h5>{title ? title : type}</h5>
      <p>{message}</p>
      <button type="button" className="btn-close" onClick={closeToastHandler} />
      <span
        className="placeholder"
        style={{
          width: `${progressBarIndicator}%`,
          transition: `width ${intervalTime}ms linear`,
        }}
      ></span>
    </div>
  );
};

export default ToastItem;
