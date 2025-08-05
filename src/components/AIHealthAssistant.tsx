import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

const AIHealthAssistant = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">AI Health Assistant</h1>
        <p className="text-muted-foreground">Your intelligent health companion</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Health Chat</span>
          </CardTitle>
          <CardDescription>Get instant medical guidance and support</CardDescription>
        </CardHeader>
        <CardContent>
          <p>AI health assistant features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthAssistant;