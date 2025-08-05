import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const DonorNetwork = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Donor Network</h1>
        <p className="text-muted-foreground">Connect with our community of donors</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Active Donors</span>
          </CardTitle>
          <CardDescription>View and manage donor connections</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Donor network features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorNetwork;