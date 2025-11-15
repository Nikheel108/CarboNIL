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
const isGreeting = (message: string): boolean => {
  const greetings = [
    'hello', 'hi', 'hey', 'hii', 'hiii', 'helo', 'hola', 'namaste', 'good morning',
    'good afternoon', 'good evening', 'good night', 'greetings', 'howdy', 'sup', 'yo',
    'what\'s up', 'whats up', 'wassup'
  ];
  
  const lowerMessage = message.toLowerCase().trim();
  return greetings.some(greeting => 
    lowerMessage === greeting || 
    lowerMessage.startsWith(greeting + ' ') ||
    lowerMessage.startsWith(greeting + ',') ||
    lowerMessage.startsWith(greeting + '!')
  );
};

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

// Intelligent response system with user-friendly language
const getCoachResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Handle greetings first
  if (isGreeting(userMessage)) {
    return "👋 **Hello! Welcome to Eco-Coach!** 🌱\n\n" +
           "I'm here to help you understand and reduce your carbon footprint in simple, easy-to-understand ways!\n\n" +
           "**You can ask me about:**\n\n" +
           "🚗 **Transportation** - Compare emissions of different vehicles, find eco-friendly options\n" +
           "⚡ **Energy Saving** - Tips to reduce electricity bills and carbon impact\n" +
           "🍽️ **Food Choices** - How your diet affects the environment\n" +
           "📊 **Track Progress** - Understand your stats and improvements\n" +
           "💡 **Quick Tips** - Easy actions you can take today\n\n" +
           "Try asking: *'How can I reduce my car emissions?'* or *'What are simple energy-saving tips?'* 😊";
  }
  
  // Check if query is related to the app
  if (!isRelatedToApp(lowerMessage)) {
    return "🤔 **Hmm, I'm not sure how to help with that...**\n\n" +
           "I'm your **Eco-Coach**, and I specialize in helping you reduce your carbon footprint and live more sustainably!\n\n" +
           "**Please ask me questions about:**\n\n" +
           "• 🚗 How to reduce transportation emissions\n" +
           "• ⚡ Ways to save energy at home\n" +
           "• 🍽️ Food choices that help the planet\n" +
           "• 📊 Understanding your carbon footprint\n" +
           "• 🏆 Completing eco-challenges\n" +
           "• 💡 Simple sustainability tips\n\n" +
           "**Example questions:**\n" +
           "- *'Which is better: bike or bus?'*\n" +
           "- *'How can I reduce my electricity use?'*\n" +
           "- *'Is beef really that bad for the environment?'*\n\n" +
           "I'm here to make sustainability simple and easy! 🌍";
  }

  // TRANSPORT QUERIES - User-friendly responses
  if (lowerMessage.includes("car") && (lowerMessage.includes("vs") || lowerMessage.includes("compare") || lowerMessage.includes("difference"))) {
    return "🚗 **Let me explain car emissions in simple terms!**\n\n" +
           "**Which car emits less CO₂ per kilometer?**\n\n" +
           "🔴 **Petrol Car:** 0.192 kg CO₂ per km (highest)\n" +
           "🟡 **Diesel Car:** 0.171 kg CO₂ per km (11% better than petrol)\n" +
           "🟢 **Electric Car:** 0.053 kg CO₂ per km (72% better than petrol!)\n\n" +
           "**What does this mean for you?**\n" +
           "If you drive 20 km daily:\n" +
           "• Petrol car = 1,400 kg CO₂/year\n" +
           "• Electric car = 387 kg CO₂/year\n" +
           "• **You save 1,013 kg CO₂** - that's like planting 46 trees! 🌳\n\n" +
           "💡 **My advice:** If buying new, go electric. If not, combine with public transport or carpooling to reduce impact!";
  }

  if (lowerMessage.includes("electric") && (lowerMessage.includes("car") || lowerMessage.includes("vehicle") || lowerMessage.includes("ev"))) {
    return "⚡ **Should you switch to an Electric Vehicle?**\n\n" +
           "**Environmental Impact:**\n" +
           "Electric cars emit only 0.053 kg CO₂ per km - that's 72% less than petrol cars!\n\n" +
           "**Your Benefits:**\n\n" +
           "💰 **Save Money:** ₹60,000/year on fuel compared to petrol\n" +
           "🎁 **Government Help:** Get subsidies up to ₹1.5 Lakh\n" +
           "🔧 **Less Maintenance:** Electric cars have fewer parts to break\n" +
           "🌍 **Clean Air:** Zero emissions in your city\n\n" +
           "**How Charging Works:**\n" +
           "• Charge at home for ₹6-8 per unit\n" +
           "• 1 unit gives you ~6 km of driving\n" +
           "• Full charge = 300-500 km range (depending on model)\n\n" +
           "💡 **My Recommendation:** Use our Calculator tab to see exactly how much you'll save each month!";
  }

  if (lowerMessage.includes("bike") || lowerMessage.includes("cycle") || lowerMessage.includes("bicycle")) {
    return "🚴 **Cycling is the BEST choice for the environment!**\n\n" +
           "**Why? Simple answer:**\n" +
           "✅ ZERO emissions - absolutely no CO₂!\n" +
           "✅ ZERO fuel costs - free to ride!\n" +
           "✅ Good for YOUR health - burn calories while commuting\n\n" +
           "**Real Benefits:**\n\n" +
           "💪 **Health:** Burn 400-600 calories per hour, strengthen your heart\n" +
           "💰 **Money:** Save ₹50,000+ every year (no fuel, insurance, parking)\n" +
           "⚡ **Speed:** Actually faster than cars for short trips under 5 km!\n" +
           "😊 **Happiness:** No traffic stress, fresh air, feel good about helping Earth\n\n" +
           "**Pro Tip for Longer Distances:**\n" +
           "Bike to the metro/bus station, then use public transport. This way you save money AND carbon!\n\n" +
           "Even if you replace just 2-3 car trips per week with cycling, you'll save 200 kg CO₂ every year. That's huge! 🌟";
  }

  if (lowerMessage.includes("bus") || lowerMessage.includes("train") || lowerMessage.includes("public transport") || lowerMessage.includes("metro")) {
    return "🚇 **Public Transport - Smart, Cheap, and Green!**\n\n" +
           "Let me break it down simply:\n\n" +
           "**CO₂ Emissions (per person per km):**\n" +
           "🟢 Train/Metro: 0.041 kg (LOWEST!)\n" +
           "🟡 Bus: 0.089 kg (half of a car)\n" +
           "🔴 Petrol Car: 0.192 kg (HIGHEST)\n\n" +
           "**Real Example - Your 20 km Daily Commute:**\n\n" +
           "If you drive a car:\n" +
           "• 3.84 kg CO₂ every day\n" +
           "• 1,401 kg CO₂ per year\n\n" +
           "If you take the train:\n" +
           "• 0.82 kg CO₂ every day\n" +
           "• 299 kg CO₂ per year\n\n" +
           "**You save 1,102 kg CO₂** - equal to planting 50 trees! 🌳\n\n" +
           "**Plus More Benefits:**\n" +
           "📚 Read books during commute\n" +
           "💰 Save on parking fees\n" +
           "😌 No traffic stress\n" +
           "👥 Meet people\n\n" +
           "Use our **Calculator** to see your exact savings!";
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
