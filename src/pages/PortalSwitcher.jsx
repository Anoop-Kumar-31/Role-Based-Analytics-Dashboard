import React from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";

const PortalSwitcher = ({ portal, setPortal }) => {
    const navigate = useNavigate();

    const portals = [
        { id: "superAdmin", label: "Super Admin", color: "bg-purple-600 hover:bg-purple-700" },
        { id: "restaurantAdmin", label: "Restaurant Admin", color: "bg-blue-600 hover:bg-blue-700" },
        { id: "restaurantEmployee", label: "Employee", color: "bg-green-600 hover:bg-green-700" },
    ];

    const handlePortalSwitch = (portalId) => {
        setPortal(portalId);
        // Navigate to dashboard without full page reload
        navigate("/dashboard");
    };

    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <RefreshCw size={16} />
                    <span className="font-medium">Portal:</span>
                </div>

                <div className="flex gap-2">
                    {portals.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => handlePortalSwitch(p.id)}
                            className={`
                px-3 py-1.5 rounded-md text-white text-sm font-medium
                transition-all duration-200
                ${portal === p.id ? p.color : "bg-gray-400 hover:bg-gray-500"}
                ${portal === p.id ? "ring-2 ring-offset-2 ring-offset-white" : ""}
              `}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortalSwitcher;
