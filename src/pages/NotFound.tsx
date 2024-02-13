import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className="font-bold text-9xl">404</h1>
      <p className="text-lg">Page not found</p>
      <Button onClick={() => navigate("/")}>Home</Button>
    </div>
  );
}
