"use client"

import { Plus, X } from "lucide-react"
import { useEffect } from "react"

export type OptionType = {
  label: string
  value: string
}

interface SubjectMarkEntry {
  subject: string;
  marks: string;
  type: string; // 'percentage' or 'cgpa'
}

interface SubjectMarksInputProps {
  field: {
    id: string;
    type: string;
    question: string;
    mandatory: boolean;
  };
  value: SubjectMarkEntry[];
  onChange: (fieldId: string, value: SubjectMarkEntry[]) => void;
  subjectOptions: OptionType[];
  maxLimit?: number; // Maximum number of subject entries allowed
}

const SubjectMarksInput = ({ 
  field, 
  value, 
  onChange, 
  subjectOptions,
  maxLimit = 4 
}: SubjectMarksInputProps) => {
  const safeValue = Array.isArray(value) ? value : []
  const typeOptions: OptionType[] = [
    { label: "Percentage", value: "percentage" },
    { label: "CGPA", value: "cgpa" }
  ]

const handleEntryChange = (index: number, key: keyof SubjectMarkEntry, newValue: string) => {
    const updatedEntries = [...safeValue]
    updatedEntries[index] = {
      ...updatedEntries[index],
      [key]: newValue
    }
    onChange(field.id, updatedEntries)
  }

  const addNewEntry = () => {
    if (safeValue.length < maxLimit) {
      const newEntry: SubjectMarkEntry = {
        subject: "",
        marks: "",
        type: ""
      }
      onChange(field.id, [...safeValue, newEntry])
    }
  }

  const removeEntry = (index: number) => {
    const updatedEntries = safeValue.filter((_, i) => i !== index)
    onChange(field.id, updatedEntries)
  }

  // Initialize with one empty entry if no entries exist
useEffect(() => {
  if (safeValue.length === 0) {
    const initialEntry: SubjectMarkEntry = {
      subject: "",
      marks: "",
      type: ""
    }
    onChange(field.id, [initialEntry])
  }
}, [value, field.id, onChange])

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-1 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
        <label className="text-lg font-medium text-gray-800 leading-relaxed">
          {field.question}
          {field.mandatory && <span className="text-red-500 ml-1">*</span>}
          <span className="text-sm text-gray-500 ml-2">(Max {maxLimit} subjects)</span>
        </label>
      </div>
      <div className="ml-7 space-y-4">
        {safeValue.map((entry, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            {/* Subject Selection */}
            <div className="col-span-4 relative">
              <select
                value={entry.subject}
                onChange={(e) => handleEntryChange(index, 'subject', e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none cursor-pointer transition-colors duration-200"
                required={field.mandatory && index === 0}
              >
                <option value="" className="text-gray-400">
                  Select subject
                </option>
                {subjectOptions.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value} className="text-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Marks Input */}
            <div className="col-span-3">
              <input
                type="text"
                value={entry.marks}
                onChange={(e) => handleEntryChange(index, 'marks', e.target.value)}
                placeholder="Enter marks"
                className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                required={field.mandatory && index === 0}
              />
            </div>

            {/* Type Selection (Percentage/CGPA) */}
            <div className="col-span-3 relative">
              <select
                value={entry.type}
                onChange={(e) => handleEntryChange(index, 'type', e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none cursor-pointer transition-colors duration-200"
                required={field.mandatory && index === 0}
              >
                <option value="" className="text-gray-400">
                  Type
                </option>
                {typeOptions.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value} className="text-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Remove Button */}
            <div className="col-span-2 flex justify-center">
              {safeValue.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Remove this subject"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add New Entry Button */}
        {safeValue.length < maxLimit && (
          <div className="flex justify-start">
            <button
              type="button"
              onClick={addNewEntry}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 border-2 border-dashed border-blue-300 hover:border-blue-500"
            >
              <Plus size={20} />
              <span>Add another subject</span>
            </button>
          </div>
        )}

        {safeValue.length >= maxLimit && (
          <div className="text-sm text-gray-500 italic">
            Maximum limit of {maxLimit} subjects reached
          </div>
        )}
      </div>
    </div>
  )
}

export default SubjectMarksInput