import Dashboard from "@/component/dashbord/admin";
import { useAuth } from "@/context/AuthContext";

const DashbordPage = () => {
  const { user } = useAuth();
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashbordPage;
