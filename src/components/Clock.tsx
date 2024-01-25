"use client"

import { useState, useEffect } from "react";

function Clock() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHora(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [hora]);

  const horaLocal = hora.toLocaleTimeString();
  const dateLocal = hora.toLocaleDateString();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-7xl font-semibold" suppressHydrationWarning>
        {horaLocal}
      </p>
      <p className="text-3xl">{dateLocal}</p>
    </div>
  )
}

export default Clock