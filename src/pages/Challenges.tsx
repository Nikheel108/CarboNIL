import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Award, CheckCircle2, Clock, Plus, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { useNotifications } from "@/contexts/NotificationContext";

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  points: number;
  status: "active" | "completed";
  deadline: string;
  category: "transport" | "energy" | "food" | "waste";
}

export default function Challenges() {
  const { addNotification } = useNotifications();
  
  // Load challenges from localStorage
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('challenges');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default challenges
    return [
      {
        id: 1,
        title: "Green Commuter",
        description: "Use public transport or cycle for 5 days",
        progress: 0,
        total: 5,
        points: 50,
        status: "active" as const,
        deadline: "7 days left",
        category: "transport" as const,
      },
      {
        id: 2,
        title: "Energy Saver",
        description: "Reduce electricity by 20% this week",
        progress: 0,
        total: 20,
        points: 75,
        status: "active" as const,
        deadline: "7 days left",
        category: "energy" as const,
      },
      {
        id: 3,
        title: "Meatless Week",
        description: "Go vegetarian for 7 days",
        progress: 0,
        total: 7,
        points: 60,
        status: "active" as const,
        deadline: "7 days left",
        category: "food" as const,
      },
      {
        id: 4,
        title: "Zero Waste Day",
        description: "Produce no single-use plastic waste for 3 days",
        progress: 0,
        total: 3,
        points: 40,
        status: "active" as const,
        deadline: "5 days left",
        category: "waste" as const,
      },
    ];
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem('totalPoints');
    return saved ? parseInt(saved) : 0;
  });

  // Save challenges to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('totalPoints', String(totalPoints));
  }, [totalPoints]);

  const handleProgressChallenge = (challengeId: number) => {
    setChallenges(prevChallenges => {
      return prevChallenges.map(challenge => {
        if (challenge.id === challengeId && challenge.status === "active") {
          const newProgress = Math.min(challenge.progress + 1, challenge.total);
          const isCompleted = newProgress === challenge.total;
          
          if (isCompleted && challenge.status === "active") {
            // Challenge just completed
            setTotalPoints(prev => prev + challenge.points);
            addNotification(
              "Challenge Completed! 🎉",
              `You've earned ${challenge.points} points for completing "${challenge.title}"!`,
              "challenge"
            );
            
            return {
              ...challenge,
              progress: newProgress,
              status: "completed" as const,
              deadline: "Completed!",
            };
          }
          
          return {
            ...challenge,
            progress: newProgress,
          };
        }
        return challenge;
      });
    });
  };

  const handleResetChallenge = (challengeId: number) => {
    setChallenges(prevChallenges => {
      return prevChallenges.map(challenge => {
        if (challenge.id === challengeId && challenge.status === "completed") {
          return {
            ...challenge,
            progress: 0,
            status: "active" as const,
            deadline: "7 days left",
          };
        }
        return challenge;
      });
    });
  };

  const activeChallenges = challenges.filter(c => c.status === "active");
  const completedChallenges = challenges.filter(c => c.status === "completed");

  const getCategoryColor = (category: string) => {
    const colors = {
      transport: "from-blue-500 to-cyan-500",
      energy: "from-yellow-500 to-orange-500",
      food: "from-green-500 to-emerald-500",
      waste: "from-purple-500 to-pink-500",
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      transport: "🚌",
      energy: "⚡",
      food: "🥗",
      waste: "♻️",
    };
    return icons[category as keyof typeof icons] || "🎯";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-5 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-500/20 rounded-lg">
                <Target className="h-6 w-6 sm:h-7 sm:w-7 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Sustainability Challenges</h2>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-3 py-2 rounded-lg">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-bold text-foreground">{totalPoints} pts</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-foreground/80 font-medium">Complete challenges to earn points and make a real impact! �</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{activeChallenges.length}</p>
            <p className="text-xs sm:text-sm text-foreground/70 font-medium">Active</p>
          </Card>
          <Card className="p-4 text-center bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{completedChallenges.length}</p>
            <p className="text-xs sm:text-sm text-foreground/70 font-medium">Completed</p>
          </Card>
          <Card className="p-4 text-center bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{totalPoints}</p>
            <p className="text-xs sm:text-sm text-foreground/70 font-medium">Points</p>
          </Card>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Active Challenges
            </h3>
            {activeChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-4 sm:p-5 hover:shadow-lg transition-shadow border-l-4"
                style={{ borderLeftColor: `hsl(var(--primary))` }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xl">{getCategoryIcon(challenge.category)}</span>
                        <h3 className="font-bold text-base sm:text-lg">{challenge.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2 shrink-0 font-bold">
                      <Award className="h-3 w-3 mr-1" />
                      {challenge.points}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold">
                        {challenge.progress}/{challenge.total} completed
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {challenge.deadline}
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleProgressChallenge(challenge.id)}
                      disabled={challenge.progress >= challenge.total}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Progress
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              Completed Challenges
            </h3>
            {completedChallenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-4 sm:p-5 border-success/50 bg-success/5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xl">{getCategoryIcon(challenge.category)}</span>
                        <h3 className="font-bold text-base sm:text-lg">{challenge.title}</h3>
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2 shrink-0 bg-green-600 text-white font-bold">
                      <Award className="h-3 w-3 mr-1" />
                      +{challenge.points}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-success">
                        ✓ {challenge.total}/{challenge.total} completed
                      </span>
                      <span className="font-semibold text-success">
                        {challenge.deadline}
                      </span>
                    </div>
                    <div className="h-3 bg-success/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleResetChallenge(challenge.id)}
                  >
                    Restart Challenge
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Motivational Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/20 rounded-full">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="font-bold text-lg sm:text-xl text-foreground">Keep Going! 💪</h3>
          <p className="text-sm sm:text-base text-foreground/80">
            Every challenge you complete makes a real difference for our planet. 
            {activeChallenges.length > 0 
              ? ` You have ${activeChallenges.length} active challenge${activeChallenges.length > 1 ? 's' : ''} to complete!`
              : " Great job on completing all challenges!"}
          </p>
          {completedChallenges.length > 0 && (
            <p className="text-2xl font-bold text-primary">
              You've saved an estimated {completedChallenges.length * 15}+ kg CO₂! 🌱
            </p>
          )}
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
}
