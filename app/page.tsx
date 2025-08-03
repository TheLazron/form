import Image from "next/image";
import DataGraph from "./_components/graph";
import QuestionnaireForm from "./_components/form";

export default function Home() {
  return <div className="h-full w-full flex justify-center items-center">
   <QuestionnaireForm/>
  </div>
}
