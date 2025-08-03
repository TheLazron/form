"use client"

export type OptionType = {
  label: string
  value: string
}

interface SingleSelectProps {
    field: {
        id: string;
        type: "singleselect";
        question: string;
     options: OptionType[]
        mandatory: boolean;
    };
    value: string;
    onChange: (fieldId: string, value: string) => void;
      options: OptionType[] // ✅ Add this
}


const SingleSelect = ({ field, value, onChange }: SingleSelectProps) => (
  <div className="mb-6">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-1 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
      <label className="text-lg font-medium text-gray-800 leading-relaxed">
        {field.question}
        {field.mandatory && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>

    <div className="ml-7">
      <select
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-0 appearance-none cursor-pointer transition-colors duration-200"
        required={field.mandatory}
      >
        <option value="" className="text-gray-400">
          Please select your career aspirations
        </option>
        {field.options?.map((option, index) => (
          <option key={index} value={option.value} className="text-gray-800">
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
)

export default SingleSelect
