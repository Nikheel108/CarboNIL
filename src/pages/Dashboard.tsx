import { Card } from "@/components/ui/card";
import { TrendingDown, Zap, Award, Calculator, BookOpen, Target, Trophy, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { CarbonFootprintChart } from "@/components/CarbonFootprintChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Today", value: "2.4", unit: "kg CO₂", trend: -12, icon: Leaf },
    { label: "This Week", value: "18.5", unit: "kg CO₂", trend: -8, icon: TrendingDown },
    { label: "This Month", value: "76", unit: "kg CO₂", trend: -15, icon: Zap },
    { label: "Points", value: "420", unit: "pts", trend: 25, icon: Award },
  ];

  const quickActions = [
    { icon: Calculator, label: "Calculator", path: "/calculator", color: "text-primary" },
    { icon: BookOpen, label: "Learn", path: "/learn", color: "text-blue-600 dark:text-blue-400" },
    { icon: Target, label: "Challenges", path: "/challenges", color: "text-success" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard", color: "text-chart-4" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 sm:p-8 rounded-lg shadow-md relative overflow-hidden z-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Welcome back! 👋</h2>
            <h3 className="text-xl sm:text-2xl font-semibold opacity-90">Your Impact Today</h3>
            <p className="text-sm sm:text-base opacity-80 mt-2">Keep up the great work reducing emissions!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className={`text-xs font-medium ${stat.trend > 0 ? "text-success" : "text-destructive"}`}>
                    {stat.trend > 0 ? "+" : ""}{stat.trend}%
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.unit}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-4 sm:p-6 bg-primary/10 border-primary/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
            <Target className="h-5 w-5 text-primary" />
            Today's Challenge
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Use public transport or cycle for your commute today
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary rounded-full transition-all" />
            </div>
            <span className="text-xs font-medium">33%</span>
          </div>
        </Card>

        <div>
          <h3 className="font-semibold mb-3 text-base sm:text-lg">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                  onClick={() => navigate(action.path)}
                >
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.color}`} />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium">{action.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold mb-4 text-sm sm:text-base">Weekly Breakdown</h3>
          <div className="space-y-3">
            {[
              { category: "Transport", value: 45, color: "bg-chart-1" },
              { category: "Energy", value: 30, color: "bg-chart-2" },
              { category: "Food", value: 25, color: "bg-chart-3" },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">{item.category}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <CarbonFootprintChart />
      </div>
      
      <Navigation />
    </div>
  );
}
