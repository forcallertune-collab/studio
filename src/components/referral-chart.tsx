"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { referralChartData } from "@/lib/data"

const chartConfig = {
  earnings: {
    label: "Earnings (₹)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ReferralChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <ResponsiveContainer>
        <BarChart data={referralChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="referrals"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value, name, item) => (
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">{item.payload.referrals} Referrals</span>
                        <span className="font-bold">₹{value}</span>
                    </div>
                )}
            />}
            />
          <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
