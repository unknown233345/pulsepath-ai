import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Droplets,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  AlertTriangle,
  CheckCircle,
  Brain
} from "lucide-react";
import { toast } from "sonner";

const BloodRequestForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    unitsNeeded: "",
    urgency: "",
    hospital: "",
    city: "",
    contactNumber: "",
    doctorName: "",
    medicalCondition: "",
    additionalNotes: "",
    preferredDate: "",
    preferredTime: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiMatching, setAiMatching] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (Immediate)", color: "destructive" },
    { value: "urgent", label: "Urgent (Within 24 hours)", color: "warning" },
    { value: "routine", label: "Routine (Within 7 days)", color: "success" }
  ];

  const aiPredictions = {
    availabilityScore: 85,
    estimatedWaitTime: "2-4 hours",
    nearbyDonors: 12,
    matchQuality: "Excellent"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.bloodType || !formData.unitsNeeded || !formData.urgency) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setAiMatching(true);

    // Simulate AI matching process
    setTimeout(() => {
      setAiMatching(false);
      setIsSubmitting(false);
      toast.success("Blood request submitted successfully! AI is finding optimal matches.");
      
      // Reset form
      setFormData({
        patientName: "",
        bloodType: "",
        unitsNeeded: "",
        urgency: "",
        hospital: "",
        city: "",
        contactNumber: "",
        doctorName: "",
        medicalCondition: "",
        additionalNotes: "",
        preferredDate: "",
        preferredTime: ""
      });
    }, 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    const level = urgencyLevels.find(u => u.value === urgency);
    return level?.color || "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Blood Request Form</h1>
        <p className="text-muted-foreground">Submit a blood request with AI-powered donor matching</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-primary" />
                <span>Request Details</span>
              </CardTitle>
              <CardDescription>
                Fill in the patient and blood requirement information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Patient Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange("patientName", e.target.value)}
                        placeholder="Enter patient's full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        placeholder="Phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Attending Doctor</Label>
                    <Input
                      id="doctorName"
                      value={formData.doctorName}
                      onChange={(e) => handleInputChange("doctorName", e.target.value)}
                      placeholder="Doctor's name"
                    />
                  </div>
                </div>

                {/* Blood Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Droplets className="h-5 w-5" />
                    <span>Blood Requirements</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type *</Label>
                      <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="unitsNeeded">Units Needed *</Label>
                      <Input
                        id="unitsNeeded"
                        type="number"
                        value={formData.unitsNeeded}
                        onChange={(e) => handleInputChange("unitsNeeded", e.target.value)}
                        placeholder="Number of units"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Location Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Clinic *</Label>
                      <Input
                        id="hospital"
                        value={formData.hospital}
                        onChange={(e) => handleInputChange("hospital", e.target.value)}
                        placeholder="Hospital or clinic name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="alexandria">Alexandria</SelectItem>
                          <SelectItem value="giza">Giza</SelectItem>
                          <SelectItem value="luxor">Luxor</SelectItem>
                          <SelectItem value="aswan">Aswan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Preferred Timing</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medicalCondition">Medical Condition</Label>
                    <Input
                      id="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={(e) => handleInputChange("medicalCondition", e.target.value)}
                      placeholder="e.g., Thalassemia, Surgery, Accident"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      placeholder="Any additional information or special requirements"
                      rows={3}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Request..." : "Submit Blood Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* AI Predictions Sidebar */}
        <div className="space-y-6">
          {/* AI Matching Status */}
          {aiMatching && (
            <Card className="border-primary">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <div>
                    <h3 className="font-semibold">AI Matching in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Finding optimal donors using machine learning...
                    </p>
                  </div>
                  <Progress value={65} className="w-full" />
                  <p className="text-xs text-muted-foreground">Analyzing 1,247 donors</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>AI Predictions</span>
              </CardTitle>
              <CardDescription>
                Real-time availability and match quality analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Availability Score</span>
                  <Badge variant="default">{aiPredictions.availabilityScore}%</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estimated Wait</span>
                  <span className="text-sm font-medium">{aiPredictions.estimatedWaitTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nearby Donors</span>
                  <span className="text-sm font-medium">{aiPredictions.nearbyDonors}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Match Quality</span>
                  <Badge variant="default">{aiPredictions.matchQuality}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Important Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>• Ensure all patient information is accurate</p>
                <p>• For critical cases, call emergency line: <strong>123</strong></p>
                <p>• AI matching considers location, compatibility, and availability</p>
                <p>• You'll receive SMS updates on match progress</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestForm;