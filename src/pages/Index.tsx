import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, MessageCircle, BarChart3, Users, Database, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ocean-hero.jpg";

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Natural Language Queries",
      description: "Ask questions about ocean data in plain English, with voice and image support"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "3D Ocean Globe",
      description: "Interactive visualization of ARGO float positions and trajectories worldwide"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Profile Analysis",
      description: "Deep dive into temperature, salinity, and oxygen profiles with comparison tools"
    }
  ];

  const stats = [
    { label: "Active ARGO Floats", value: "3,847", icon: <Database className="h-5 w-5" /> },
    { label: "Data Points", value: "2.1M", icon: <Zap className="h-5 w-5" /> },
    { label: "Ocean Coverage", value: "Global", icon: <Globe className="h-5 w-5" /> },
    { label: "AI Accuracy", value: "94%", icon: <BarChart3 className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              AI-Powered Ocean Data Explorer
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Explore Ocean Data with
              <span className="block bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
                Natural Language
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ask questions about ocean temperature, salinity, and float data using AI. 
              Visualize ARGO measurements on an interactive 3D globe and compare profiles across the world's oceans.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/app">
              <Button size="lg" variant="ocean" className="px-8 py-4 text-lg hover-float">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white/30 text-white hover:bg-white/10">
              View Demo
            </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 border-white/20 hover-float backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2 text-accent">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Ocean Data Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI technology makes ocean data accessible through natural language queries, 
              interactive visualizations, and real-time analysis tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`hover-float transition-all duration-300 ${
                  hoveredCard === index ? 'float-shadow scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 surface-gradient opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore the Ocean?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start querying ocean data with natural language and discover insights 
            from thousands of ARGO floats worldwide.
          </p>
          <Link to="/app">
            <Button size="lg" variant="ocean" className="px-8 py-4 text-lg hover-float text-white">
              Launch OceanGPT
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;