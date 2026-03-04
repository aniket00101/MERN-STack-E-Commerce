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
    maxPrice: 3000,
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [priceRange, setPriceRange] = useState([0, 3000]);

  const categories = ["Top wear", "Bottom wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  const updateUrlParams = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      const value = newFilter[key];
      if (Array.isArray(value) && value.length > 0) params.set(key, value.join(","));
      else if (value !== "" && value !== 0) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilter = { ...filter };
    if (type === "checkbox") {
      newFilter[name] = checked
        ? [...newFilter[name], value]
        : newFilter[name].filter((item) => item !== value);
    } else {
      newFilter[name] = value;
    }
    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

  const handleColorSelect = (color) => {
    const newFilter = { ...filter, color: filter.color === color ? "" : color };
    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    const newFilter = { ...filter, minPrice: 0, maxPrice: newPrice };
    setPriceRange([0, newPrice]);
    setFilter(newFilter);
    updateUrlParams(newFilter);
  };

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
      maxPrice: params.maxPrice || 3000, // ✅ Fixed: was 100
    };
    setFilter(updatedFilter);
    setPriceRange([0, updatedFilter.maxPrice]);
  }, [searchParams]);

  const clearFilters = () => {
    setFilter(defaultFilter);
    setPriceRange([0, 3000]); // ✅ Fixed: was 100
    setSearchParams({});
  };

  // Section header component
  const SectionHead = ({ label }) => (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-black tracking-widest uppercase"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '15px',
          letterSpacing: '0.12em',
          background: 'linear-gradient(90deg, #EAB308, #DC2626)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(234,179,8,0.3), transparent)' }} />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap');

        .filter-scrollbar::-webkit-scrollbar { width: 3px; }
        .filter-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .filter-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(#EAB308, #DC2626); }

        .filter-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #EAB308, #DC2626);
          cursor: pointer;
          border: none;
        }
        .filter-range::-webkit-slider-runnable-track {
          background: rgba(255,255,255,0.1);
          height: 3px;
        }
        .filter-range {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.1);
          outline: none;
          cursor: pointer;
        }

        .custom-radio { display: none; }
        .custom-check { display: none; }
      `}</style>

      <div
        className="filter-scrollbar border border-white/8 p-5 text-white h-screen overflow-y-auto"
        style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7 pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5" style={{ background: 'linear-gradient(to bottom, #EAB308, #DC2626)' }} />
            <h3 className="font-black tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.1em' }}>
              Filters
            </h3>
          </div>
          <button
            onClick={clearFilters}
            className="text-xs font-semibold tracking-widest uppercase text-black px-4 py-2 transition-opacity hover:opacity-80"
            style={{
              fontFamily: "'Barlow', sans-serif",
              background: 'linear-gradient(90deg, #EAB308, #DC2626)',
              clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
            }}
          >
            Clear
          </button>
        </div>

        {/* Category */}
        <div className="mb-7">
          <SectionHead label="Category" />
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category}
                className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 transition-colors hover:bg-white/3"
                style={{ borderLeft: filter.category === category ? '2px solid #EAB308' : '2px solid transparent' }}>
                <input
                  type="radio" name="category" value={category}
                  checked={filter.category === category}
                  onChange={handleFilterChange}
                  className="custom-radio"
                />
                <div className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ borderColor: filter.category === category ? '#EAB308' : 'rgba(255,255,255,0.2)' }}>
                  {filter.category === category && (
                    <div className="w-2 h-2" style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }} />
                  )}
                </div>
                <span className="text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: filter.category === category ? '#EAB308' : 'rgba(255,255,255,0.5)',
                  }}>
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-7">
          <SectionHead label="Gender" />
          <div className="flex gap-2">
            {genders.map((gender) => (
              <label key={gender} className="flex-1 cursor-pointer">
                <input type="radio" name="gender" value={gender}
                  checked={filter.gender === gender}
                  onChange={handleFilterChange}
                  className="custom-radio"
                />
                <div
                  className="text-center py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: filter.gender === gender ? 'linear-gradient(90deg, #EAB308, #DC2626)' : 'rgba(255,255,255,0.03)',
                    borderColor: filter.gender === gender ? 'transparent' : 'rgba(255,255,255,0.1)',
                    color: filter.gender === gender ? '#000' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {gender}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-7">
          <SectionHead label="Color" />
          <div className="flex flex-wrap gap-2.5">
            {colors.map((color) => (
              <button
                key={color}
                title={color}
                onClick={() => handleColorSelect(color)}
                className="w-8 h-8 transition-all duration-300 hover:scale-110 flex-shrink-0"
                style={{
                  backgroundColor: color.toLowerCase(),
                  border: filter.color === color ? '2px solid #EAB308' : '2px solid rgba(255,255,255,0.15)',
                  outline: filter.color === color ? '1px solid rgba(234,179,8,0.4)' : 'none',
                  outlineOffset: '2px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mb-7">
          <SectionHead label="Size" />
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <label key={size} className="cursor-pointer">
                <input type="checkbox" name="size" value={size}
                  checked={filter.size.includes(size)}
                  onChange={handleFilterChange}
                  className="custom-check"
                />
                <div
                  className="px-3 py-1.5 text-xs font-bold tracking-wider uppercase border transition-all duration-300"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    background: filter.size.includes(size) ? 'linear-gradient(90deg, #EAB308, #DC2626)' : 'rgba(255,255,255,0.03)',
                    borderColor: filter.size.includes(size) ? 'transparent' : 'rgba(255,255,255,0.1)',
                    color: filter.size.includes(size) ? '#000' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="mb-7">
          <SectionHead label="Material" />
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material}
                className="flex items-center gap-3 cursor-pointer py-1 px-2 hover:bg-white/3 transition-colors"
                style={{ borderLeft: filter.material.includes(material) ? '2px solid #DC2626' : '2px solid transparent' }}>
                <input type="checkbox" name="material" value={material}
                  checked={filter.material.includes(material)}
                  onChange={handleFilterChange}
                  className="custom-check"
                />
                <div className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ borderColor: filter.material.includes(material) ? '#DC2626' : 'rgba(255,255,255,0.2)' }}>
                  {filter.material.includes(material) && (
                    <div className="w-2 h-2" style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }} />
                  )}
                </div>
                <span className="text-sm"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: filter.material.includes(material) ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
                  }}>
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-7">
          <SectionHead label="Brand" />
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand}
                className="flex items-center gap-3 cursor-pointer py-1 px-2 hover:bg-white/3 transition-colors"
                style={{ borderLeft: filter.brand.includes(brand) ? '2px solid #EAB308' : '2px solid transparent' }}>
                <input type="checkbox" name="brand" value={brand}
                  checked={filter.brand.includes(brand)}
                  onChange={handleFilterChange}
                  className="custom-check"
                />
                <div className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ borderColor: filter.brand.includes(brand) ? '#EAB308' : 'rgba(255,255,255,0.2)' }}>
                  {filter.brand.includes(brand) && (
                    <div className="w-2 h-2" style={{ background: 'linear-gradient(135deg, #EAB308, #DC2626)' }} />
                  )}
                </div>
                <span className="text-sm"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: filter.brand.includes(brand) ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
                  }}>
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <SectionHead label="Price Range" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/30 tracking-widest"
              style={{ fontFamily: "'Barlow', sans-serif" }}>₹0</span>
            <span className="font-black text-sm"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '18px',
                background: 'linear-gradient(90deg, #EAB308, #DC2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.05em',
              }}>
              ₹ {priceRange[1]}
            </span>
          </div>
          <input
            type="range" min="0" max="3000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="filter-range"
          />
          <div className="mt-2 h-px w-full"
            style={{
              background: `linear-gradient(to right, #EAB308 0%, #DC2626 ${(priceRange[1] / 3000) * 100}%, rgba(255,255,255,0.08) ${(priceRange[1] / 3000) * 100}%)`,
            }}
          />
        </div>

      </div>
    </>
  );
};

export default FilterSideBar;