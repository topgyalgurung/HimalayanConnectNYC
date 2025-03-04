interface CategoryFilterProps {
  onFilterChange: (category: string[]) => void;
  selectedCategories?: string[];
}

const categories = [
  { id: 1, name: "community" },
  { id: 2, name: "legal" },
  { id: 3, name: "health" },
  { id: 4, name: "education" },
  { id: 5, name: "finance" },
  { id: 6, name: "real estate" },
];

export default function ResourceFilter({
  onFilterChange,
  selectedCategories = [],
}: CategoryFilterProps) {
  const handleCategoryCheckboxChange = (category: string) => {
    //  checks if the selectedCategories array includes the category
    const updatedCategories = selectedCategories.includes(
      category.toLowerCase()
    )
      ? selectedCategories.filter(
          //filtering out the unchecked category
          (c) => c.toLowerCase() !== category.toLowerCase()
        )
      : [...selectedCategories, category];

    onFilterChange(updatedCategories);
  };
  const clearFilters = () => {
    onFilterChange([]);
  };
  return (
    <div className="p-4 border rounded-md text-black mt-4">
      <div className="flex items-center mb-1">
        <h3 className="text-blue-500 font-bold mb-2">Category</h3>
        <span className="mx-2 border-l border-gray-300 h-6 ml-4" />

        <button
          onClick={clearFilters}
          className="text-black-900 ml-4
         "
        >
          &times;
        </button>
      </div>
      <hr className="border-t border-gray-300 w-full mb-3" />
      <div className="flex flex-col space-y-2">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={cat.name}
              checked={selectedCategories.includes(cat.name)}
              onChange={() => handleCategoryCheckboxChange(cat.name)}
              className="w-4 h-4"
            />
            <span className="capitalize">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
