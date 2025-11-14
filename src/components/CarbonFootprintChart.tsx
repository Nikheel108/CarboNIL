import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dailyData = [
  { date: "Mon", transport: 2.4, energy: 1.8, food: 1.2, total: 5.4 },
  { date: "Tue", transport: 1.8, energy: 2.1, food: 1.5, total: 5.4 },
  { date: "Wed", transport: 3.2, energy: 1.9, food: 1.3, total: 6.4 },
  { date: "Thu", transport: 2.1, energy: 2.3, food: 1.8, total: 6.2 },
  { date: "Fri", transport: 1.5, energy: 2.0, food: 1.4, total: 4.9 },
  { date: "Sat", transport: 0.8, energy: 1.5, food: 2.1, total: 4.4 },
  { date: "Sun", transport: 0.6, energy: 1.6, food: 1.9, total: 4.1 },
];

const weeklyData = [
  { week: "Week 1", transport: 12.5, energy: 10.2, food: 8.5, total: 31.2 },
  { week: "Week 2", transport: 14.2, energy: 11.5, food: 9.2, total: 34.9 },
  { week: "Week 3", transport: 11.8, energy: 10.8, food: 8.8, total: 31.4 },
  { week: "Week 4", transport: 13.5, energy: 12.1, food: 9.5, total: 35.1 },
];

const monthlyData = [
  { month: "Jan", transport: 52, energy: 45, food: 38, total: 135 },
  { month: "Feb", transport: 48, energy: 42, food: 35, total: 125 },
  { month: "Mar", transport: 55, energy: 48, food: 40, total: 143 },
  { month: "Apr", transport: 45, energy: 40, food: 36, total: 121 },
  { month: "May", transport: 50, energy: 44, food: 38, total: 132 },
  { month: "Jun", transport: 42, energy: 38, food: 34, total: 114 },
];

export function CarbonFootprintChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4 text-lg">Carbon Footprint Analysis</h3>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="transport" 
                  stackId="1"
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  name="Transport"
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stackId="1"
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))" 
                  name="Energy"
                />
                <Area 
                  type="monotone" 
                  dataKey="food" 
                  stackId="1"
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))" 
                  name="Food"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Avg Daily</p>
              <p className="text-lg font-bold">5.3 kg CO₂</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lowest</p>
              <p className="text-lg font-bold text-success">4.1 kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Highest</p>
              <p className="text-lg font-bold text-destructive">6.4 kg</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="week" 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="transport" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Transport"
                  dot={{ fill: 'hsl(var(--chart-1))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Energy"
                  dot={{ fill: 'hsl(var(--chart-2))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="food" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  name="Food"
                  dot={{ fill: 'hsl(var(--chart-3))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Avg Weekly</p>
              <p className="text-lg font-bold">33.2 kg CO₂</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best Week</p>
              <p className="text-lg font-bold text-success">31.2 kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trend</p>
              <p className="text-lg font-bold text-success">↓ 2%</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  className="text-xs"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="transport" 
                  stackId="1"
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  name="Transport"
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stackId="1"
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))" 
                  name="Energy"
                />
                <Area 
                  type="monotone" 
                  dataKey="food" 
                  stackId="1"
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))" 
                  name="Food"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Avg Monthly</p>
              <p className="text-lg font-bold">128.3 kg CO₂</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best Month</p>
              <p className="text-lg font-bold text-success">114 kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">6-Mo Trend</p>
              <p className="text-lg font-bold text-success">↓ 8%</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
