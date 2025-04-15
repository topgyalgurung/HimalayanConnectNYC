import Image from "next/image";
import { useState } from "react";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

import { useFetchUser } from "../hooks/useFetchUsers";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const router = useRouter();
  const user = useFetchUser();

  if (!user) return <p>Loading user data...</p>;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center mt-1">Profile</h1>

      {/* Profile card and dashboard container */}
      <div className="flex flex-row w-full">
        {/* Profile card (takes 30% width) */}
        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={"/default-avatar.jpg"}
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <h2 className="text-xl font-bold mb-4">
              Hello User: {user.firstName}
            </h2>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard (takes 70% width) */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-gray-600">
              Welcome to your dashboard! Here you can manage your resources
            </p>

            {/* More dashboard content here */}
            <div className=" flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 ${
                  activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("new")}
              >
                New
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "suggest"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("suggest")}
              >
                Suggest Edit
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "reviews"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("reviews")}
              >
                Reviews
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "likes"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("likes")}
              >
                Favorites
              </button>
            </div>

            {/* Add content here for submissions */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Index
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Details
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Edit
                    </th>
                  </tr>
                  <tbody>
                    {/* Resources submitted by user */}

                    {activeTab === "new" &&
                      (user.resources.length === 0 ? (
                        <p>No resources submitted yet.</p>
                      ) : (
                        user.resources.map((res, index) => (
                          <tr
                            key={res.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="px6 py-4">{index + 1}</td>
                            <td>{res.name}</td>
                            <td className="text-sm text-gray-600">
                              {res.status}
                            </td>
                            <td>Edit</td>
                          </tr>
                        ))
                      ))}

                    {/* Edit suggestions by user */}
                    {activeTab === "suggest" &&
                      (user.ResourceEditSuggestion.length === 0 ? (
                        <p>No edit suggestions submitted yet.</p>
                      ) : (
                        user.ResourceEditSuggestion.map((edit, index) => (
                          <tr key={edit.id}>
                            <td>{index + 1} </td>
                            <td>{edit.name}</td>
                            <span className="text-sm text-gray-600">
                              {edit.status}
                            </span>
                            <td>Edit</td>
                          </tr>
                        ))
                      ))}

                    {/* reviews */}

                    {/* favorites */}
                  </tbody>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
