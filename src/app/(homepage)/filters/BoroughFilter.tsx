"use client";

interface BoroughFilterProps {
  onFilterChangeAction: (boroughs: string[]) => void; // Function to handle filter change
  selectedBoroughs?: string[]; // Optional array of selected boroughs
}

// Define the list of boroughs
const boroughs = [
  { id: 1, name: "Manhattan" },
  { id: 2, name: "Brooklyn" },
  { id: 3, name: "Queens" },
  { id: 4, name: "Bronx" },
  { id: 5, name: "Staten Island" },
];

export default function BoroughFilter({
  onFilterChangeAction,
  selectedBoroughs = [],
}: BoroughFilterProps) {
  // Function to handle borough checkbox change

  const handleBoroughCheckboxChange = (borough: string) => {
    // If the selected boroughs already include the current borough,
    // we filter it out. Otherwise, we add it to the selected boroughs.
    const updatedBoroughs = selectedBoroughs.includes(borough)
      ? selectedBoroughs.filter((b) => b !== borough)
      : [...selectedBoroughs, borough];

    onFilterChangeAction(updatedBoroughs);
  };

  // Function to clear all filters
  const clearFilters = () => {
    onFilterChangeAction([]);
  };

  // Render the BoroughFilter component
  return (
    <div className="p-4 border rounded-md text-black mt-4">
      <div className="flex items-center mb-1 justify-center">
        <h3 className="text-green-500 font-bold mb-2 mr-3"> NYC Borough </h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4" />

        <button
          onClick={clearFilters}
          className="text-black-900 ml-2
         "
        >
          &times;
        </button>
      </div>
      <hr className="border-t border-gray-300 w-full mb-3" />
      <div className="flex flex-col ml-10 space-y-2">
        {boroughs.map((borough) => (
          <label key={borough.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`borough-${borough.id}`}
              className="mr-2 w-4 h-4"
              checked={selectedBoroughs.includes(borough.name)}
              onChange={() => handleBoroughCheckboxChange(borough.name)}
            />
            <span className="capitalize">{borough.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
