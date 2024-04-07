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

  const horas = hora.getHours();
  const minutos = hora.getMinutes();
  const segundos = hora.getSeconds();

  const dateLocal = hora.toLocaleDateString();

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-down">
      <div className="flex gap-5 text-7xl font-semibold">
        <p suppressHydrationWarning key={horas} className="animate-fade-down">{horas < 10 ? "0" + horas : horas}</p>:
        <p suppressHydrationWarning key={minutos} className="animate-fade-down">{minutos < 10 ? "0" + minutos : minutos}</p>:
        <p suppressHydrationWarning key={segundos} className="animate-fade-down">{segundos < 10 ? "0" + segundos : segundos}</p>
      </div>
      <p className="text-3xl">{dateLocal}</p>
    </div>
  )
}

export default Clock