import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Lightbulb, TrendingDown, Bike, Zap, Utensils, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { useNavigate, useLocation } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Enhanced knowledge base with topic detection
const isRelatedToApp = (message: string): boolean => {
  const appKeywords = [
    // Carbon & Climate
    'carbon', 'co2', 'emission', 'footprint', 'climate', 'environment', 'eco', 'green', 'sustainable',
    'pollution', 'greenhouse', 'warming',
    
    // Transport
    'car', 'bike', 'bicycle', 'cycle', 'bus', 'train', 'transport', 'vehicle', 'drive', 'commute',
    'electric', 'ev', 'petrol', 'diesel', 'motorcycle', 'walk', 'carpool',
    
    // Energy
    'energy', 'electricity', 'power', 'led', 'bulb', 'solar', 'panel', 'renewable', 'appliance',
    'kwh', 'watt', 'heating', 'cooling', 'thermostat', 'ac',
    
    // Food
    'food', 'diet', 'meat', 'beef', 'chicken', 'fish', 'vegetarian', 'vegan', 'plant-based',
    'lamb', 'pork', 'meal', 'eating',
    
    // App Features
    'calculator', 'calculate', 'challenge', 'leaderboard', 'point', 'stat', 'progress', 'dashboard',
    'track', 'reduce', 'save', 'lower', 'tip', 'advice', 'help', 'learn',
    
    // Actions
    'how to', 'what is', 'why', 'when', 'where', 'best', 'better', 'improve', 'change'
  ];
  
  const lowerMessage = message.toLowerCase();
  return appKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Intelligent response system
const getCoachResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check if query is related to the app
  if (!isRelatedToApp(lowerMessage)) {
    return "🌱 I'm your Eco-Coach, specialized in helping you reduce your carbon footprint!\n\n" +
           "I can only answer questions related to:\n" +
           "• 🚗 Transportation & carbon emissions\n" +
           "• ⚡ Energy consumption & saving tips\n" +
           "• 🍽️ Food choices & dietary impact\n" +
           "• 📊 Your carbon footprint tracking\n" +
           "• 🏆 Eco-challenges & achievements\n" +
           "• 💡 Sustainability tips & advice\n\n" +
           "Please ask me something related to carbon footprint tracking or environmental sustainability! 😊";
  }

  // TRANSPORT QUERIES - More specific matching
  if (lowerMessage.includes("car") && (lowerMessage.includes("vs") || lowerMessage.includes("compare") || lowerMessage.includes("difference"))) {
    return "🚗 **Car Comparison - Accurate CO₂ Emissions:**\n\n" +
           "**Per Kilometer:**\n" +
           "• Petrol Car: 0.192 kg CO₂/km\n" +
           "• Diesel Car: 0.171 kg CO₂/km (11% less than petrol)\n" +
           "• Electric Car: 0.053 kg CO₂/km (72% less than petrol!)\n\n" +
           "**For 50km daily commute (annual):**\n" +
           "• Petrol: 3,504 kg CO₂/year\n" +
           "• Diesel: 3,121.5 kg CO₂/year\n" +
           "• Electric: 966.5 kg CO₂/year\n\n" +
           "💡 Switching from petrol to electric saves ~2,537 kg CO₂/year - equivalent to planting 115 trees!";
  }

  if (lowerMessage.includes("electric") && (lowerMessage.includes("car") || lowerMessage.includes("vehicle") || lowerMessage.includes("ev"))) {
    return "⚡ **Electric Vehicles - The Smart Choice!**\n\n" +
           "**Emissions:** 0.053 kg CO₂/km (72% lower than petrol)\n\n" +
           "**Benefits:**\n" +
           "• Save ~₹60,000/year on fuel (vs petrol)\n" +
           "• Govt. subsidies up to ₹1.5L available\n" +
           "• Lower maintenance costs (fewer moving parts)\n" +
           "• Zero tailpipe emissions in cities\n\n" +
           "**Charging:** 1 kWh = ~6km range | Home charging costs ₹6-8/kWh\n\n" +
           "Use our **Calculator** to see your exact savings by switching to EV!";
  }

  if (lowerMessage.includes("bike") || lowerMessage.includes("cycle") || lowerMessage.includes("bicycle")) {
    return "🚴 **Cycling - The Ultimate Eco-Transport!**\n\n" +
           "**Carbon Impact:** 0 kg CO₂ (100% emission-free!)\n\n" +
           "**Amazing Benefits:**\n" +
           "• **Health**: Burns 400-600 calories/hour, improves cardiovascular health\n" +
           "• **Cost**: Save ₹50,000+/year vs car ownership\n" +
           "• **Speed**: Faster than cars for <5km in traffic\n" +
           "• **Environment**: No pollution, noise, or congestion\n\n" +
           "**Pro Tip:** Combine cycling with public transport for longer commutes. Even replacing 2-3 car trips/week saves ~200 kg CO₂/year!\n\n" +
           "Track your cycling in our Calculator! 📊";
  }

  if (lowerMessage.includes("bus") || lowerMessage.includes("train") || lowerMessage.includes("public transport") || lowerMessage.includes("metro")) {
    return "🚇 **Public Transport - Smart & Sustainable!**\n\n" +
           "**Accurate Emissions:**\n" +
           "• Train/Metro: 0.041 kg CO₂/km (78% less than cars!)\n" +
           "• Bus: 0.089 kg CO₂/km (54% less than cars!)\n\n" +
           "**Real Example - 20km daily commute:**\n" +
           "• Car (petrol): 3.84 kg CO₂/day = 1,401 kg/year\n" +
           "• Train: 0.82 kg CO₂/day = 299 kg/year\n" +
           "• **Savings: 1,102 kg CO₂/year** ♻️\n\n" +
           "Plus: Read books, avoid traffic stress, save parking costs!\n\n" +
           "Calculate your exact savings in our **Transport Calculator**! 🧮";
  }

  if (lowerMessage.includes("motorcycle") || lowerMessage.includes("scooter") || lowerMessage.includes("two wheeler")) {
    return "🏍️ **Motorcycle Emissions Data:**\n\n" +
           "**Emission Rate:** 0.113 kg CO₂/km\n\n" +
           "**Comparison:**\n" +
           "• 41% less emissions than petrol cars (0.192 kg)\n" +
           "• 27% more than buses (0.089 kg)\n" +
           "• Electric scooters: 0.035 kg CO₂/km (69% less!)\n\n" +
           "**Better Options:**\n" +
           "1. Switch to electric scooter → save 70% emissions\n" +
           "2. Use for essential trips only, combine with public transport\n" +
           "3. Maintain properly (proper tire pressure = 3% fuel savings)\n\n" +
           "Try our Calculator to see your monthly impact! 📊";
  }

  // ENERGY QUERIES
  if (lowerMessage.includes("led") || (lowerMessage.includes("light") && lowerMessage.includes("bulb"))) {
    return "💡 **LED Bulbs - Small Change, Big Impact!**\n\n" +
           "**Power Savings:**\n" +
           "• Incandescent: 60W\n" +
           "• CFL: 15W (75% less)\n" +
           "• LED: 9W (85% less!)\n\n" +
           "**For 10 bulbs used 6 hrs/day:**\n" +
           "• Incandescent: 1,314 kWh/year = 505 kg CO₂\n" +
           "• LED: 197 kWh/year = 76 kg CO₂\n" +
           "• **Save 429 kg CO₂/year + ₹6,700 in electricity!**\n\n" +
           "**Bonus:** LEDs last 25,000+ hours vs 1,000 for incandescent\n\n" +
           "Track your energy usage in our **Energy Calculator**! ⚡";
  }

  if (lowerMessage.includes("solar") || lowerMessage.includes("panel") || lowerMessage.includes("renewable")) {
    return "☀️ **Solar Panels - Worth the Investment!**\n\n" +
           "**System Sizing:**\n" +
           "• Average home: 3-5 kW system\n" +
           "• Cost: ₹50,000-60,000 per kW installed\n" +
           "• Generates: 12-15 kWh/day per kW\n\n" +
           "**Environmental Impact:**\n" +
           "• 3 kW system saves ~4,500 kg CO₂/year\n" +
           "• Equivalent to planting 200 trees annually!\n\n" +
           "**Financial Benefits:**\n" +
           "• ROI: 5-7 years with govt. subsidies (up to 40%)\n" +
           "• 25+ year lifespan\n" +
           "• Reduce electricity bills by 80-100%\n\n" +
           "**Start Small:** Solar water heater (~₹15,000) saves 1,000 kg CO₂/year!";
  }

  if (lowerMessage.includes("energy") || lowerMessage.includes("electricity") || lowerMessage.includes("power save")) {
    return "⚡ **Smart Energy Saving Strategies:**\n\n" +
           "**Quick Wins (Highest Impact):**\n" +
           "1. **Switch to LEDs** → Save 429 kg CO₂/year + ₹6,700\n" +
           "2. **Unplug devices** → Phantom power = 10% of bill (~300 kg CO₂)\n" +
           "3. **AC optimization** → Set to 24-25°C (saves 20% energy)\n" +
           "4. **Energy Star appliances** → 30-50% more efficient\n\n" +
           "**Our Grid:** 0.385 kg CO₂ per kWh\n" +
           "Every 100 kWh saved = 38.5 kg CO₂ prevented!\n\n" +
           "Use our **Energy Calculator** to track your usage and get personalized recommendations! 📊";
  }

  // FOOD QUERIES
  if (lowerMessage.includes("beef") || lowerMessage.includes("red meat")) {
    return "🥩 **Beef - Highest Food Carbon Impact**\n\n" +
           "**Emissions:** 7.19 kg CO₂ per serving (highest of all foods!)\n\n" +
           "**Why so high?**\n" +
           "• Methane from cattle digestion\n" +
           "• Land use (deforestation for grazing)\n" +
           "• Feed production & transport\n\n" +
           "**Better Alternatives:**\n" +
           "• Chicken: 0.87 kg CO₂ (88% less!)\n" +
           "• Fish: 0.63 kg CO₂ (91% less!)\n" +
           "• Plant-based: 0.29 kg CO₂ (96% less!)\n\n" +
           "**Action:** Swap 1 beef meal/week for chicken → Save 328 kg CO₂/year\n\n" +
           "Calculate your food impact in our **Food Calculator**! 🍽️";
  }

  if (lowerMessage.includes("vegan") || lowerMessage.includes("plant-based") || lowerMessage.includes("vegetarian")) {
    return "🌱 **Plant-Based Diet - Most Eco-Friendly Choice!**\n\n" +
           "**Emissions per serving:**\n" +
           "• Vegan: 0.29 kg CO₂ (lowest impact!)\n" +
           "• Vegetarian: 0.39 kg CO₂\n" +
           "• Chicken: 0.87 kg CO₂\n" +
           "• Beef: 7.19 kg CO₂ (96% more than vegan!)\n\n" +
           "**Annual Impact:**\n" +
           "Going vegan saves ~1,500 kg CO₂/year vs meat-heavy diet\n" +
           "= Equivalent to not driving 7,800 km!\n\n" +
           "**Start Gradual:**\n" +
           "• Meatless Mondays: Save 200 kg CO₂/year\n" +
           "• Reduce beef only: Save 500 kg CO₂/year\n\n" +
           "Track your diet impact with our **Food Calculator**! 📊";
  }

  if (lowerMessage.includes("food") || lowerMessage.includes("diet") || lowerMessage.includes("meal") || lowerMessage.includes("eat")) {
    return "🍽️ **Food Carbon Footprint Guide:**\n\n" +
           "**Accurate Emissions per Serving:**\n" +
           "🥩 Beef: 7.19 kg CO₂ (highest)\n" +
           "🐑 Lamb: 5.6 kg CO₂\n" +
           "🥓 Pork: 1.72 kg CO₂\n" +
           "🍗 Chicken: 0.87 kg CO₂ (88% less than beef!)\n" +
           "🐟 Fish: 0.63 kg CO₂\n" +
           "🥗 Vegetarian: 0.39 kg CO₂\n" +
           "🌱 Vegan: 0.29 kg CO₂ (96% less than beef!)\n\n" +
           "**Smart Swaps:**\n" +
           "• Beef → Chicken: Save 6.32 kg CO₂ per meal\n" +
           "• 1 day/week meatless: Save 200 kg CO₂/year\n\n" +
           "Use our **Food Calculator** to track your dietary impact! 🧮";
  }

  // APP FEATURES
  if (lowerMessage.includes("calculator") || lowerMessage.includes("calculate") || lowerMessage.includes("how to use")) {
    return "🧮 **Carbon Calculator - Track Your Impact!**\n\n" +
           "**Three Categories:**\n\n" +
           "1️⃣ **Transport** - Track daily commute emissions\n" +
           "   • Select vehicle type (car, bike, bus, train, etc.)\n" +
           "   • Enter distance traveled\n" +
           "   • Get instant CO₂ calculation with accurate formulas\n\n" +
           "2️⃣ **Energy** - Monitor electricity consumption\n" +
           "   • Enter daily/monthly kWh usage\n" +
           "   • See carbon impact (0.385 kg CO₂/kWh)\n\n" +
           "3️⃣ **Food** - Understand dietary footprint\n" +
           "   • Select meal type & servings\n" +
           "   • Compare different food choices\n\n" +
           "**Results show:** Emissions + Personalized recommendations!\n\n" +
           "Go to **Calculator tab** to start tracking! 📊";
  }

  if (lowerMessage.includes("challenge") || lowerMessage.includes("point") || lowerMessage.includes("compete")) {
    return "🏆 **Challenges - Make Sustainability Fun!**\n\n" +
           "**How it Works:**\n" +
           "• Complete eco-friendly actions\n" +
           "• Earn points for each achievement\n" +
           "• Climb the leaderboard!\n\n" +
           "**Active Challenges:**\n" +
           "🚴 Green Commuter - Use eco-transport 5 days (60% done)\n" +
           "⚡ Energy Saver - Reduce electricity 20% (75% done)\n" +
           "🥗 Meatless Week - 7 days plant-based (completed! ✅)\n\n" +
           "**Your Stats:**\n" +
           "• Total Points: 420\n" +
           "• Rank: #4 on leaderboard\n" +
           "• Challenges Completed: 3\n\n" +
           "Check **Challenges tab** to see all available challenges!";
  }

  if (lowerMessage.includes("leaderboard") || lowerMessage.includes("ranking") || lowerMessage.includes("top")) {
    return "🏅 **Leaderboard - See Where You Stand!**\n\n" +
           "**Current Rankings:**\n" +
           "🥇 1. Priya Kumar - 890 pts (↑2)\n" +
           "🥈 2. Rahul Sharma - 756 pts (↑1)\n" +
           "🥉 3. Anita Desai - 678 pts (↓2)\n" +
           "4️⃣ **You - 420 pts** (↑1)\n\n" +
           "**Earn More Points:**\n" +
           "• Complete challenges (+50-100 pts)\n" +
           "• Track emissions daily (+10 pts)\n" +
           "• Reduce footprint by 20% (+200 pts)\n" +
           "• Maintain streak (+5 pts/day)\n\n" +
           "Visit **Leaderboard tab** to see the full rankings and compete with others!";
  }

  if (lowerMessage.includes("dashboard") || lowerMessage.includes("progress") || lowerMessage.includes("stat")) {
    return "📊 **Your Carbon Footprint Dashboard:**\n\n" +
           "**Today's Impact:** 2.4 kg CO₂ (↓12% from yesterday! 🎉)\n\n" +
           "**This Week:** 18.5 kg CO₂ (↓8% improvement)\n\n" +
           "**This Month:** 76 kg CO₂ (↓15% reduction)\n\n" +
           "**Breakdown:**\n" +
           "• 🚗 Transport: 45% (biggest opportunity!)\n" +
           "• ⚡ Energy: 35%\n" +
           "• 🍽️ Food: 20%\n\n" +
           "**Achievements:**\n" +
           "✅ 12 days active streak\n" +
           "✅ 3 challenges completed\n" +
           "✅ 420 points earned\n\n" +
           "Visit your **Dashboard** for detailed charts and insights!";
  }

  // GENERAL TIPS
  if (lowerMessage.includes("tip") || lowerMessage.includes("advice") || lowerMessage.includes("help reduce") ||
      lowerMessage.includes("quick win") || lowerMessage.includes("easy")) {
    return "💡 **Top 10 Carbon Reduction Tips (Highest Impact):**\n\n" +
           "**Transport (40-50% of footprint):**\n" +
           "1. Switch to public transport → Save 1,100 kg CO₂/year\n" +
           "2. Cycle short distances → Save 200-500 kg CO₂/year\n" +
           "3. Carpool to work → Cut emissions by 75%\n\n" +
           "**Energy (30-40%):**\n" +
           "4. LED bulbs everywhere → Save 429 kg CO₂/year\n" +
           "5. Unplug unused devices → Save 300 kg CO₂/year\n" +
           "6. AC to 24-25°C → Save 20% energy\n\n" +
           "**Food (15-25%):**\n" +
           "7. Meatless Mondays → Save 200 kg CO₂/year\n" +
           "8. Reduce beef → Save 500 kg CO₂/year\n" +
           "9. Buy local produce → Reduce transport emissions\n\n" +
           "**Lifestyle:**\n" +
           "10. Reduce, reuse, recycle → Prevent 100-300 kg CO₂/year\n\n" +
           "Start with 2-3 tips and track progress in our Calculator! 📊";
  }

  // WELCOME/GREETING
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") ||
      lowerMessage.includes("start") || lowerMessage.includes("begin")) {
    return "👋 **Welcome to Eco-Coach!**\n\n" +
           "I'm here to help you understand and reduce your carbon footprint with accurate, data-driven advice!\n\n" +
           "**Ask me about:**\n" +
           "🚗 Transportation emissions (cars, bikes, EVs, public transport)\n" +
           "⚡ Energy saving tips (LED, solar, appliances)\n" +
           "🍽️ Food carbon impact (meat vs plant-based)\n" +
           "📊 Your personal stats and progress\n" +
           "🏆 Challenges and leaderboard\n" +
           "🧮 How to use our Calculator\n" +
           "💡 Quick sustainability tips\n\n" +
           "Try asking: *'How much CO₂ does my car emit?'* or *'Best ways to save energy?'* 😊";
  }

  // THANKS
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
    return "🌟 You're very welcome! I'm happy to help!\n\n" +
           "Remember: Every small action counts. Even reducing your footprint by 10% makes a real difference! 🌍\n\n" +
           "Keep tracking your progress and feel free to ask me anything else about:\n" +
           "• Transport options\n" +
           "• Energy savings\n" +
           "• Food choices\n" +
           "• Your stats\n" +
           "• Challenges\n\n" +
           "Together, we can make a positive impact! 💚";
  }

  // DEFAULT HELPFUL RESPONSE
  return "🌱 **I'm your Eco-Coach AI!**\n\n" +
         "I can help you with specific questions about:\n\n" +
         "**🚗 Transportation:**\n" +
         "Ask: *'Compare car emissions'*, *'Benefits of cycling'*, *'EV vs petrol car'*\n\n" +
         "**⚡ Energy:**\n" +
         "Ask: *'How to save electricity?'*, *'LED bulb savings'*, *'Solar panel benefits'*\n\n" +
         "**🍽️ Food:**\n" +
         "Ask: *'Beef carbon impact'*, *'Vegan vs meat diet'*, *'Food emissions comparison'*\n\n" +
         "**📊 App Features:**\n" +
         "Ask: *'How to use calculator?'*, *'My progress'*, *'Active challenges'*\n\n" +
         "Try asking a specific question, and I'll give you accurate, actionable advice! 😊";
};

