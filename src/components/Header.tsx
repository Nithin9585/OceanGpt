import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Settings, 
  HelpCircle, 
  Waves,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center space-x-3 hover-float">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Waves className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg">OceanGPT</h1>
          <div className="text-xs text-muted-foreground -mt-1">AI Ocean Explorer</div>
        </div>
      </Link>

      {/* Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search floats, regions, or ask a question..."
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-3">
        <Badge variant="outline" className="text-xs">
          Demo Mode
        </Badge>
        
        <Button variant="ghost" size="sm">
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};