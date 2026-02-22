import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilter = {
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top wear", "Bottom wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  // -----------------------
  // UPDATE URL PARAMS
  // -----------------------
  const updateUrlParams = (newFilter) => {
    const params = new URLSearchParams();

    Object.keys(newFilter).forEach((key) => {
      const value = newFilter[key];

      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (value !== "" && value !== 0) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  // -----------------------
  // HANDLE CHECKBOX / RADIO
  // -----------------------
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilter = { ...filter };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...newFilter[name], value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }

    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

  // -----------------------
  // COLOR CLICK HANDLER
  // -----------------------
  const handleColorSelect = (color) => {
    const newFilter = {
      ...filter,
      color: filter.color === color ? "" : color,
    };

    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

  // -----------------------
  // PRICE SLIDER
  // -----------------------
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    const newFilter = {
      ...filter,
      minPrice: 0,
      maxPrice: newPrice,
    };

    setPriceRange([0, newPrice]);
    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

  // -----------------------
  // SYNC URL → STATE
  // -----------------------
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const updatedFilter = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    };

    setFilter(updatedFilter);
    setPriceRange([0, updatedFilter.maxPrice]);
  }, [searchParams]);

  // -----------------------
  // CLEAR FILTERS
  // -----------------------
  const clearFilters = () => {
    setFilter(defaultFilter);
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 
p-6 rounded-2xl shadow-xl text-gray-200 
h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500">

      <h3 className="text-2xl font-semibold mb-6">Filters</h3>

      {/* CATEGORY */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filter.category === category}
              onChange={handleFilterChange}
              className="mr-2 accent-purple-500"
            />
            {category}
          </label>
        ))}
      </div>

      {/* GENDER */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Gender</h4>
        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filter.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 accent-purple-500"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* COLORS */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Colors</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`w-8 h-8 rounded-full border 
              transition-transform hover:scale-110 ${filter.color === color
                  ? "ring-2 ring-purple-500 border-white"
                  : "border-gray-400"
                }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Size</h4>
        {sizes.map((size) => (
          <label key={size} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filter.size.includes(size)}
              onChange={handleFilterChange}
              className="mr-2 accent-purple-500"
            />
            {size}
          </label>
        ))}
      </div>

      {/* MATERIAL */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Material</h4>
        {materials.map((material) => (
          <label key={material} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filter.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 accent-purple-500"
            />
            {material}
          </label>
        ))}
      </div>

      {/* BRAND */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 accent-purple-500"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* PRICE */}
      <div className="mb-8">
        <h4 className="font-medium mb-3">Price Range</h4>

        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-purple-500 cursor-pointer"
        />

        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* CLEAR BUTTON */}
      <button
        onClick={clearFilters}
        className="w-full bg-purple-600 hover:bg-purple-700 
        text-white py-2 rounded-lg transition duration-300"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSideBar;