import { Calculator, MessageSquare, Target, Trophy, Home, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: Target, label: "Challenges", path: "/challenges" },
  { icon: Trophy, label: "Board", path: "/leaderboard" },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-1 sm:px-2 max-w-7xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-colors flex-1 min-w-0",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
