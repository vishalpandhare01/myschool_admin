import Dashboard from "@/component/dashbord/admin";
import ProtectedRoute from "@/component/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

const DashbordPage = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default DashbordPage;