export default function Coach() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 **Welcome to Eco-Coach AI!** 🌱\n\nI'm your personal carbon footprint assistant, here to help you understand and reduce your environmental impact with accurate, data-driven advice!\n\n**I specialize in:**\n• 🚗 Transportation emissions & eco-friendly alternatives\n• ⚡ Energy saving strategies & renewable options\n• 🍽️ Food choices & dietary carbon impact\n• 📊 Personal stats tracking & progress insights\n• 🏆 Challenges, achievements & leaderboard\n• 💡 Actionable sustainability tips\n\n**Try asking:**\n*'Compare petrol vs electric car emissions'*\n*'How to reduce my energy bill?'*\n*'What's the carbon impact of beef?'*\n\nWhat would you like to learn about today? 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { icon: Bike, text: "Compare transport options", query: "Compare emissions of car, bike, bus and train" },
    { icon: Zap, text: "LED bulb savings?", query: "How much can I save by switching to LED bulbs?" },
    { icon: Utensils, text: "Food carbon impact", query: "What's the carbon footprint of different foods?" },
    { icon: TrendingDown, text: "Top 5 quick wins", query: "What are the top 5 ways to reduce my carbon footprint?" },
  ];

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getCoachResponse(textToSend),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Back Button - Show if coming from Learn page */}
      {location.state?.from === '/learn' && (
        <div className="p-4 border-b">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learn')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learn & Earn
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-48 max-w-4xl mx-auto w-full">
        <div className="space-y-5">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[85%] sm:max-w-[80%] p-4 sm:p-5 transition-all hover:shadow-md ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-2 border-primary/20"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Eco-Coach AI</span>
                  </div>
                )}
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {msg.content}
                </p>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Card className="max-w-[85%] sm:max-w-[80%] p-4 sm:p-5 bg-card border-2 border-primary/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">Eco-Coach is typing</span>
                  <div className="flex gap-1 ml-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <p className="text-sm sm:text-base font-semibold text-foreground">Quick Questions:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className="h-auto py-4 px-4 justify-start text-left hover:bg-primary/5 hover:border-primary/40 transition-all"
                    onClick={() => handleQuickQuestion(q.query)}
                  >
                    <Icon className="h-5 w-5 mr-3 shrink-0 text-primary" />
                    <span className="text-sm">{q.text}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 sm:p-5 z-40 shadow-lg">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            placeholder="Ask about reducing emissions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="text-sm sm:text-base bg-card h-12"
            disabled={isTyping}
          />
          <Button size="icon" onClick={() => handleSend()} disabled={isTyping || !input.trim()} className="shrink-0 h-12 w-12">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}
