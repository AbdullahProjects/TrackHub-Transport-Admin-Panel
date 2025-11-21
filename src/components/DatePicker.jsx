import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select driver registration date",
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const parsedDate = dayjs(value, "DD/MM/YYYY");
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  // Max date = today
  const maxDate = dayjs();

  // Min date = 100 years before today
  const minDate = dayjs().subtract(100, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        maxDate={maxDate}
        minDate={minDate}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder: placeholder || "Select Date",
            required: true,
            label: null,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
