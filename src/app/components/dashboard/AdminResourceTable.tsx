"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

interface AdminResourceTableProps {
  activeTab: string;
  filteredByStatus: any[];
  filteredByEditStatus: any[];
  onViewClick: (resource: any, event: React.MouseEvent<HTMLElement>) => void;
  onStatusChange: (id: string, status: string) => void;
}

export const AdminResourceTable = ({
  activeTab,
  filteredByStatus,
  filteredByEditStatus,
  onViewClick,
  onStatusChange,
}: AdminResourceTableProps) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {activeTab === "new" || activeTab === "edit" ? (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Approve</TableCell>
                <TableCell>Reject</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {activeTab === "edit" ? (
              filteredByEditStatus.map((resource, index) => (
                <TableRow key={resource.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>
                    <Button onClick={(e) => onViewClick(resource, e)}>View</Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onStatusChange(resource.id, "APPROVED")}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onStatusChange(resource.id, "REJECTED")}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              filteredByStatus.map((resource, index) => (
                <TableRow key={resource.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>
                    <Button onClick={(e) => onViewClick(resource, e)}>View</Button>
                  </TableCell>
                  {activeTab === "new" && (
                    <>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => onStatusChange(resource.id, "APPROVED")}
                        >
                          Approve
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onStatusChange(resource.id, "REJECTED")}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </>
                  )}
                  {activeTab === "approved" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onStatusChange(resource.id, "REJECTED")}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  )}
                  {activeTab === "rejected" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => onStatusChange(resource.id, "APPROVED")}
                      >
                        Approve
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
