import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingDown, Target, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-accent/5 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="space-y-4 animate-float">
          <div className="flex items-center justify-center gap-3">
            <Leaf className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              Carbonil
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-md">
            Track, reduce, and offset your carbon footprint with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg">
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingDown className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Track</p>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <p className="text-sm font-medium">AI Coach</p>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <Target className="h-8 w-8 text-success" />
            </div>
            <p className="text-sm font-medium">Achieve</p>
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate("/onboarding")}
          className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground">
          Join thousands making a difference 🌍
        </p>
      </div>

      <footer className="p-6 text-center text-xs text-muted-foreground border-t">
        <p>© 2025 Carbonil. Making sustainability simple.</p>
      </footer>
    </div>
  );
};

export default Index;
