import React from 'react';

const NYC_BOROUGHS = [
  { id: 1, name: 'Manhattan' },
  { id: 2, name: 'Brooklyn' },
  { id: 3, name: 'Queens' },
  { id: 4, name: 'Bronx' },
  { id: 5, name: 'Staten Island' }
];

interface CitySelectProps {
  name?: string;
  required?: boolean;
  className?: string;
}

export default function CitySelect({ name = 'city', required = true, className = '' }: CitySelectProps) {
  return (
    <select
      name={name}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      aria-label="Select borough"
    >
      <option value="">Select Borough</option>
      {NYC_BOROUGHS.map((borough) => (
        <option key={borough.id} value={borough.name}>
          {borough.name}
        </option>
      ))}
    </select>
  );
} 