import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Panel() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100lvh-6.375rem-3.375rem)] max-w-screen">
      <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex items-start gap-16 max-w-[1440px] justify-center">
        <h1 className="text-3xl">Panel</h1>
        <Button
          onClick={() => {
            navigate("/login");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
