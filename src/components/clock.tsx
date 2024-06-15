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
    <div className="flex flex-col items-center animate-fade-down">
      <div className="flex gap-2 text-3xl font-bold">
        <p suppressHydrationWarning>{hours < 10 ? "0" + hours : hours}</p>:
        <p suppressHydrationWarning>{minutes < 10 ? "0" + minutes : minutes}</p>:
        <p suppressHydrationWarning>{seconds < 10 ? "0" + seconds : seconds}</p>
      </div>
      <p className="text-md font-medium">{dateLocal}</p>
    </div>
  )
}

export default Clock