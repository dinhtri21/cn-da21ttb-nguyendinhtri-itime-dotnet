import { Dashboard } from "@/app/(user)/user/_components/dashboardCustomer";
import NavigationCusomer from "@/app/(user)/user/_components/navigationCusomer";

export default function UserPage() {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-300px)] py-4">
      <NavigationCusomer />
      <Dashboard />
    </div>
  );
}
