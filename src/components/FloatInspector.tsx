import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Activity,
  Calendar,
  Download,
  BarChart3,
  TrendingUp
} from "lucide-react";

interface FloatData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  alt: number;
  status: "active" | "inactive";
  lastSeen: string;
  profileCount: number;
  parameters: string[];
}

interface ProfileData {
  depth: number;
  temperature: number;
  salinity: number;
}

interface FloatInspectorProps {
  selectedFloat: string | null;
  onFloatSelect: (floatId: string | null) => void;
}

export const FloatInspector = ({ selectedFloat, onFloatSelect }: FloatInspectorProps) => {
  const [floatData, setFloatData] = useState<FloatData | null>(null);
  const [profileData, setProfileData] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock float data
  const mockFloats: Record<string, FloatData> = {
    "R12345": {
      id: "R12345",
      name: "ARGO Float R12345",
      lat: 0.3245,
      lon: 34.2351,
      alt: -2.0,
      status: "active",
      lastSeen: "2023-03-12T05:23:00Z",
      profileCount: 58,
      parameters: ["temperature", "salinity", "oxygen"]
    },
    "R67890": {
      id: "R67890", 
      name: "ARGO Float R67890",
      lat: -0.0021,
      lon: 36.1212,
      alt: -1.5,
      status: "active",
      lastSeen: "2023-03-20T10:11:00Z",
      profileCount: 64,
      parameters: ["temperature", "salinity"]
    }
  };

  const mockProfileData: ProfileData[] = [
    { depth: 0, temperature: 29.2, salinity: 35.0 },
    { depth: 10, temperature: 28.8, salinity: 35.1 },
    { depth: 20, temperature: 27.5, salinity: 35.2 },
    { depth: 50, temperature: 24.1, salinity: 35.4 },
    { depth: 100, temperature: 16.9, salinity: 35.6 },
    { depth: 200, temperature: 12.8, salinity: 35.7 }
  ];

  useEffect(() => {
    if (selectedFloat && mockFloats[selectedFloat]) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setFloatData(mockFloats[selectedFloat]);
        setProfileData(mockProfileData);
        setLoading(false);
      }, 800);
    } else {
      setFloatData(null);
      setProfileData([]);
    }
  }, [selectedFloat]);

  if (!selectedFloat) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Float Inspector</h3>
          <p className="text-sm text-muted-foreground">Select a float to view details</p>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Click on a float marker to explore its data profile and measurements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Float Inspector</h3>
          <p className="text-sm text-muted-foreground">Loading float data...</p>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="pulse-ocean">
            <Activity className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Float Inspector</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onFloatSelect(null)}
          >
            ×
          </Button>
        </div>
        
        {floatData && (
          <div className="flex items-center space-x-2">
            <Badge 
              variant={floatData.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {floatData.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{floatData.id}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {floatData && (
          <>
            {/* Basic Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{floatData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{floatData.lat.toFixed(4)}°, {floatData.lon.toFixed(4)}°</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Last seen: {new Date(floatData.lastSeen).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span>{floatData.profileCount} profiles</span>
                </div>
              </CardContent>
            </Card>

            {/* Parameters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Available Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {floatData.parameters.map((param) => (
                    <Badge key={param} variant="outline" className="text-xs">
                      {param}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Profile Preview */}
            {profileData.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Latest Profile Preview</CardTitle>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      View Full
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Surface Conditions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-destructive" />
                        <div>
                          <div className="text-sm font-medium">{profileData[0].temperature}°C</div>
                          <div className="text-xs text-muted-foreground">Surface Temp</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">{profileData[0].salinity} PSU</div>
                          <div className="text-xs text-muted-foreground">Surface Salinity</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Depth Range */}
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Depth Range:</span>
                        <span>0-{Math.max(...profileData.map(p => p.depth))}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Points:</span>
                        <span>{profileData.length}</span>
                      </div>
                    </div>

                    {/* Mini Chart Placeholder */}
                    <div className="h-16 bg-muted/30 rounded flex items-center justify-center">
                      <div className="text-xs text-muted-foreground">
                        Temperature/Salinity Profile
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare with Other Floats
              </Button>
              
              <Button variant="outline" className="w-full text-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data (CSV)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};