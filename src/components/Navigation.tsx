import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  MessageSquare,
  Users,
  Activity,
  BarChart3,
  Heart,
  Menu,
  X,
  Droplets,
  LogOut,
  User,
  Settings,
  Phone
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface NavigationProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

const Navigation = ({ onSectionChange, activeSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Admin Dashboard", icon: Activity, roles: ["admin"] },
    { id: "patient", label: "Patient Dashboard", icon: Heart, roles: ["patient", "admin"] },
    { id: "request", label: "Blood Request", icon: Droplets, roles: ["patient", "admin"] },
    { id: "register", label: "Donor Registration", icon: Users, roles: ["donor", "admin"] },
    { id: "donors", label: "Donor Network", icon: Users, roles: ["admin", "donor"] },
    { id: "analytics", label: "Analytics", icon: BarChart3, roles: ["admin"] },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare, roles: ["patient", "donor", "admin"] },
  ];

  const userRole = user?.user_metadata?.role || "patient";
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    }
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleEmergency = () => {
    toast.error("🚨 Emergency SOS Activated! Contacting nearest healthcare providers...");
    // In a real app, this would trigger emergency protocols
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between p-6 bg-card border-b border-border shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PulseSync AI
            </span>
          </div>

          <div className="flex space-x-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleEmergency}
            className="bg-destructive hover:bg-destructive/90"
          >
            <Phone className="h-4 w-4 mr-2" />
            Emergency SOS
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">
                  {user?.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                <Badge variant="outline" className="w-fit text-xs">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            PulseSync AI
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border p-4 shadow-lg">
          <div className="space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            <div className="pt-2 border-t">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleEmergency}
                className="w-full justify-start"
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency SOS
              </Button>
            </div>
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;