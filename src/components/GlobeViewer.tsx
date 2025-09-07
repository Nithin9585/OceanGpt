import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Activity,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface Float {
  id: string;
  name: string;
  lat: number;
  lon: number;
  alt: number;
  status: "active" | "inactive";
  lastSeen: string;
  temperature: number;
  salinity: number;
}

interface GlobeViewerProps {
  onFloatSelect: (floatId: string) => void;
  selectedFloat: string | null;
}

export const GlobeViewer = ({ onFloatSelect, selectedFloat }: GlobeViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"satellite" | "ocean" | "topographic">("ocean");
  
  // Mock float data
  const [floats] = useState<Float[]>([
    {
      id: "R12345",
      name: "ARGO Float R12345",
      lat: 0.3245,
      lon: 34.2351,
      alt: -2.0,
      status: "active",
      lastSeen: "2023-03-12T05:23:00Z",
      temperature: 29.2,
      salinity: 35.0
    },
    {
      id: "R67890",
      name: "ARGO Float R67890", 
      lat: -0.0021,
      lon: 36.1212,
      alt: -1.5,
      status: "active",
      lastSeen: "2023-03-20T10:11:00Z",
      temperature: 28.8,
      salinity: 35.1
    },
    {
      id: "R11223",
      name: "ARGO Float R11223",
      lat: -15.5432,
      lon: 45.7891,
      alt: -3.2,
      status: "inactive",
      lastSeen: "2023-02-28T14:30:00Z",
      temperature: 26.5,
      salinity: 35.3
    }
  ]);

  const handleFloatClick = (float: Float) => {
    onFloatSelect(float.id);
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-primary/20 to-accent/20">
      {/* Mock 3D Globe Background */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-primary/20 to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      </div>

      {/* Globe Controls */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Button
                variant={isPlaying ? "default" : "outline"}
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              {floats.filter(f => f.status === 'active').length} Active Floats
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex space-x-1">
              {(['satellite', 'ocean', 'topographic'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="text-xs"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Float Markers */}
      <div className="absolute inset-0">
        {floats.map((float, index) => {
          // Convert lat/lon to screen coordinates (mock positioning)
          const x = ((float.lon + 180) / 360) * 100;
          const y = ((90 - float.lat) / 180) * 100;
          
          const isSelected = selectedFloat === float.id;
          
          return (
            <div
              key={float.id}
              className="absolute cursor-pointer"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleFloatClick(float)}
            >
              {/* Float Marker */}
              <div 
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  float.status === 'active' 
                    ? 'bg-secondary border-secondary-foreground pulse-ocean' 
                    : 'bg-muted border-muted-foreground'
                } ${
                  isSelected 
                    ? 'scale-150 glow-effect' 
                    : 'hover:scale-125'
                }`}
              />
              
              {/* Float Info Card (on hover/select) */}
              {isSelected && (
                <div className="absolute top-6 left-0 z-20 float-wave">
                  <Card className="w-64 bg-card/95 backdrop-blur-sm float-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{float.name}</h4>
                        <Badge 
                          variant={float.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {float.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{float.lat.toFixed(4)}°, {float.lon.toFixed(4)}°</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-3 w-3 text-destructive" />
                          <span>{float.temperature}°C</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-3 w-3 text-primary" />
                          <span>{float.salinity} PSU</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 text-xs"
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Globe Center Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardContent className="p-2 text-center">
            <div className="text-xs text-muted-foreground">
              Indian Ocean Region • Live Data Feed
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};