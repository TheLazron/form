"use client"

import { ArrowLeft } from "lucide-react"
import { useState } from "react"

// Dummy imports for form components
import TextInput from "./textInput"
import SingleSelect from "./singleSelect"
import MultiSelect from "./multiSelect"
import SubjectMarksInput from "./subjectMarksInput"
import PercentageGradeInput from "./percentageGradeInput"

// Subject mappings based on class and stream
const subjectMappings: any = {
  "9th-10th": [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Civics", value: "Civics" },
    { label: "History", value: "History" },
    { label: "Geography", value: "Geography" },
    { label: "Economics", value: "Economics" },
    { label: "Art", value: "Art" }
  ],
  "11th-12th": {
    "Any Sciences (PCMB)": [
      { label: "Mathematics", value: "Mathematics" },
      { label: "Physics", value: "Physics" },
      { label: "Chemistry", value: "Chemistry" },
      { label: "Biology", value: "Biology" },
      { label: "Computer Science/IP", value: "Computer Science/IP" },
      { label: "English", value: "English" }
    ],
    "PCM": [
      { label: "Mathematics", value: "Mathematics" },
      { label: "Physics", value: "Physics" },
      { label: "Chemistry", value: "Chemistry" },
      { label: "Computer Science/IP", value: "Computer Science/IP" },
      { label: "English", value: "English" }
    ],
    "PCB": [
      { label: "Physics", value: "Physics" },
      { label: "Chemistry", value: "Chemistry" },
      { label: "Biology", value: "Biology" },
      { label: "Computer Science/IP", value: "Computer Science/IP" },
      { label: "English", value: "English" },
      { label: "Psychology", value: "Psychology" }
    ],
    "Commerce with maths": [
      { label: "Mathematics", value: "Mathematics" },
      { label: "Economics", value: "Economics" },
      { label: "Business Studies", value: "Business Studies" },
      { label: "Accounts", value: "Accounts" },
      { label: "English", value: "English" },
      { label: "Computer Science/IP", value: "Computer Science/IP" },
      { label: "Physical Education", value: "Physical Education" }
    ],
    "Commerce without maths": [
      { label: "Economics", value: "Economics" },
      { label: "Business Studies", value: "Business Studies" },
      { label: "Accounts", value: "Accounts" },
      { label: "English", value: "English" },
      { label: "Computer Science/IP", value: "Computer Science/IP" },
      { label: "Physical Education", value: "Physical Education" }
    ],
    "Arts with Maths": [
      { label: "Mathematics", value: "Mathematics" },
      { label: "History", value: "History" },
      { label: "Geography", value: "Geography" },
      { label: "Political Science", value: "Political Science" },
      { label: "Economics", value: "Economics" },
      { label: "English", value: "English" },
      { label: "Sociology", value: "Sociology" },
      { label: "Psychology", value: "Psychology" },
      { label: "Physical Education", value: "Physical Education" },
      { label: "Home Science", value: "Home Science" },
      { label: "Fine Arts", value: "Fine Arts" },
      { label: "Legal Studies", value: "Legal Studies" },
      { label: "Fashion Studies", value: "Fashion Studies" }
    ],
    "Arts without Maths": [
      { label: "History", value: "History" },
      { label: "Geography", value: "Geography" },
      { label: "Political Science", value: "Political Science" },
      { label: "Economics", value: "Economics" },
      { label: "English", value: "English" },
      { label: "Sociology", value: "Sociology" },
      { label: "Psychology", value: "Psychology" },
      { label: "Physical Education", value: "Physical Education" },
      { label: "Home Science", value: "Home Science" },
      { label: "Fine Arts", value: "Fine Arts" },
      { label: "Legal Studies", value: "Legal Studies" },
      { label: "Fashion Studies", value: "Fashion Studies" }
    ]
  }
}

// Career options
const careerOptions: any = [
  { label: "Engineer", value: "Engineer" },
  { label: "Doctor", value: "Doctor" },
  { label: "Teacher", value: "Teacher" },
  { label: "Lawyer", value: "Lawyer" },
  { label: "Business Person", value: "Business Person" },
  { label: "Scientist", value: "Scientist" },
  { label: "Artist", value: "Artist" },
  { label: "Government Officer", value: "Government Officer" },
  { label: "Chartered Accountant", value: "Chartered Accountant" },
  { label: "Software Developer", value: "Software Developer" },
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "Psychologist", value: "Psychologist" },
  { label: "Architect", value: "Architect" },
  { label: "Journalist", value: "Journalist" },
  { label: "Designer", value: "Designer" },
  { label: "Other", value: "Other" }
]

