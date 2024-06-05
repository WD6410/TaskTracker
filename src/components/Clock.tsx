"use client"

import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const dateLocal = time.toLocaleDateString();

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-down">
      <div className="flex gap-5 text-7xl font-semibold">
        <p suppressHydrationWarning key={hours} className="animate-fade-down">{hours < 10 ? "0" + hours : hours}</p>:
        <p suppressHydrationWarning key={minutes} className="animate-fade-down">{minutes < 10 ? "0" + minutes : minutes}</p>:
        <p suppressHydrationWarning key={seconds} className="animate-fade-down">{seconds < 10 ? "0" + seconds : seconds}</p>
      </div>
      <p className="text-3xl">{dateLocal}</p>
    </div>
  )
}

export default Clock