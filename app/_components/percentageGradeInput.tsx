"use client"

export type OptionType = {
  label: string
  value: string
}

interface PercentageGradeInputProps {
  field: {
    id: string;
    type: string;
    question: string;
    mandatory: boolean;
  };
  value: {
    marks: string;
    type: string; // 'percentage' or 'cgpa'
    grade: string;
  };
  onChange: (fieldId: string, value: any) => void;
  currentGrade: number; // Current grade of the student (9, 10, 11, 12)
}

const PercentageGradeInput = ({ field, value, onChange, currentGrade }: PercentageGradeInputProps) => {
  const gradeOptions = [
    { label: `Current Grade (${currentGrade}th)`, value: `${currentGrade}th` },
    { label: `Last Grade (${currentGrade - 1}th)`, value: `${currentGrade - 1}th` },
    { label: `Last to Last Grade (${currentGrade - 2}th)`, value: `${currentGrade - 2}th` }
  ].filter(option => parseInt(option.value) > 0) // Filter out negative grades

  const typeOptions: OptionType[] = [
    { label: "Percentage", value: "percentage" },
    { label: "CGPA", value: "cgpa" }
  ]

  const handleChange = (key: string, newValue: string) => {
    const updatedValue = {
      ...value,
      [key]: newValue
    }
    onChange(field.id, updatedValue)
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
      <div className="ml-7">
        <div className="grid grid-cols-3 gap-4">
          {/* Marks Input */}
          <div>
            <input
              type="text"
              value={value?.marks || ""}
              onChange={(e) => handleChange('marks', e.target.value)}
              placeholder="Enter marks"
              className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors duration-200"
              required={field.mandatory}
            />
          </div>

          {/* Type Selection (Percentage/CGPA) */}
          <div className="relative">
            <select
              value={value?.type || ""}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none cursor-pointer transition-colors duration-200"
              required={field.mandatory}
            >
              <option value="" className="text-gray-400">
                Select type
              </option>
              {typeOptions.map((option, index) => (
                <option key={index} value={option.value} className="text-gray-800">
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

          {/* Grade Selection */}
          <div className="relative">
            <select
              value={value?.grade || ""}
              onChange={(e) => handleChange('grade', e.target.value)}
              className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none cursor-pointer transition-colors duration-200"
              required={field.mandatory}
            >
              <option value="" className="text-gray-400">
                Select grade
              </option>
              {gradeOptions.map((option, index) => (
                <option key={index} value={option.value} className="text-gray-800">
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
        </div>
      </div>
    </div>
  )
}

export default PercentageGradeInput