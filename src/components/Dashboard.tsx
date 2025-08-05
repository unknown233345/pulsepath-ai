import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Droplets,
  Activity,
  AlertTriangle,
  TrendingUp,
  Heart,
  Calendar,
  Brain,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Donors",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Blood Requests",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: Droplets,
      color: "text-primary"
    },
    {
      title: "Emergency Cases",
      value: "12",
      change: "-8%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Successful Matches",
      value: "156",
      change: "+18%",
      trend: "up",
      icon: Heart,
      color: "text-success"
    }
  ];

  const bloodInventory = [
    { type: "O+", available: 45, needed: 60, percentage: 75 },
    { type: "A+", available: 32, needed: 40, percentage: 80 },
    { type: "B+", available: 18, needed: 25, percentage: 72 },
    { type: "AB+", available: 8, needed: 12, percentage: 67 },
    { type: "O-", available: 12, needed: 20, percentage: 60 },
    { type: "A-", available: 6, needed: 10, percentage: 60 },
    { type: "B-", available: 4, needed: 8, percentage: 50 },
    { type: "AB-", available: 2, needed: 5, percentage: 40 }
  ];

  const recentActivities = [
    { id: 1, type: "donation", message: "New donor registered - Ahmed M.", time: "5 min ago", icon: Users },
    { id: 2, type: "request", message: "Blood request from Cairo Hospital", time: "12 min ago", icon: Droplets },
    { id: 3, type: "match", message: "Successful match for patient #1234", time: "25 min ago", icon: Heart },
    { id: 4, type: "emergency", message: "Emergency request - O- blood type", time: "1 hour ago", icon: AlertTriangle }
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor blood management operations and AI-powered insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-primary" />
              <span>Blood Type Inventory</span>
            </CardTitle>
            <CardDescription>Current stock levels and requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bloodInventory.map((blood, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{blood.type}</Badge>
                    <span className="text-sm">{blood.available}/{blood.needed} units</span>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(blood.percentage)}`}>
                    {blood.percentage}%
                  </span>
                </div>
                <Progress value={blood.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest system updates and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* AI Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI Health Assistant</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Intelligent symptom analysis and health guidance
            </p>
            <Button variant="outline" size="sm">
              View Assistant
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered demand forecasting and optimization
            </p>
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Emergency System</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time emergency response and coordination
            </p>
            <Button variant="outline" size="sm">
              Emergency Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;