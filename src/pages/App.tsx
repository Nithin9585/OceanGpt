import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Mic, 
  Image, 
  Send, 
  Globe, 
  MapPin, 
  Thermometer,
  Droplets,
  Activity,
  Settings,
  User
} from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";
import { GlobeViewer } from "@/components/GlobeViewer";
import { FloatInspector } from "@/components/FloatInspector";
import { Header } from "@/components/Header";
import { DemoMode } from "@/components/DemoMode";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const OceanApp = () => {
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to OceanGPT! I can help you explore ocean data from ARGO floats worldwide. Try asking about temperature profiles, salinity measurements, or specific ocean regions.",
      timestamp: new Date()
    }
  ]);

  const [quickPrompts] = useState([
    "Show salinity near the equator",
    "Temperature profiles in the Atlantic",
    "Compare floats in the Pacific",
    "Recent data from the Indian Ocean"
  ]);

  const handleFloatSelect = (floatId: string) => {
    setSelectedFloat(floatId);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I found several ARGO floats matching your query "${message}". The data shows interesting patterns in the selected region. Click on the highlighted floats on the globe to explore detailed profiles.`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat */}
        <div className="w-80 border-r border-border flex flex-col bg-card">
          <ChatPanel 
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            quickPrompts={quickPrompts}
          />
        </div>

        {/* Center Panel - Globe */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Ocean Data Globe</h2>
                <Badge variant="secondary" className="pulse-ocean">
                  Live Data
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>3,847 Active Floats</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <GlobeViewer 
              onFloatSelect={handleFloatSelect}
              selectedFloat={selectedFloat}
            />
          </div>

          {/* Timeline Control */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Timeline:</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-3/4"></div>
              </div>
              <span className="text-sm text-muted-foreground">Mar 2023</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Inspector */}
        <div className="w-96 border-l border-border bg-card">
          <FloatInspector 
            selectedFloat={selectedFloat}
            onFloatSelect={setSelectedFloat}
          />
        </div>
      </div>
      
      {/* Demo Mode FAB */}
      <DemoMode />
    </div>
  );
};

export default OceanApp;