// Cities options
const cityOptions: any = [
  { label: "Delhi", value: "Delhi" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Pune", value: "Pune" },
  { label: "Chennai", value: "Chennai" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Other", value: "Other" }
]

// Form configurations for different grades
const formConfigs: any = {
  "9th-10th": {
    fields: [
      {
        id: "likedSubjects",
        type: "multiselect",
        question: "Subjects you like the most*",
        options: subjectMappings["9th-10th"],
        mandatory: true
      },
      {
        id: "dislikedSubjects",
        type: "multiselect",
        question: "Subjects you hate the most*",
        options: subjectMappings["9th-10th"],
        mandatory: true
      },
      {
        id: "preferredStream",
        type: "singleselect",
        question: "Which stream would you like to choose in class 11th?*",
        options: [
          { label: "Any Sciences (PCMB)", value: "Any Sciences (PCMB)" },
          { label: "PCM", value: "PCM" },
          { label: "PCB", value: "PCB" },
          { label: "Commerce with maths", value: "Commerce with maths" },
          { label: "Commerce without maths", value: "Commerce without maths" },
          { label: "Arts with Maths", value: "Arts with Maths" },
          { label: "Arts without Maths", value: "Arts without Maths" }
        ],
        mandatory: true
      },
      {
        id: "careerGoals",
        type: "multiselect",
        question: "What do you wish to become?*",
        options: careerOptions,
        mandatory: true
      },
      {
        id: "studyCities",
        type: "multiselect",
        question: "In which city would you like to study after 12th grade?",
        options: cityOptions,
        mandatory: false
      },
      {
        id: "careerQuestions",
        type: "multiselect",
        question: "What are your key career questions?",
        options: [
          { label: "What career options are suitable for me?", value: "career_options" },
          { label: "I took a career assessment/test. Can you help me understand my report?", value: "assessment_help" },
          { label: "What subjects do I choose for my high school education?", value: "subject_choice" },
          { label: "What are the career options with the available streams?", value: "stream_careers" },
          { label: "What are some new and upcoming careers that will be in demand in the future?", value: "future_careers" },
          { label: "What does a [Data Scientist / Architect / Lawyer / Psychologist] actually do all day?", value: "job_description" },
          { label: "What do I need to do after 12th grade to get into my chosen field?", value: "pathway_guidance" },
          { label: "Other (Specify)", value: "other" }
        ],
        mandatory: false
      },
      {
  id: "overallPercentage",
  type: "percentage_grade",
  question: "Enter your overall percentage*",
  mandatory: true
},
{
  id: "subjectWiseMarks",
  type: "subject_marks",
  question: "Subject wise marks",
  mandatory: false
}
      // {
      //   id: "overallPercentage",
      //   type: "text",
      //   question: "Enter your overall percentage*",
      //   placeholder: "Enter your percentage/CGPA",
      //   mandatory: true
      // },
      // {
      //   id: "subjectWiseMarks",
      //   type: "text",
      //   question: "Subject wise marks",
      //   placeholder: "Enter subject-wise marks (optional)",
      //   mandatory: false
      // }
    ]
  },
  "11th-12th": {
    fields: [
      {
        id: "currentStream",
        type: "singleselect",
        question: "Please select your stream?*",
        options: [
          { label: "Any Sciences (PCMB)", value: "Any Sciences (PCMB)" },
          { label: "PCM", value: "PCM" },
          { label: "PCB", value: "PCB" },
          { label: "Commerce with maths", value: "Commerce with maths" },
          { label: "Commerce without maths", value: "Commerce without maths" },
          { label: "Arts with Maths", value: "Arts with Maths" },
          { label: "Arts without Maths", value: "Arts without Maths" }
        ],
        mandatory: true
      },
      {
        id: "likedSubjects",
        type: "multiselect",
        question: "Subjects you like the most*",
        options: [], // Will be populated based on stream selection
        mandatory: true
      },
      {
        id: "dislikedSubjects",
        type: "multiselect",
        question: "Subjects you hate the most*",
        options: [], // Will be populated based on stream selection
        mandatory: true
      },
      {
        id: "careerGoals",
        type: "multiselect",
        question: "What do you wish to become?*",
        options: careerOptions,
        mandatory: true
      },
      {
        id: "studyCities",
        type: "multiselect",
        question: "In which city do you want to study after 12th?",
        options: cityOptions,
        mandatory: false
      },
      {
        id: "careerQuestions",
        type: "multiselect",
        question: "What are your key career questions?",
        options: [
          { label: "What career options are suitable for me?", value: "career_options" },
          { label: "I took a career assessment/test. Can you help me understand my report?", value: "assessment_help" },
          { label: "What course/college/entrance exam/scholarship options are suitable for me?", value: "course_options" },
          { label: "What are strong career paths if I don't get my target rank in JEE, NEET, or CUET?", value: "backup_paths" },
          { label: "What are some new and upcoming careers that will be in demand in the future?", value: "future_careers" },
          { label: "What does a [Data Scientist / Architect / Lawyer / Psychologist] actually do all day?", value: "job_description" },
          { label: "What do I need to do after 12th grade to get into my chosen field?", value: "pathway_guidance" },
          { label: "Other (Specify)", value: "other" }
        ],
        mandatory: false
      },
      {
        id: "overallPercentage",
        type: "text",
        question: "Enter your overall percentage*",
        placeholder: "Enter your percentage/CGPA",
        mandatory: true
      },
      {
        id: "subjectWiseMarks",
        type: "text",
        question: "Subject wise marks",
        placeholder: "Enter subject-wise marks (optional)",
        mandatory: false
      }
    ]
  }
}

type FormData = { [key: string]: any }

const QuestionnaireForm = () => {
  const [grade, setGrade] = useState(9)
  const [formData, setFormData] = useState<FormData>({})

  // Determine if it's junior (9th-10th) or senior (11th-12th)
  const isJunior = grade === 9 || grade === 10
  const currentConfig = isJunior ? formConfigs["9th-10th"] : formConfigs["11th-12th"]

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  // Update subject options based on stream selection for 11th-12th
  const getUpdatedConfig = () => {
    if (isJunior) return currentConfig

    const config = { ...currentConfig }
    const selectedStream = formData.currentStream
    
    if (selectedStream && subjectMappings["11th-12th"][selectedStream]) {
      const streamSubjects = subjectMappings["11th-12th"][selectedStream]
      
      config.fields = config.fields.map((field: any) => {
        if (field.id === "likedSubjects" || field.id === "dislikedSubjects") {
          return { ...field, options: streamSubjects }
        }
        return field
      })
    }
    
    return config
  }

  const renderField = (field: any) => {
    const commonProps = {
      field,
      value: formData[field.id] || "",
      onChange: handleFieldChange
    }

    switch (field.type) {
      case "text":
        return <TextInput key={field.id} {...commonProps} />
      case "singleselect":
        return <SingleSelect key={field.id} {...commonProps} options={field.options} />
      case "multiselect":
        return <MultiSelect key={field.id} {...commonProps} options={field.options} />
      case "percentage_grade":
        return <PercentageGradeInput key={field.id} {...commonProps} currentGrade={grade} />
      case "subject_marks":
        return <SubjectMarksInput key={field.id} {...commonProps} subjectOptions={subjectMappings["11th-12th"][formData.currentStream] || []} />
      default:
        return null
    }
  }

  const updatedConfig = getUpdatedConfig()

  return (
    <div className="w-1/2 mx-auto relative">
      <div className="bg-blue-100 w-full py-8 px-8 line-clamp-3 rounded-b-2xl shadow-[0_8px_0_0_rgba(30,64,175,1)] shadow-[#60abe2] z-30">
        <div className="flex items-start gap-2">
          <div className="flex items-center">
            <button className="mt-1">
              <ArrowLeft className="text-blue-600 hover:text-blue-800 transition-colors" />
            </button>
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-2">
              We'd like to know more about you!
            </h1>
            <p>To give you a better counselling experience we need a few more details</p>
          </div>
        </div>
      </div>
      
      {/* Grade Selection */}
      <div className="w-11/12 mx-auto p-4 bg-white mt-2 rounded">
        <label className="block text-sm font-medium mb-2">Select your current grade:</label>
        <select 
          value={grade} 
          onChange={(e) => setGrade(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value={9}>9th Grade</option>
          <option value={10}>10th Grade</option>
          <option value={11}>11th Grade</option>
          <option value={12}>12th Grade</option>
        </select>
      </div>

      <div className="w-11/12 mx-auto h-fit p-12 bg-blue-100 z-0 space-y-4 mt-2">
        {updatedConfig.fields.map((field: any) => renderField(field))}
      </div>
    </div>
  )
}

export default QuestionnaireForm