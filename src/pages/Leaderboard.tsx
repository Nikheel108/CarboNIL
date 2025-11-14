import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

export default function Leaderboard() {
  const navigate = useNavigate();

  const leaders = [
    { rank: 1, name: "Priya S.", points: 1520, trend: "+12%", icon: Trophy, color: "text-chart-4" },
    { rank: 2, name: "Arjun M.", points: 1380, trend: "+8%", icon: Medal, color: "text-muted-foreground" },
    { rank: 3, name: "Kavya R.", points: 1250, trend: "+15%", icon: Award, color: "text-chart-5" },
    { rank: 4, name: "You", points: 420, trend: "+25%", icon: null, color: "text-primary", highlight: true },
    { rank: 5, name: "Rohan K.", points: 380, trend: "+5%", icon: null, color: "" },
    { rank: 6, name: "Anjali P.", points: 360, trend: "+10%", icon: null, color: "" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 p-5 sm:p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-yellow-500/20 rounded-lg">
              <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Leaderboard</h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/80 font-medium">See how you rank against other eco-warriors! 🌍</p>
        </div>

        {leaders.map((leader) => {
          const Icon = leader.icon;
          return (
            <Card
              key={leader.rank}
              className={`p-3 sm:p-4 ${
                leader.highlight
                  ? "border-primary bg-primary/5 shadow-md"
                  : "hover:shadow-md transition-shadow"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center w-10 h-10 shrink-0">
                  {Icon ? (
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${leader.color}`} />
                  ) : (
                    <span className={`text-lg sm:text-xl font-bold ${leader.highlight ? "text-primary" : "text-muted-foreground"}`}>
                      {leader.rank}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm sm:text-base truncate">{leader.name}</span>
                    {leader.highlight && (
                      <Badge variant="secondary" className="text-xs shrink-0">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 shrink-0" />
                    <span className="truncate">{leader.trend} this week</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base sm:text-lg font-bold text-primary">{leader.points}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </Card>
          );
        })}

        <Card className="p-4 sm:p-6 bg-primary/10 border-primary/20 text-center">
          <Trophy className="h-8 sm:h-10 w-8 sm:w-10 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm sm:text-base mb-2">Keep Going!</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            Complete more challenges to climb the leaderboard
          </p>
          <Button onClick={() => navigate("/challenges")} className="w-full sm:w-auto">
            View Challenges
          </Button>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
}
