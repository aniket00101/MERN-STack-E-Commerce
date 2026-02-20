import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSideBar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  })

  const [priceRange, setPriceRange] = useState([0, 100])
  const categories = ["Top wear", "Bottom wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"]
  const size = ["XS", "S", "M", "L", "XL", "XXL"]
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"]
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"]
  const genders = ["Men", "Women"]

  const navigate = useNavigate()

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target

    let newFilter = { ...filter }

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value]
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value)
      }
    } else {
      newFilter[name] = value
    }
    setFilter(newFilter)
    updateUrlParams(newFilter)
  }

  const updateUrlParams = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if(Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","))
      } else if(newFilter[key]) {
        params.append(key, newFilter[key])
      }
    })
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    })

    setPriceRange([0, params.maxPrice || 100])
  }, [searchParams])

  const handlePriceChange = (e) => {
    const newPrice = e.target.value
    setPriceRange([0, newPrice])
    const newFilter = {...FilterSideBar, minPrice: 0, maxPrice: newPrice}
    setFilter(filter)
    updateUrlParams(newFilter)
  }

  return (
    <div className='p-4'>

      <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Category</label>
        {
          categories.map((category) => (
            <div key={category} className='flex items-center mb-1'>

              <input checked={filter.category === category} type="radio" value={category} onChange={handleFilterChange} name="category" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

              <span className='text-gray-700'>{category}</span>

            </div>
          ))
        }
      </div>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Gender</label>
        {
          genders.map((gender) => (
            <div key={gender} className='flex items-center mb-1'>

              <input checked={filter.gender === gender} value={gender} onChange={handleFilterChange} type="radio" name="gender" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

              <span className='text-gray-700'>{gender}</span>

            </div>
          ))
        }
      </div>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Colors</label>

        <div className='flex flex-wrap gap-2'>
          {
            colors.map((color) => (

              <button value={color} onClick={handleFilterChange} key={color} name="color" className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filter.color === color ? "ring-2 ring-blue-500" : ""}`} style={{ backgroundColor: color.toLowerCase() }}></button>

            ))}
        </div>
      </div>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Size</label>

        {size.map((sizes) => (
          <div key={sizes} className='flex items-center mb-1'>

            <input checked={filter.size.includes(sizes)} value={sizes} onChange={handleFilterChange} type="checkbox" name='size' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

            <span className='text-gray-700'>{sizes}</span>

          </div>
        ))}

      </div>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Material</label>

        {materials.map((material) => (
          <div key={material} className='flex items-center mb-1'>

            <input checked={filter.material.includes(material)} value={material} onChange={handleFilterChange} type="checkbox" name="material" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

            <span className='text-gray-700'>{material}</span>

          </div>
        ))}

      </div>

      <div className='mb-6'>

        <label className='block text-gray-600 font-medium mb-2'>Brand</label>

        {brands.map((Brand) => (
          <div key={Brand} className='flex items-center mb-1'>

            <input checked={filter.brand.includes(Brand)} value={Brand} onChange={handleFilterChange} type="checkbox" name="brand"  className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

            <span className='text-gray-700'>{Brand}</span>

          </div>
        ))}

      </div>

      <div className='mb-8'>

        <label className='block text-gray-600 font-medium mb-2'>Price Range</label>

        <input  value={priceRange[1]} onChange={handlePriceChange} type="range" name="priceRange" min={0} max={100} className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />

        <div className='flex justify-between text-gray-600 mt-2'>
          <span> $0</span>
          <span>${priceRange[1]}</span>
        </div>

      </div>

    </div>
  )
}

export default FilterSideBar