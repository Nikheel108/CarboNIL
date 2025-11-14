import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Car, 
  Zap, 
  Utensils, 
  ShoppingBag, 
  MapPin,
  Globe,
  Award,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Trees,
  Factory,
  Bike,
  Leaf,
  Recycle,
  Star,
  TrendingUp
} from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

interface LearningModule {
  id: number;
  title: string;
  icon: any;
  subtopics: string[];
  completed: boolean;
  color: string;
}

export default function Learn() {
  const navigate = useNavigate();
  
  // Load progress from localStorage
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedModules');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [quizCompleted, setQuizCompleted] = useState<boolean>(() => {
    const saved = localStorage.getItem('quizCompleted');
    return saved === 'true';
  });
  
  const [tipsViewed, setTipsViewed] = useState<boolean>(() => {
    const saved = localStorage.getItem('tipsViewed');
    return saved === 'true';
  });
  
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('quizCompleted', String(quizCompleted));
  }, [quizCompleted]);

  useEffect(() => {
    localStorage.setItem('tipsViewed', String(tipsViewed));
  }, [tipsViewed]);

  // Mark tips as viewed when user scrolls to them
  useEffect(() => {
    const handleScroll = () => {
      const tipsSection = document.getElementById('tips-section');
      if (tipsSection && !tipsViewed) {
        const rect = tipsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setTipsViewed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tipsViewed]);

  const levels = [
    { name: "Beginner", min: 0, max: 20, icon: "🌱" },
    { name: "Curious", min: 20, max: 40, icon: "🔍" },
    { name: "Aware", min: 40, max: 60, icon: "💡" },
    { name: "Green Thinker", min: 60, max: 80, icon: "🌿" },
    { name: "Climate Champion", min: 80, max: 100, icon: "🏆" },
  ];

  // Calculate progress based on different activities
  const calculateProgress = () => {
    let totalProgress = 0;
    
    // Reading intro card: 15%
    totalProgress += 15;
    
    // Reading formula breakdown: 20%
    totalProgress += 20;
    
    // Viewing tips section: 25%
    if (tipsViewed) totalProgress += 25;
    
    // Completing quiz: 40%
    if (quizCompleted) totalProgress += 40;
    
    return Math.min(totalProgress, 100);
  };

  const progress = calculateProgress();
  const currentLevel = levels.find(l => progress >= l.min && progress < l.max) || levels[levels.length - 1];

  const modules: LearningModule[] = [
    {
      id: 1,
      title: "What is Carbon Footprint?",
      icon: Globe,
      subtopics: ["CO₂ basics", "Greenhouse gases", "Real-life examples"],
      completed: completedModules.includes(1),
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Travel & Transportation",
      icon: Car,
      subtopics: ["Car emissions", "Public transport", "Flying impact"],
      completed: completedModules.includes(2),
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Energy & Electricity",
      icon: Zap,
      subtopics: ["Home power", "Appliances", "Grid mix"],
      completed: completedModules.includes(3),
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      title: "Food & Lifestyle",
      icon: Utensils,
      subtopics: ["Meat vs plant-based", "Local produce", "Food waste"],
      completed: completedModules.includes(4),
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "Shopping & Waste",
      icon: ShoppingBag,
      subtopics: ["Fast fashion", "Plastic use", "Recycling"],
      completed: completedModules.includes(5),
      color: "from-red-500 to-rose-500"
    },
    {
      id: 6,
      title: "India-Specific Facts",
      icon: MapPin,
      subtopics: ["Fuel mix", "Urban transport", "Agriculture"],
      completed: completedModules.includes(6),
      color: "from-indigo-500 to-blue-500"
    },
  ];

  const tips = [
    { icon: "🧺", text: "Switch to cold wash", saves: "1.2 kg CO₂e" },
    { icon: "🚌", text: "Use public transport once", saves: "0.9 kg CO₂e" },
    { icon: "🥤", text: "Refuse plastic cutlery", saves: "30g CO₂e" },
    { icon: "💡", text: "Use LED bulbs", saves: "0.5 kg CO₂e/day" },
    { icon: "🚴", text: "Bike instead of drive", saves: "1.5 kg CO₂e" },
    { icon: "🌱", text: "Eat plant-based meal", saves: "2.5 kg CO₂e" },
  ];

  const quizQuestions = [
    {
      question: "Which transport mode has the lowest emissions?",
      options: ["Car", "Bus", "Train", "Bike"],
      correct: 3
    },
    {
      question: "What percentage of household emissions come from food?",
      options: ["10%", "25%", "50%", "75%"],
      correct: 1
    },
    {
      question: "LED bulbs use how much less energy than traditional bulbs?",
      options: ["25%", "50%", "75%", "90%"],
      correct: 2
    }
  ];

  const handleCompleteModule = (id: number) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
    }
    setSelectedModule(null);
  };

  const handleQuizAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed! Mark it as done
        setQuizCompleted(true);
        setShowQuiz(false);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setQuizScore(0);
      }
    }, 1500);
  };

  const getModuleContent = (id: number) => {
    const content: Record<number, any> = {
      1: {
        intro: "A carbon footprint is the total amount of greenhouse gases released because of our actions — like traveling, using electricity, eating food, or buying products. 🌍",
        points: [
          { icon: Factory, text: "CO₂ and methane are the main greenhouse gases" },
          { icon: Trees, text: "They trap heat in Earth's atmosphere" },
          { icon: Globe, text: "Every action has a carbon cost" }
        ]
      },
      2: {
        intro: "Transportation is one of the biggest sources of carbon emissions. Different modes have very different impacts! 🚗",
        points: [
          { icon: Car, text: "Cars: 0.192 kg CO₂ per km (petrol)" },
          { icon: Bike, text: "Bikes: 0 kg CO₂ per km" },
          { icon: Car, text: "Trains: 0.041 kg CO₂ per km" }
        ]
      },
      3: {
        intro: "The electricity we use comes from different sources. In India, most still comes from coal, which produces CO₂. ⚡",
        points: [
          { icon: Zap, text: "1 kWh in India = 0.708 kg CO₂" },
          { icon: Lightbulb, text: "LED bulbs use 75% less energy" },
          { icon: Leaf, text: "Solar panels produce zero emissions" }
        ]
      },
      4: {
        intro: "What we eat has a huge impact on the planet. Animal products generally have higher emissions than plants. 🍽️",
        points: [
          { icon: Utensils, text: "Beef: 7.19 kg CO₂ per serving" },
          { icon: Leaf, text: "Vegetables: 0.39 kg CO₂ per serving" },
          { icon: TrendingUp, text: "Going plant-based saves 96% emissions!" }
        ]
      },
      5: {
        intro: "Every product we buy has a hidden carbon cost from manufacturing, packaging, and shipping. 🛍️",
        points: [
          { icon: ShoppingBag, text: "Fast fashion creates 10% of global emissions" },
          { icon: Recycle, text: "Recycling saves energy and reduces waste" },
          { icon: Leaf, text: "Buying local reduces transport emissions" }
        ]
      },
      6: {
        intro: "India faces unique climate challenges. Understanding local context helps make better choices. 🇮🇳",
        points: [
          { icon: MapPin, text: "70% of India's power is from coal" },
          { icon: Car, text: "Delhi has world's highest traffic emissions" },
          { icon: Trees, text: "Agriculture creates 18% of India's emissions" }
        ]
      }
    };
    return content[id];
  };

  if (selectedModule) {
    const module = modules.find(m => m.id === selectedModule)!;
    const content = getModuleContent(selectedModule);
    const Icon = module.icon;

    return (
      <div className="min-h-screen bg-background pb-24">
        <Header />
        <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => setSelectedModule(null)} className="mb-4">
            ← Back to Modules
          </Button>

          <Card className={`p-6 sm:p-8 bg-gradient-to-br ${module.color} text-white`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">{module.title}</h2>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-3">
              <Globe className="h-6 w-6 text-primary shrink-0 mt-1" />
              <p className="text-base sm:text-lg leading-relaxed text-foreground">{content.intro}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Key Points:</h3>
              {content.points.map((point: any, idx: number) => {
                const PointIcon = point.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <PointIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-foreground font-medium">{point.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => handleCompleteModule(selectedModule)}
                className="flex-1"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowQuiz(true)}
              >
                <Star className="h-4 w-4 mr-2" />
                Take Quiz
              </Button>
            </div>
          </Card>
        </div>
        <Navigation />
      </div>
    );
  }

  if (showQuiz) {
    const question = quizQuestions[currentQuestion];
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header />
        <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">Quiz Time! 🎯</h3>
              <Badge variant="secondary">Question {currentQuestion + 1}/{quizQuestions.length}</Badge>
            </div>

            <p className="text-base sm:text-lg text-foreground font-medium">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswer === idx ? (idx === question.correct ? "default" : "destructive") : "outline"}
                  className="w-full justify-start text-left h-auto py-4"
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="text-sm sm:text-base">{option}</span>
                  {selectedAnswer === idx && idx === question.correct && <CheckCircle2 className="ml-auto h-5 w-5" />}
                </Button>
              ))}
            </div>

            {selectedAnswer !== null && selectedAnswer === question.correct && (
              <p className="text-green-600 dark:text-green-400 font-semibold">✓ Correct! Great job!</p>
            )}
            {selectedAnswer !== null && selectedAnswer !== question.correct && (
              <p className="text-red-600 dark:text-red-400 font-semibold">✗ Not quite. The correct answer is: {question.options[question.correct]}</p>
            )}
          </Card>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Learn About Carbon Footprint 🌍</h1>
          <p className="text-base sm:text-lg text-foreground/80 font-medium">Your journey to becoming a Climate Champion</p>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-bold text-foreground">Level: {currentLevel.name} {currentLevel.icon}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-foreground/70">
              {levels.map((level, idx) => (
                <span key={idx} className={progress >= level.min ? "text-green-600 dark:text-green-400 font-semibold" : ""}>
                  {level.icon}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Intro Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full shrink-0">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg sm:text-xl text-foreground">What You'll Learn</h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                A carbon footprint is the total amount of greenhouse gases released because of our actions — like traveling, using electricity, eating food, or buying products. 
                Every choice we make has an impact on our planet! 🌱
              </p>
            </div>
          </div>
        </Card>

        {/* Formula Breakdown */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">How We Calculate Your Carbon Footprint</h2>
          </div>

          <div className="space-y-6">
            {/* Transport Formula */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-foreground">🚗 TRANSPORT</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-2"><strong>Formula:</strong> CO₂e = Distance (km) × Emission Factor</p>
              <div className="space-y-1 text-sm text-foreground/80">
                <p><strong>Example:</strong></p>
                <p>• Bike (5 km) → 5 × 0 = <span className="text-green-600 dark:text-green-400 font-bold">0 kg CO₂e</span></p>
                <p>• Car (5 km) → 5 × 0.192 = <span className="text-orange-600 dark:text-orange-400 font-bold">0.96 kg CO₂e</span></p>
                <p className="text-green-600 dark:text-green-400 font-semibold mt-2">💡 Biking saved 0.96 kg CO₂e today!</p>
              </div>
            </div>

            {/* Energy Formula */}
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-bold text-foreground">⚡ ELECTRICITY</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-2"><strong>Formula:</strong> CO₂e = Units (kWh) × Grid Factor</p>
              <div className="space-y-1 text-sm text-foreground/80">
                <p><strong>Example (India avg):</strong></p>
                <p>4 kWh × 0.708 = <span className="text-orange-600 dark:text-orange-400 font-bold">2.832 kg CO₂e</span></p>
              </div>
            </div>

            {/* Food Formula */}
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-foreground">🍽 FOOD</h3>
              </div>
              <p className="text-sm text-foreground/80 mb-2"><strong>Formula:</strong> CO₂e = Quantity × Food Factor</p>
              <div className="space-y-1 text-sm text-foreground/80">
                <p><strong>Example:</strong></p>
                <p>• Chicken (1 serving) → <span className="text-orange-600 dark:text-orange-400 font-bold">0.87 kg CO₂e</span></p>
                <p>• Vegetables (1 serving) → <span className="text-green-600 dark:text-green-400 font-bold">0.39 kg CO₂e</span></p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tips Carousel */}
        <div id="tips-section">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Quick Tips for a Greener Life 💡</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tips.map((tip, idx) => (
              <Card key={idx} className="p-4 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <div className="text-3xl mb-2">{tip.icon}</div>
                <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">{tip.text}</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-bold">saves {tip.saves}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Mini Quiz */}
        <Card className="p-6 sm:p-8 space-y-4" id="quiz-section">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Star className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Test Your Knowledge! 🎯</h2>
            {quizCompleted && (
              <Badge variant="default" className="ml-auto bg-green-600">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <p className="text-sm sm:text-base text-foreground/80">
            Ready to test what you've learned? Take our mini quiz and boost your progress!
          </p>
          <Button 
            onClick={() => setShowQuiz(true)}
            className="w-full"
            variant={quizCompleted ? "outline" : "default"}
          >
            <Star className="h-4 w-4 mr-2" />
            {quizCompleted ? "Retake Quiz" : "Start Quiz"}
          </Button>
        </Card>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button 
            className="flex-1"
            onClick={() => navigate("/coach", { state: { from: '/learn' } })}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Ask Eco-Coach 🤖
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/dashboard")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View My Impact 🌱
          </Button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
