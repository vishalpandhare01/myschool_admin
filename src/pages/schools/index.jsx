import Register from "@/component/auth/register";
import DynamicTable from "@/component/share/tabble";

const data = [
  { id: 1, salary: 5000, name: "John Doe", age: 28 },
  { id: 2, salary: 5000, name: "Jane Smith", age: 32 },
  { id: 3, salary: 5000, name: "Alice Brown", age: 24 },
  { id: 4, salary: 5000, name: "Bob Johnson", age: 45 },
  { id: 5, salary: 5000, name: "Charlie Lee", age: 36 },
  { id: 6, salary: 5000, name: "David Lee", age: 29 },
  { id: 7, salary: 5000, name: "Emma Watson", age: 22 },
  { id: 8, salary: 5000, name: "Liam Neeson", age: 60 },
  { id: 9, salary: 5000, name: "Zoe Kravitz", age: 31 },
  { id: 10, salary: 5000, name: "Chris Hemsworth", age: 38 },
];

const columns = [
  { field: "name", headerName: "Name" },
  { field: "age", headerName: "Age" },
  { field: "email", headerName: "Email" },
];

const SchoolsPage = () => {
  return (
    <>
      <DynamicTable data={data} columns={columns} addComponent={<Register />} />
    </>
  );
};

export default SchoolsPage;
