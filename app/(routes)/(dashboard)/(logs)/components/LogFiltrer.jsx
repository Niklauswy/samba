import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./DatePickerWithRange";
import Combobox from "./Combobox";

const LogFilter = ({ logs, filters, setFilters }) => {
  const [reset, setReset] = useState(false);

  const uniqueUsers = [...new Set(logs.map(log => log.user))];
  const uniqueIPs = [...new Set(logs.map(log => log.ip))];
  const uniqueEventTypes = [...new Set(logs.map(log => log.action))];

  const handleSelectChange = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (dateRange) => {
    setFilters(prevFilters => ({ ...prevFilters, dateRange }));
  };

  const handleClearFilters = () => {
    setFilters({ user: '', dateRange: '', ip: '', eventType: '' });
    setReset(true);
    setTimeout(() => setReset(false), 0); // Reset the reset state
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Combobox
          options={uniqueUsers}
          placeholder="Filtrar por usuario"
          onChange={(value) => handleSelectChange('user', value)}
          value={filters.user}
        />
        <Combobox
          options={uniqueIPs}
          placeholder="Filtrar por IP"
          onChange={(value) => handleSelectChange('ip', value)}
          value={filters.ip}
        />
        <Combobox
          options={uniqueEventTypes}
          placeholder="Filtrar por evento"
          onChange={(value) => handleSelectChange('eventType', value)}
          value={filters.eventType}
        />
        <DatePickerWithRange onChange={handleDateChange} reset={reset} />
              <Button onClick={handleClearFilters}>Limpiar Filtros</Button>

      </div>
    </div>
  );
};

export default LogFilter;