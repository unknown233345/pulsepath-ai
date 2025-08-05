import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const PredictiveAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Predictive Analytics</h1>
        <p className="text-muted-foreground">AI-powered insights and forecasting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Analytics Dashboard</span>
          </CardTitle>
          <CardDescription>Data-driven insights for blood management</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Advanced analytics features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;