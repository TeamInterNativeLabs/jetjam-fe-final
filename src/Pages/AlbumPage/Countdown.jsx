import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./countstyle.css";

export default function Countdown({ max, type }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, max, { duration: 2 });

    return animation.stop;
  }, []);

  return (
    <motion.span className={type == "bpm" ? "bpm-title" : "clock"}>
      {rounded}
    </motion.span>
  );
}
