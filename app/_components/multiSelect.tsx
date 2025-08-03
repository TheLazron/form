"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface MultiSelectOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface MultiSelectProps {
  field: {
    id: string
    question: string
    mandatory?: boolean
    placeholder?: string
  }
  options: MultiSelectOption[]
  value?: string[]
  onChange: (fieldId: string, value: string[]) => void
  maxCount?: number
  animation?: boolean
  className?: string
}

const MultiSelectAdvanced = ({
  field,
  options,
  value = [],
  onChange,
  maxCount = 3,
  animation = false,
  className = "",
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Update internal state when prop changes
  useEffect(() => {
    setSelectedValues(value)
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleValueChange = (newValues: string[]) => {
    setSelectedValues(newValues)
    onChange(field.id, newValues)
  }

  const toggleOption = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue]
    handleValueChange(newValues)
  }

  const removeOption = (optionValue: string) => {
    const newValues = selectedValues.filter((v) => v !== optionValue)
    handleValueChange(newValues)
  }

  const handleClear = () => {
    handleValueChange([])
  }

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleValueChange([])
    } else {
      handleValueChange(options.map((opt) => opt.value))
    }
  }

  const clearExtraOptions = () => {
    const newValues = selectedValues.slice(0, maxCount)
    handleValueChange(newValues)
  }

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const displayedValues = selectedValues.slice(0, maxCount)
  const extraCount = selectedValues.length - maxCount

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && searchTerm === "" && selectedValues.length > 0) {
      removeOption(selectedValues[selectedValues.length - 1])
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-1 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
        <label className="text-lg font-medium text-gray-800 leading-relaxed">
          {field.question}
          {field.mandatory && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      <div className="ml-7 relative" ref={dropdownRef}>
        {/* Main trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-3 border-2 border-blue-300 rounded-xl bg-white text-left focus:outline-none focus:border-blue-500 transition-colors duration-200 ${className}`}
        >
          <div className="flex items-center justify-between min-h-[24px]">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {selectedValues.length === 0 ? (
                <span className="text-gray-400">{field.placeholder || "Select multiple options"}</span>
              ) : (
                <>
                  {displayedValues.map((value) => {
                    const option = options.find((o) => o.value === value)
                    const IconComponent = option?.icon
                    return (
                      <div
                        key={value}
                        className={`inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium ${
                          animation && isAnimating ? "animate-bounce" : ""
                        }`}
                      >
                        {IconComponent && <IconComponent className="w-3 h-3" />}
                        <span>{option?.label}</span>
  <span
  role="button"
  tabIndex={0}
  onClick={(e) => {
    e.stopPropagation()
    removeOption(value)
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      removeOption(value)
    }
  }}
  className="hover:bg-blue-200 rounded-full p-1 transition-colors duration-200 cursor-pointer"
>
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</span>

                      </div>
                    )
                  })}
                  {extraCount > 0 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      <span>+{extraCount} more</span>
 <span
  role="button"
  tabIndex={0}
  onClick={(e) => {
    e.stopPropagation()
    clearExtraOptions()
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      clearExtraOptions()
    }
  }}
  className="hover:bg-gray-200 rounded-full p-1 transition-colors duration-200 cursor-pointer"
>
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</span>

                    </div>
                  )}
                </>
              )}
            </div>

      <div className="flex items-center gap-2 ml-2">
  {selectedValues.length > 0 && (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()
        handleClear()
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClear()
        }
      }}
      className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 cursor-pointer"
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  )}
  <div className="w-px h-6 bg-gray-300"></div>
  <svg
    className={`w-5 h-5 text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>

          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border-2 border-blue-300 rounded-xl shadow-lg max-h-80 overflow-hidden">
            {/* Search input */}
            <div className="p-3 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {/* Select All option */}
              <button
                type="button"
                onClick={toggleAll}
                className="w-full p-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-200 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 border-2 border-blue-500 rounded flex items-center justify-center ${
                      selectedValues.length === options.length ? "bg-blue-500" : ""
                    }`}
                  >
                    {selectedValues.length === options.length && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">(Select All)</span>
                </div>
              </button>

              {/* Individual options */}
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">No options found</div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleOption(option.value)}
                      className="w-full p-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border-2 border-blue-500 rounded flex items-center justify-center ${
                            isSelected ? "bg-blue-500" : ""
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {IconComponent && <IconComponent className="w-4 h-4 text-gray-500" />}
                        <span className="text-sm text-gray-800">{option.label}</span>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer actions */}
            <div className="border-t border-gray-200 p-2 flex">
              {selectedValues.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
                  >
                    Clear
                  </button>
                  <div className="w-px bg-gray-300 mx-1"></div>
                </>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Animation toggle */}
        {animation && selectedValues.length > 0 && (
          <button
            type="button"
            onClick={() => setIsAnimating(!isAnimating)}
            className={`mt-2 p-1 rounded transition-colors duration-200 ${
              isAnimating ? "text-blue-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default MultiSelectAdvanced
