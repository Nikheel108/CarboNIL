import { Leaf, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationPanel } from "./NotificationPanel";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-primary text-primary-foreground p-4 shadow-md z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Leaf className="h-6 w-6" />
          <h1 className="text-xl font-bold">Carbonil</h1>
        </button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationPanel />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="rounded-full text-primary-foreground hover:bg-primary-foreground/10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
