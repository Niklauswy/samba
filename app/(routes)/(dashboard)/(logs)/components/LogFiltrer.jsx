import React from 'react';
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./DatePickerWithRange";
import Combobox from "./Combobox";

const LogFilter = ({ logs, filters, setFilters }) => {
  const uniqueUsers = [...new Set(logs.map(log => log.user))];
  const uniqueIPs = [...new Set(logs.map(log => log.ip))];
  const uniqueEventTypes = [...new Set(logs.map(log => log.action))];

  const handleSelectChange = (name, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleDateChange = (dateRange) => {
    setFilters(prevFilters => ({ ...prevFilters, dateRange }));
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
        <DatePickerWithRange onChange={handleDateChange} />
              <Button onClick={() => setFilters({ user: '', dateRange: '', ip: '', eventType: '' })}>Limpiar Filtros</Button>

      </div>
    </div>
  );
};

export default LogFilter;