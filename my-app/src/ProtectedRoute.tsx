import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ isAuthenticated, children }) => {
  console.log("Protected: ",isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default Protected;
