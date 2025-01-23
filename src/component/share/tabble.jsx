import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const DynamicTable = ({ data, columns, addComponent }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleActionClick = (action, id) => {
    // Handle Edit, Delete, and View actions here
    console.log(`${action} clicked for ID: ${id}`);
  };

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    columns.some(
      (col) =>
        row[col.field] &&
        row[col.field]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
  );

  // Handle opening and closing the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Paper sx={{ marginTop: 8, width: "100%", overflow: "hidden" }}>
      {/* Add New School Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ marginBottom: 2 }}
      >
        Add New
      </Button>

      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>{row[col.field]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      onClick={() => handleActionClick("view", row.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleActionClick("edit", row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleActionClick("delete", row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add New School Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <span>Add New School</span> */}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>{addComponent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DynamicTable;
