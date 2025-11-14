import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, TrendingDown, Target, Zap } from "lucide-react";

const onboardingSteps = [
  {
    icon: Leaf,
    title: "Track Your Impact",
    description: "Monitor your daily carbon footprint across transport, energy, and consumption",
  },
  {
    icon: TrendingDown,
    title: "Reduce Emissions",
    description: "Get personalized AI-powered tips to lower your environmental impact",
  },
  {
    icon: Target,
    title: "Set Goals",
    description: "Complete challenges, earn badges, and compete with friends",
  },
  {
    icon: Zap,
    title: "Make a Difference",
    description: "Join thousands making sustainable choices every day",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Carbonil
            </h1>
          </div>
        </div>

        <Card className="p-8 shadow-lg border-primary/10">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-float">
                <Icon className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold">{currentStepData.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-4">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-primary"
                      : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
