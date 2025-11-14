import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Zap, Utensils, Leaf, TrendingUp, AlertCircle, Calculator as CalculatorIcon } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

// CO2 emission factors (kg CO2 per km)
const TRANSPORT_EMISSIONS: Record<string, number> = {
  car: 0.192, // Average petrol car
  "car-diesel": 0.171,
  "car-electric": 0.053,
  bus: 0.089,
  train: 0.041,
  motorcycle: 0.113,
  bike: 0,
  walk: 0,
};

// CO2 emission factors (kg CO2 per kWh)
const ENERGY_EMISSION_FACTOR = 0.385; // Average grid electricity

// CO2 emission factors (kg CO2 per serving)
const FOOD_EMISSIONS: Record<string, number> = {
  beef: 7.19,
  lamb: 5.6,
  pork: 1.72,
  chicken: 0.87,
  fish: 0.63,
  vegetarian: 0.39,
  vegan: 0.29,
};

interface CalculationResult {
  emissions: number;
  category: string;
  details: string;
}

export default function Calculator() {
  const { addNotification } = useNotifications();
  const [transport, setTransport] = useState({ mode: "", distance: "" });
  const [energy, setEnergy] = useState({ kwh: "" });
  const [food, setFood] = useState({ type: "", servings: "" });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const getRecommendations = (emissions: number, category: string, mode?: string) => {
    const recommendations: string[] = [];

    if (category === "transport") {
      if (emissions > 5) {
        recommendations.push("🚆 Consider using public transport to reduce emissions by up to 75%");
        recommendations.push("🚴 Cycling or walking for short trips can eliminate emissions entirely");
      }
      if (mode === "car" || mode === "car-diesel") {
        recommendations.push("⚡ Switching to an electric vehicle can reduce emissions by 72%");
        recommendations.push("🚗 Carpooling with 3 people reduces per-person emissions by 75%");
      }
      if (emissions < 2) {
        recommendations.push("✨ Great choice! You're using eco-friendly transportation");
      }
    } else if (category === "energy") {
      if (emissions > 10) {
        recommendations.push("💡 Switch to LED bulbs to reduce consumption by 75%");
        recommendations.push("🌡️ Lower your thermostat by 1°C to save 10% on heating");
        recommendations.push("☀️ Consider solar panels to generate clean energy");
      } else if (emissions < 5) {
        recommendations.push("✨ Excellent! You're using energy efficiently");
      }
      recommendations.push("🔌 Unplug devices when not in use to reduce phantom power");
    } else if (category === "food") {
      if (emissions > 10) {
        recommendations.push("🥗 Try having 1-2 meat-free days per week");
        recommendations.push("🐔 Choosing chicken over beef reduces emissions by 88%");
      }
      if (mode === "beef" || mode === "lamb") {
        recommendations.push("🌱 Plant-based alternatives can reduce food emissions by 96%");
      }
      if (emissions < 2) {
        recommendations.push("✨ Fantastic! Your diet has a low carbon footprint");
      }
      recommendations.push("🍽️ Eating local and seasonal food reduces transportation emissions");
    }

    return recommendations;
  };

  const calculateEmissions = (category: string) => {
    let emissions = 0;
    let details = "";
    let mode = "";

    if (category === "transport" && transport.distance && transport.mode) {
      const dist = parseFloat(transport.distance);
      const emissionFactor = TRANSPORT_EMISSIONS[transport.mode];
      emissions = dist * emissionFactor;
      mode = transport.mode;
      details = `${dist} km by ${transport.mode.replace("-", " ")}`;
    } else if (category === "energy" && energy.kwh) {
      const kwh = parseFloat(energy.kwh);
      emissions = kwh * ENERGY_EMISSION_FACTOR;
      details = `${kwh} kWh of electricity`;
    } else if (category === "food" && food.servings && food.type) {
      const servings = parseFloat(food.servings);
      const emissionFactor = FOOD_EMISSIONS[food.type];
      emissions = servings * emissionFactor;
      mode = food.type;
      details = `${servings} serving${servings > 1 ? "s" : ""} of ${food.type}`;
    }

    if (emissions >= 0) {
      const resultData: CalculationResult = {
        emissions,
        category,
        details,
      };
      setResult(resultData);

      // Add notification
      addNotification(
        "Calculation Complete",
        `${emissions.toFixed(2)} kg CO₂ from ${category}`,
        "calculation"
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-5 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-500/20 rounded-lg">
              <CalculatorIcon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Carbon Calculator</h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/80 font-medium">Track your daily emissions and get personalized tips 📊</p>
        </div>

        <Tabs defaultValue="transport" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="transport" className="text-xs sm:text-sm">
              <Car className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Transport</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="text-xs sm:text-sm">
              <Zap className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="text-xs sm:text-sm">
              <Utensils className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Food</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transport">
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transport-mode">Mode of Transport</Label>
                <Select value={transport.mode} onValueChange={(val) => setTransport({ ...transport, mode: val })}>
                  <SelectTrigger id="transport-mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car (Petrol) - 0.192 kg CO₂/km</SelectItem>
                    <SelectItem value="car-diesel">Car (Diesel) - 0.171 kg CO₂/km</SelectItem>
                    <SelectItem value="car-electric">Car (Electric) - 0.053 kg CO₂/km</SelectItem>
                    <SelectItem value="bus">Bus - 0.089 kg CO₂/km</SelectItem>
                    <SelectItem value="train">Train - 0.041 kg CO₂/km</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle - 0.113 kg CO₂/km</SelectItem>
                    <SelectItem value="bike">Bicycle - 0 kg CO₂/km</SelectItem>
                    <SelectItem value="walk">Walking - 0 kg CO₂/km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="0"
                  value={transport.distance}
                  onChange={(e) => setTransport({ ...transport, distance: e.target.value })}
                />
              </div>

              <Button onClick={() => calculateEmissions("transport")} className="w-full">
                Calculate Emissions
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="energy">
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kwh">Electricity Usage (kWh)</Label>
                <Input
                  id="kwh"
                  type="number"
                  placeholder="0"
                  value={energy.kwh}
                  onChange={(e) => setEnergy({ kwh: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Check your electricity bill or meter
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Average emission factor: {ENERGY_EMISSION_FACTOR} kg CO₂ per kWh
                </AlertDescription>
              </Alert>

              <Button onClick={() => calculateEmissions("energy")} className="w-full">
                Calculate Emissions
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="food">
            <Card className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-type">Food Type</Label>
                <Select value={food.type} onValueChange={(val) => setFood({ ...food, type: val })}>
                  <SelectTrigger id="food-type">
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beef">Beef - 7.19 kg CO₂/serving</SelectItem>
                    <SelectItem value="lamb">Lamb - 5.6 kg CO₂/serving</SelectItem>
                    <SelectItem value="pork">Pork - 1.72 kg CO₂/serving</SelectItem>
                    <SelectItem value="chicken">Chicken - 0.87 kg CO₂/serving</SelectItem>
                    <SelectItem value="fish">Fish - 0.63 kg CO₂/serving</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian - 0.39 kg CO₂/serving</SelectItem>
                    <SelectItem value="vegan">Vegan - 0.29 kg CO₂/serving</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">Number of Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="0"
                  value={food.servings}
                  onChange={(e) => setFood({ ...food, servings: e.target.value })}
                />
              </div>

              <Button onClick={() => calculateEmissions("food")} className="w-full">
                Calculate Emissions
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Results Section */}
        {result && (
          <>
            {result.emissions === 0 ? (
              // Zero Emissions Celebration
              <Card className="mt-6 p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-500/30 space-y-4 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                    <Leaf className="h-16 w-16 sm:h-20 sm:w-20 text-green-600 dark:text-green-400 relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-2xl sm:text-3xl text-green-700 dark:text-green-300">🎉 Amazing Choice!</h3>
                    <p className="text-base sm:text-lg font-semibold text-green-600 dark:text-green-400">
                      Zero Carbon Emissions
                    </p>
                    <p className="text-sm sm:text-base text-green-700/80 dark:text-green-300/80 max-w-md mx-auto">
                      {result.details}
                    </p>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 max-w-md">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      You're making a real difference! {result.category === "transport" ? "Walking and cycling" : "This choice"} helps keep our planet green and healthy. 🌍💚
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm text-green-600 dark:text-green-400">
                    <span className="bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full">♻️ Eco-Friendly</span>
                    <span className="bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full">🌱 Sustainable</span>
                    <span className="bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full">⭐ Zero Impact</span>
                  </div>
                </div>
              </Card>
            ) : (
              // Regular Emissions Result
              <Card className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-xl sm:text-2xl text-foreground">Calculation Result</h3>
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base font-medium text-foreground/80">{result.details}</p>
                      <div className="flex items-baseline gap-3 py-2">
                        <span className="text-5xl sm:text-6xl font-bold text-primary">{result.emissions.toFixed(2)}</span>
                        <span className="text-2xl sm:text-3xl font-semibold text-foreground">kg CO₂</span>
                      </div>
                      <p className="text-sm sm:text-base text-foreground/70 font-medium">
                        📊 Equivalent to {(result.emissions / 0.192).toFixed(1)} km driven by an average car
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="border-t border-primary/20 pt-4">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 space-y-3">
                      <h4 className="font-semibold text-base sm:text-lg text-foreground">💡 Recommendations & Quick Tips</h4>
                      <ul className="space-y-2">
                        {getRecommendations(result.emissions, result.category, 
                          result.category === "transport" ? transport.mode : 
                          result.category === "food" ? food.type : undefined
                        ).map((tip, index) => (
                          <li key={index} className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium pl-2 border-l-2 border-primary/30">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Default Tip */}
        {!result && (
          <Card className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <div className="flex items-start gap-3">
              <Leaf className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-semibold text-base sm:text-lg text-foreground">💡 Quick Tip</h3>
                <p className="text-sm sm:text-base text-foreground/80 font-medium">
                  Using public transport instead of a car can reduce your carbon footprint by up to 45%!
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      <Navigation />
    </div>
  );
}
