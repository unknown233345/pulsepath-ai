import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Calendar,
  Droplets,
  Activity,
  AlertTriangle,
  Clock,
  FileText,
  Pill,
  TrendingUp,
  Phone
} from "lucide-react";

const PatientDashboard = () => {
  const patientInfo = {
    name: "John Doe",
    bloodType: "B+",
    lastTransfusion: "2024-01-15",
    nextAppointment: "2024-02-15",
    hemoglobinLevel: 9.2,
    targetHemoglobin: 10.5,
    condition: "Thalassemia Major"
  };

  const upcomingAppointments = [
    { date: "2024-02-15", type: "Blood Transfusion", location: "Cairo Medical Center", time: "10:00 AM" },
    { date: "2024-02-20", type: "Iron Chelation Review", location: "Clinic A", time: "2:00 PM" },
    { date: "2024-02-28", type: "Hematologist Consultation", location: "Cairo Medical Center", time: "11:30 AM" }
  ];

  const medications = [
    { name: "Deferasirox", dosage: "500mg", frequency: "Daily", nextDose: "8:00 PM Today" },
    { name: "Folic Acid", dosage: "5mg", frequency: "Daily", nextDose: "Tomorrow 8:00 AM" },
    { name: "Vitamin D", dosage: "1000 IU", frequency: "Weekly", nextDose: "Sunday" }
  ];

  const recentResults = [
    { test: "Hemoglobin", value: "9.2 g/dL", status: "Low", date: "2024-01-10" },
    { test: "Ferritin", value: "2800 ng/mL", status: "High", date: "2024-01-10" },
    { test: "Liver Function", value: "Normal", status: "Normal", date: "2024-01-08" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal': return 'default';
      case 'low': return 'outline';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const hemoglobinPercentage = (patientInfo.hemoglobinLevel / patientInfo.targetHemoglobin) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {patientInfo.name}! Track your health and manage your care.</p>
      </div>

      {/* Patient Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                <p className="text-2xl font-bold">{patientInfo.bloodType}</p>
                <Badge variant="outline">{patientInfo.condition}</Badge>
              </div>
              <Droplets className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Current Hemoglobin</p>
                <p className="text-2xl font-bold">{patientInfo.hemoglobinLevel} g/dL</p>
                <div className="space-y-1">
                  <Progress value={hemoglobinPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">Target: {patientInfo.targetHemoglobin} g/dL</p>
                </div>
              </div>
              <Activity className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Last Transfusion</p>
                <p className="text-lg font-bold">{patientInfo.lastTransfusion}</p>
                <p className="text-xs text-muted-foreground">20 days ago</p>
              </div>
              <Heart className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
                <p className="text-lg font-bold">{patientInfo.nextAppointment}</p>
                <p className="text-xs text-muted-foreground">In 10 days</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Appointments</span>
            </CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.location}</p>
                  <p className="text-xs text-muted-foreground">{appointment.date} at {appointment.time}</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-primary" />
              <span>Current Medications</span>
            </CardTitle>
            <CardDescription>Your prescribed medications and schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-muted-foreground">{medication.dosage} - {medication.frequency}</p>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{medication.nextDose}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Mark Taken
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Recent Test Results</span>
          </CardTitle>
          <CardDescription>Your latest lab results and health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentResults.map((result, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{result.test}</p>
                  <Badge variant={getStatusColor(result.status)}>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-lg font-bold">{result.value}</p>
                <p className="text-xs text-muted-foreground">{result.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Request Blood</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit a blood transfusion request
            </p>
            <Button>
              Make Request
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Health Trends</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View your health progress over time
            </p>
            <Button variant="outline">
              View Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Emergency Help</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get immediate medical assistance
            </p>
            <Button variant="destructive">
              Emergency SOS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;