import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import PatientDashboard from "@/components/PatientDashboard";
import BloodRequestForm from "@/components/BloodRequestForm";
import DonorRegistration from "@/components/DonorRegistration";
import DonorNetwork from "@/components/DonorNetwork";
import PredictiveAnalytics from "@/components/PredictiveAnalytics";
import AIHealthAssistant from "@/components/AIHealthAssistant";
import FloatingChatButton from "@/components/FloatingChatButton";
import AuthPage from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading PulseSync AI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "patient":
        return <PatientDashboard />;
      case "request":
        return <BloodRequestForm />;
      case "register":
        return <DonorRegistration />;
      case "donors":
        return <DonorNetwork />;
      case "analytics":
        return <PredictiveAnalytics />;
      case "ai-assistant":
        return <AIHealthAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />

      <main className="container mx-auto px-4 py-6">
        {renderSection()}
      </main>

      {/* Floating AI Assistant - only show when not on ai-assistant page */}
      {activeSection !== "ai-assistant" && <FloatingChatButton />}
    </div>
  );
};

export default Index;