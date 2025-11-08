import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();  

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Fetch user details securely from backend
    fetch("http://localhost:5000/api/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user); // your backend should send user data
      })
      .catch(() => {
        
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading account...</p>;

  if (!user)
    return <p className="text-center mt-10 text-red-500">Failed to load user.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Account Details</h2>

      <div className="space-y-3">
        <div className="text-lg">
          <strong className="text-gray-700">Name:</strong> {user.first_name} {user.last_name}
        </div>
        <div className="text-lg">
          <strong className="text-gray-700">Email:</strong> {user.email}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
