import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Globe,
  BarChart3,
  MessageCircle
} from "lucide-react";

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  query: string;
  duration: number;
  steps: Array<{
    action: string;
    description: string;
    duration: number;
  }>;
}

const demoScenarios: DemoScenario[] = [
  {
    id: "equatorial-salinity",
    title: "Equatorial Salinity Analysis",
    description: "Explore salinity variations near the equator and discover ocean circulation patterns.",
    query: "Show me salinity profiles near the equator in March 2023",
    duration: 15,
    steps: [
      { action: "chat", description: "AI processes natural language query", duration: 2 },
      { action: "globe", description: "Globe animates to equatorial region", duration: 3 },
      { action: "floats", description: "Relevant floats highlight with pulse animation", duration: 2 },
      { action: "profile", description: "Temperature/salinity profiles display", duration: 4 },
      { action: "analysis", description: "AI provides oceanographic insights", duration: 4 }
    ]
  },
  {
    id: "atlantic-temperature",
    title: "Atlantic Temperature Trends",
    description: "Compare temperature profiles across different Atlantic Ocean regions.",
    query: "Compare temperature profiles in the North vs South Atlantic",
    duration: 18,
    steps: [
      { action: "chat", description: "Voice query processing simulation", duration: 3 },
      { action: "globe", description: "Globe shows Atlantic Ocean overview", duration: 2 },
      { action: "comparison", description: "Side-by-side profile comparison", duration: 6 },
      { action: "insights", description: "ML-driven pattern analysis", duration: 4 },
      { action: "export", description: "Generate shareable report", duration: 3 }
    ]
  },
  {
    id: "pacific-depth",
    title: "Pacific Deep Water Analysis", 
    description: "Investigate deep water properties in the Pacific using multi-parameter analysis.",
    query: "Analyze deep water oxygen levels in the Pacific Ocean",
    duration: 20,
    steps: [
      { action: "chat", description: "Multi-parameter query processing", duration: 3 },
      { action: "globe", description: "Pacific Ocean focus with 3D depth visualization", duration: 4 },
      { action: "filters", description: "Apply depth and oxygen parameter filters", duration: 3 },
      { action: "timeline", description: "Temporal analysis over multiple seasons", duration: 6 },
      { action: "conclusions", description: "Scientific interpretation and export", duration: 4 }
    ]
  }
];

export const DemoMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startDemo = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setIsPlaying(true);
    
    // Simulate demo steps
    let stepIndex = 0;
    const playStep = () => {
      if (stepIndex < scenario.steps.length && isPlaying) {
        setCurrentStep(stepIndex);
        setTimeout(() => {
          stepIndex++;
          if (stepIndex < scenario.steps.length) {
            playStep();
          } else {
            setIsPlaying(false);
            setCurrentStep(0);
          }
        }, scenario.steps[stepIndex].duration * 1000);
      }
    };
    
    playStep();
  };

  const stopDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSelectedScenario(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 px-6 text-white hover-float glow-effect"
          variant="ocean"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Demo Mode
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span>OceanGPT Demo Scenarios</span>
          </DialogTitle>
          <DialogDescription>
            Experience automated demos showcasing OceanGPT's AI-powered ocean data exploration capabilities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Current Demo Status */}
          {selectedScenario && isPlaying && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{selectedScenario.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={stopDemo}>
                      <Pause className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                    <Badge variant="default" className="pulse-ocean">
                      Playing
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Current Query: "{selectedScenario.query}"
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="space-y-2">
                    {selectedScenario.steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`flex items-center space-x-3 p-2 rounded ${
                          index === currentStep 
                            ? 'bg-primary/10 border border-primary/20' 
                            : index < currentStep 
                              ? 'bg-muted/50' 
                              : 'opacity-50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          index === currentStep 
                            ? 'bg-primary text-primary-foreground pulse-ocean' 
                            : index < currentStep 
                              ? 'bg-muted-foreground text-background' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {index < currentStep ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{step.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {step.action} • {step.duration}s
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo Scenarios */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-lg">Choose a Demo Scenario</h3>
            
            {demoScenarios.map((scenario) => (
              <Card 
                key={scenario.id}
                className="hover-float cursor-pointer transition-all duration-200"
                onClick={() => !isPlaying && startDemo(scenario)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        {scenario.id.includes('salinity') && <Globe className="h-5 w-5 text-secondary" />}
                        {scenario.id.includes('temperature') && <BarChart3 className="h-5 w-5 text-secondary" />}
                        {scenario.id.includes('depth') && <MessageCircle className="h-5 w-5 text-secondary" />}
                      </div>
                      <div>
                        <CardTitle className="text-base">{scenario.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">{scenario.duration}s demo</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={isPlaying}
                      className="hover-float"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {scenario.description}
                  </p>
                  
                  <div className="bg-muted/50 rounded p-3">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Example Query:</div>
                    <div className="text-sm font-mono">"{scenario.query}"</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Instructions */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="text-sm space-y-2">
                <div className="font-medium">Demo Features:</div>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Automated chat interactions with AI responses</li>
                  <li>• Smooth globe animations and float highlighting</li>
                  <li>• Real-time data visualization and chart generation</li>
                  <li>• Voice input simulation and multi-modal queries</li>
                  <li>• Export and sharing functionality showcase</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};