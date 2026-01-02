<<<<<<< HEAD
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AppRole = "admin" | "user" | "farmer";

interface User {
  id: string;
  email: string;
  name: string;
  role: AppRole;
}

interface AuthContextType {
  user: User | null;
=======
import { createContext, useContext, useState, ReactNode } from "react";

type AppRole = "admin" | "user" | "farmer";

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    role: AppRole;
  };
}

interface AuthContextType {
  user: MockUser | null;
  session: any;
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
  userRole: AppRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role?: AppRole) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
<<<<<<< HEAD
  farmerStatus: string | null;
  rejectionReason: string | null;
  checkFarmerStatus: (email: string) => Promise<void>;
=======
  isApprovedFarmer: boolean;
  farmerStatus: string | null;
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
const API_URL = "/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [farmerStatus, setFarmerStatus] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRole(parsedUser.role);
      if (parsedUser.role === "farmer") {
        checkFarmerStatus(parsedUser.email);
      }
    }
    setLoading(false);
  }, []);

  const checkFarmerStatus = async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/farmer/status/${email}`);
      if (response.ok) {
        const data = await response.json();
        setFarmerStatus(data.status);
        setRejectionReason(data.rejectionReason);
      }
    } catch (error) {
      console.error("Failed to check farmer status", error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: AppRole = "user") => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setUserRole(data.user.role);

      if (data.user.role === "farmer") {
        setFarmerStatus("pending");
      }

=======
// Mock user storage (in-memory for demo)
const mockUsers: Map<string, { password: string; user: MockUser; role: AppRole; farmerStatus?: string }> = new Map();

// Add a demo admin user
mockUsers.set("admin@agrimart.com", {
  password: "admin123",
  user: {
    id: "admin-001",
    email: "admin@agrimart.com",
    user_metadata: { full_name: "Admin User", role: "admin" },
  },
  role: "admin",
});

// Add a demo farmer user
mockUsers.set("farmer@agrimart.com", {
  password: "farmer123",
  user: {
    id: "farmer-001",
    email: "farmer@agrimart.com",
    user_metadata: { full_name: "Demo Farmer", role: "farmer" },
  },
  role: "farmer",
  farmerStatus: "approved",
});

// Add a demo regular user
mockUsers.set("user@agrimart.com", {
  password: "user123",
  user: {
    id: "user-001",
    email: "user@agrimart.com",
    user_metadata: { full_name: "Demo User", role: "user" },
  },
  role: "user",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [isApprovedFarmer, setIsApprovedFarmer] = useState(false);
  const [farmerStatus, setFarmerStatus] = useState<string | null>(null);

  const signUp = async (email: string, password: string, fullName: string, role: AppRole = "user") => {
    try {
      if (mockUsers.has(email)) {
        throw new Error("User already exists");
      }
      
      const newUser: MockUser = {
        id: `user-${Date.now()}`,
        email,
        user_metadata: { full_name: fullName, role },
      };
      
      mockUsers.set(email, {
        password,
        user: newUser,
        role,
        farmerStatus: role === "farmer" ? "pending" : undefined,
      });
      
      // Auto login after signup
      setUser(newUser);
      setSession({ user: newUser });
      setUserRole(role);
      
      if (role === "farmer") {
        setFarmerStatus("pending");
        setIsApprovedFarmer(false);
      }
      
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
<<<<<<< HEAD
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid email or password");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setUserRole(data.user.role);

      if (data.user.role === "farmer") {
        await checkFarmerStatus(email);
      }

=======
      const userData = mockUsers.get(email);
      
      if (!userData || userData.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      setUser(userData.user);
      setSession({ user: userData.user });
      setUserRole(userData.role);
      
      if (userData.role === "farmer") {
        setFarmerStatus(userData.farmerStatus || "pending");
        setIsApprovedFarmer(userData.farmerStatus === "approved");
      }
      
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
<<<<<<< HEAD
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserRole(null);
    setFarmerStatus(null);
    setRejectionReason(null);
=======
    setUser(null);
    setSession(null);
    setUserRole(null);
    setIsApprovedFarmer(false);
    setFarmerStatus(null);
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
  };

  return (
    <AuthContext.Provider
      value={{
        user,
<<<<<<< HEAD
=======
        session,
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
        userRole,
        loading,
        signUp,
        signIn,
        signOut,
<<<<<<< HEAD
        farmerStatus,
        rejectionReason,
        checkFarmerStatus,
=======
        isApprovedFarmer,
        farmerStatus,
>>>>>>> b280f82256a15bbfa9407e39e52a335cd3da42db
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
