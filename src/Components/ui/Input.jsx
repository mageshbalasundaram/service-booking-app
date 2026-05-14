import React from 'react'

const Input = ({label, type="text", placeholder, value, onChange, required = false}) => {

  return (
    <div className='flex flex-col gap-1 w-full'>
        {label && (
            <label className=" text-sm font-medium text-gray-700">{label}</label>
        )}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} className='border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus: ring-blue-500 w-full'  />
    </div>
  )
}

export default Input