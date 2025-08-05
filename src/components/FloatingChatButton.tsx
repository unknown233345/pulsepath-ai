import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const FloatingChatButton = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-glow"
      size="icon"
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  );
};

export default FloatingChatButton;