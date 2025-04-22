"use client";
import Image from "next/image";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Resource } from "@/app/types/resource";

import { useFetchResources } from "../hooks/useFetchResources";
import { useFetchResourceEdit } from "../hooks/useFetchResourceEdit";
// import Resource from "@/app/types/resource";
// import ResourceCard from "../(homepage)/resources/ResourceCard";
//  import {redirect} from 'next/navigation'

// import {getUser} from '@/auth'
// import cookies from 'next/headers'

export default function AdminDashboard() {
  // const user = getUser(await cookies())
  // if (user == null || !user.admin) {
  //   return redirect('/login')
  // }

  const [activeTab, setActiveTab] = useState("new");
  const router = useRouter();
  // const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const { resources, refetch: refetchResources } = useFetchResources();
  const { editResources, refetch: refetchEditResources } =
    useFetchResourceEdit();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to update the status of a resource
  const handleStatusChange = async (resourceId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error(
          `Failed to update resource status: ${response.statusText}`
        );
        return;
      }

      await refetchResources();
      await refetchEditResources();

      // const updatedResource = await response.json();

      // Update state with the new resource status
      // setFilteredResources((prevResources) =>
      //   prevResources.map((resource) =>
      //     resource.id === resourceId
      //       ? { ...resource, status: updatedResource.status }
      //       : resource
      //   )
      // );

      // setResources((prev) =>
      //   prev.map((res) =>
      //     res.id === resourceId ? { ...res, status: newStatus } : res
      //   )
      // );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to log out the current user
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredByStatus = resources.filter((resource) => {
    if (activeTab == "new") return resource.status == "PENDING";
    if (activeTab == "approved") return resource.status == "APPROVED";
    if (activeTab == "rejected") return resource.status == "REJECTED";
  });
  const filteredByEditStatus = editResources.filter((res) => {
    if (activeTab == "edit") return res.status == "PENDING";
  });

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
            {/* show names */}
            <h2 className="text-xl font-bold mb-4">Hello Admin</h2>

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
            <p className="text-gray-600">Manage your resources</p>

            {/* More dashboard content here */}
            <div className=" flex space-x-4 mb-4">
              {/* new  */}
              <button
                className={`px-4 py-2 ${
                  activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("new")}
              >
                New Submissions
              </button>
              {/* edit */}
              <button
                className={`px-4 py-2 ${
                  activeTab === "edit"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("edit")}
              >
                Edit Submissions
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("approved")}
              >
                Approved
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "rejected"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("rejected")}
              >
                Rejected
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Index
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      View Details
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Approve
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xl font-semibold">
                      Reject
                    </th>
                  </tr>
                </thead>

                {/* content  */}
                <tbody>
                  {filteredByStatus.map((resource, index) => (
                    <tr key={resource.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{resource.name}</td>
                      {/* add link to view details  */}
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 space-x-2">
                        {(resource.status === "PENDING" ||
                          resource.status === "REJECTED") && (
                          <button
                            onClick={() =>
                              handleStatusChange(resource.id, "APPROVED")
                            }
                            className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                          >
                            👍
                          </button>
                        )}
                      </td>

                      <td>
                        {(resource.status === "APPROVED" ||
                          resource.status === "PENDING") && (
                          <button
                            onClick={() =>
                              handleStatusChange(resource.id, "REJECTED")
                            }
                            className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                          >
                            👎
                          </button>
                        )}
                      </td>
                      {/* get submitted by name and email */}
                    </tr>
                  ))}
                </tbody>

                {/* edit resource */}
                <tbody>
                  {filteredByEditStatus.map((resource, index) => (
                    <tr key={resource.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{resource.name}</td>
                      {/* add link to view details  */}
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() =>
                            handleStatusChange(resource.id, "APPROVED")
                          }
                          className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                          👍
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleStatusChange(resource.id, "REJECTED")
                          }
                          className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          👎
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
