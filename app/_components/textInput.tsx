"use client"

interface TextInputProps {
    field: {
        id: string;
        type: "singleselect";
        question: string;
        options: string[];
        mandatory: boolean;
        placeholder?: string;
    };
    value: string;
    onChange: (fieldId: string, value: string) => void;
}

const TextInput = ({ field, value, onChange }: TextInputProps ) => (
  <div className="mb-6">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-1 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
      <label className="text-lg font-medium text-gray-800 leading-relaxed">
        {field.question}
        {field.mandatory && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>

    <div className="ml-7">
      <input
        type={field.type || "text"}
        value={value}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={field.placeholder || "Enter your response"}
        className="w-full p-4 border-2 border-blue-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors duration-200"
        required={field.mandatory}
      />
    </div>
  </div>
)

export default TextInput