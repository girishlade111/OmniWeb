"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const CalendarApp = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col h-full items-center justify-center bg-card p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

export default CalendarApp;
