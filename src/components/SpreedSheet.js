import React from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "Name" },
  { key: "age", name: "Age" },
];

const rows = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  // Add more rows as needed
];

const Spreadsheet = () => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      enableCellAutoFocus={false} // Disable auto-focus on cells
    />
  );
};

export default Spreadsheet;
