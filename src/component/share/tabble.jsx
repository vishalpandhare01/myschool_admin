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
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const DynamicTable = ({
  data,
  columns,
  addComponent,
  totalPage,
  setPage,
  page,
  setLimit,
  limit,
  setSerach,
  Serach,
  updateData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Handle table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSerach(e.target.value);
  };

  const handleActionClick = (action, id) => {
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

  // Handle switch toggle (for IsPaidSchool)
  const handleSwitchChange = (e, row) => {
    try {
      updateData(row);
    } catch (error) {}
  };

  return (
    <Paper sx={{ marginTop: 8, width: "100%", overflow: "hidden" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ marginBottom: 2 }}
      >
        Add New
      </Button>

      <TextField
        label="Search"
        type="text"
        variant="outlined"
        fullWidth
        value={Serach}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>{i + 1 + page * limit}</TableCell>
                {columns.map((col) => (
                  <>
                    {col.field && col.field !== "IsPaidSchool" ? (
                      <TableCell key={col.field}>{row[col.field]}</TableCell>
                    ) : (
                      <TableCell key={col.field}>
                        <Switch
                          checked={row[col.field]}
                          value={row[col]}
                          onChange={(e) => handleSwitchChange(e, row)}
                          color="primary"
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                    )}
                  </>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleActionClick("view", row.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleActionClick("edit", row.id)}>
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

      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={totalPage}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
