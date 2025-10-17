import React from 'react';

const InputField = ({ label, type = "text", value, onChange, placeholder, className = "" }) => {
  return (
    <div>
      <label className="text-gray-700 font-medium mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    </div>
  );
};

export default InputField;