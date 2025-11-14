import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Globe, Shield, Download, LogOut, Edit, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate("/auth");
  };

  const handleExport = () => {
    toast({
      title: "Exporting data...",
      description: "Your data will be downloaded as CSV",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-primary/20 shadow-lg">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Demo" alt="User Avatar" />
                <AvatarFallback className="text-3xl font-bold bg-primary/20 text-primary">DU</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full shadow-lg"
                variant="default"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Demo User</h2>
                <p className="text-base sm:text-lg text-foreground/80 mt-1 font-medium">demo@carbonil.app</p>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2.5 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm sm:text-base font-semibold text-foreground">420 Points</span>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2.5 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-semibold text-foreground">Rank #4</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <Card className="p-4 sm:p-5 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">76</p>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-semibold mt-1">kg CO₂ Saved</p>
          </Card>
          <Card className="p-4 sm:p-5 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">12</p>
            <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-semibold mt-1">Days Active</p>
          </Card>
          <Card className="p-4 sm:p-5 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
            <p className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400">3</p>
            <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-semibold mt-1">Challenges Done</p>
          </Card>
        </div>

        <Card className="p-4 sm:p-5 bg-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Location</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base text-foreground">Region</Label>
              <Select defaultValue="mumbai">
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai, India</SelectItem>
                  <SelectItem value="delhi">Delhi, India</SelectItem>
                  <SelectItem value="bangalore">Bangalore, India</SelectItem>
                  <SelectItem value="kolkata">Kolkata, India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 bg-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base text-foreground">Units</Label>
              <Select defaultValue="metric">
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (km, kg)</SelectItem>
                  <SelectItem value="imperial">Imperial (miles, lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm sm:text-base text-foreground">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 bg-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5 flex-1 min-w-0">
                <Label className="text-sm sm:text-base text-foreground">Share on Leaderboard</Label>
                <p className="text-xs sm:text-sm text-foreground/70">Show your name publicly</p>
              </div>
              <Switch defaultChecked className="shrink-0" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5 flex-1 min-w-0">
                <Label className="text-sm sm:text-base text-foreground">Anonymous Data</Label>
                <p className="text-xs sm:text-sm text-foreground/70">Help improve the app</p>
              </div>
              <Switch defaultChecked className="shrink-0" />
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-sm sm:text-base h-12" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">Export My Data (CSV)</span>
          </Button>
          <Button variant="destructive" className="w-full justify-start text-sm sm:text-base h-12" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2 shrink-0" />
            Log Out
          </Button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}
