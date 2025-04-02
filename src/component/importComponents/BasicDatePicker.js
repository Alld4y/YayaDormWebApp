import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

export default function BasicDatePicker({onDateSelected}) {
  const [ selectedDate, setSelectedDate ] = useState(null); // ใช้ context
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select a date"
        value={selectedDate}                  
        onChange={(newValue) => {setSelectedDate(newValue);
                                  onDateSelected(newValue);
                                }}  
        slots={{
          textField: (params) => <TextField {...params} />, 
        }}
      />
    </LocalizationProvider>
  );
}
