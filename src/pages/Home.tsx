import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Heart,
  Globe,
  TrendingDown,
  Users,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Bell,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Saves Money",
      description: "Reduce food waste by up to 40% and save hundreds on groceries",
      emoji: "💰"
    },
    {
      icon: Heart,
      title: "Improves Health",
      description: "Avoid expired food and maintain a healthier diet with fresh ingredients",
      emoji: "🥗"
    },
    {
      icon: Globe,
      title: "Promotes Mindful Consumption",
      description: "Make conscious choices that benefit both you and the environment",
      emoji: "🌍"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Smart Tracking",
      description: "Easily log items with manual entry or OCR scanning"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts before items expire to prevent waste"
    },
    {
      icon: BarChart3,
      title: "Insightful Analytics",
      description: "Track your consumption patterns and savings"
    }
  ];

  const stats = [
    { value: "1.3B", label: "Tons of food wasted globally", icon: TrendingDown },
    { value: "40%", label: "Average household food waste", icon: Target },
    { value: "$1,500", label: "Annual savings potential", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🚀 Smart Grocery Management
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              ShelfAware
              <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-white/90">
                Never Let Food Go to Waste
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track. Save. Stay Healthy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="fresh" size="lg" className="text-lg px-8 py-6">
                <Link to="/cart">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ShelfAware?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your kitchen into a smart, efficient space that saves money and reduces waste
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-fresh transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-fresh opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2 flex items-center justify-center gap-2">
                      {benefit.title}
                      <span className="text-2xl">{benefit.emoji}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your groceries efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-6 p-6 bg-gradient-tech rounded-full w-fit shadow-fresh">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Project Matters */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why This Project Matters
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Global Food Waste Crisis</h3>
                    <p className="text-muted-foreground">
                      Every year, 1.3 billion tons of food is wasted globally while millions go hungry. 
                      That's one-third of all food produced for human consumption.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personal Impact Matters</h3>
                    <p className="text-muted-foreground">
                      Small changes in personal tracking and consumption habits can create ripple effects. 
                      When multiplied across households, these actions contribute to significant environmental impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Technology for Good</h3>
                    <p className="text-muted-foreground">
                      By leveraging smart tracking and notifications, we empower individuals to make 
                      informed decisions that benefit both their wallet and the planet.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild variant="hero" size="lg">
                <Link to="/cart">
                  Join the Movement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-fresh transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-destructive/10 rounded-full">
                        <Icon className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About ShelfAware
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our mission is to create a sustainable future through smart technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To reduce global food waste through innovative technology that makes 
                  grocery management simple, efficient, and environmentally conscious.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A passionate group of developers, designers, and sustainability advocates 
                  working together to create meaningful technological solutions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-success/10 rounded-full w-fit">
                  <Award className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sustainability, innovation, and user-centric design drive everything we do. 
                  We believe technology should serve both people and planet.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already saving money and reducing waste with ShelfAware
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="fresh" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;