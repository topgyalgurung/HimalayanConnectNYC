import Image from "next/image";
import { useState } from "react";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

import { useFetchUser } from "../hooks/useFetchUsers";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "index" | "name" | "status" | "edit";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "index",
    label: "Index",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 100,
  },
];

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
            {/* <div className="overflow-x-auto"> */}
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* Resources submitted by user */}

                    {activeTab === "new" &&
                      (user.resources.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4}>
                            No resources submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        user.resources.map((res, index) => (
                          <TableRow
                            key={res.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell className="px6 py-4">
                              {index + 1}
                            </TableCell>
                            <TableCell>{res.name}</TableCell>
                            <TableCell>{res.status}</TableCell>
                            <TableCell>Edit</TableCell>
                          </TableRow>
                        ))
                      ))}

                    {/* Edit suggestions by user */}
                    {activeTab === "suggest" &&
                      (user.ResourceEditSuggestion.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4}>
                            No edit suggestions submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        user.ResourceEditSuggestion.map((edit, index) => (
                          <TableRow
                            key={edit.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell>{index + 1} </TableCell>
                            <TableCell>{edit.name}</TableCell>
                            <TableCell>{edit.status}</TableCell>
                            <TableCell>Edit</TableCell>
                          </TableRow>
                        ))
                      ))}

                    {/* reviews */}

                    {/* favorites */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={user.ResourceEditSuggestion.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </Paper>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
