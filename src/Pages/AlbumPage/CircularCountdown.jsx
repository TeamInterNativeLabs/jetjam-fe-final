import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./circularCountdown.css";

const RADIUS = 60;
const STROKE = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TOTAL_TIME = 300; // 5 minutes in seconds

const CircularCountdown = ({ timeLeft }) => {
  const percentage = (timeLeft / TOTAL_TIME) * 100;
  const dashOffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <div className="circular-timer-wrapper">
      <svg width={150} height={150} className="progress-ring">
        <circle
          className="progress-ring__background"
          stroke="#ddd"
          strokeWidth={STROKE}
          fill="transparent"
          r={RADIUS}
          cx="75"
          cy="75"
        />
        <motion.circle
          className="progress-ring__circle"
          stroke="#3cbff3"
          strokeWidth={STROKE}
          fill="transparent"
          r={RADIUS}
          cx="75"
          cy="75"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          initial={false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "linear" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="timer-label"
        >
          {formatTime(timeLeft)}
        </text>
      </svg>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default CircularCountdown;
