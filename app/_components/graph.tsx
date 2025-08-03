"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const DataGraph = () => {

    const chartConfig = {
  apples: {
    label: "Apples",
    color: "#2563eb",
  },
  bananas: {
    label: "Bananas",
    color: "#60a5fa",
  },
  pears: {
    label: "Pears",
    color: "#facc15",
  },
  pineapples: {
    label: "Pineapples",
    color: "#f59e0b",
  },
} satisfies ChartConfig

    const chartData = [
        {name: "shop1", apples: 20, bananas: 10, pears: 40, pineapples: 12},
        {name: "shop2", apples: 10, bananas: 30, pears: 20, pineapples: 72},
        {name: "shop3", apples: 60, bananas: 20, pears: 40, pineapples: 32},
        {name: "shop4", apples: 70, bananas: 15, pears: 70, pineapples: 12},


    ]

    return <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
      dataKey="name"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
    />
    <YAxis
    dataKey={"pineapples"}
     tickLine={false}
     tickMargin={10}
     axisLine={false}
     
    />
        <CartesianGrid vertical={false}/>
        <Bar dataKey="apples" fill="var(--color-apples)" radius={4} />
        <Bar dataKey="bananas" fill="var(--color-bananas)" radius={4} />
        <Bar dataKey="pears" fill="var(--color-pears)" radius={4} />
        <Bar dataKey="pineapples" fill="var(--color-pineapples)" radius={4} />
      </BarChart>
    </ChartContainer>
}

export default DataGraph;