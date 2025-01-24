import Register from "@/component/auth/register";
import DynamicTable from "@/component/share/tabble";
import { useEffect, useState } from "react";
import { getSchoolsApi, updateschoolPaidOrUnpaidsApi } from "../api/school";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const columns = [
  // { field: "ID", headerName: "ID" },
  { field: "FirstName", headerName: "Name" },
  { field: "SchoolName", headerName: "School Name" },
  { field: "Address", headerName: "Address" },
  { field: "Email", headerName: "Email" },
  { field: "MobileNumber", headerName: "Phone" },
  { field: "IsPaidSchool", headerName: "Paid School" },
];

const SchoolsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const [Serach, setSerach] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function fetchSchoolData() {
    try {
      const response = await getSchoolsApi({
        page: page,
        limit: limit,
        school_name: Serach,
        isPaid: isPaid,
      });
      setData(response.data.Data);
      setTotalPage(response.data.Total);
    } catch (error) {}
  }

  async function updateData(row) {
    try {
      console.log("row for update: ", row);
      const response = await updateschoolPaidOrUnpaidsApi(row.ID);
      enqueueSnackbar(response.message);
      fetchSchoolData();
    } catch (error) {}
  }

  useEffect(() => {
    fetchSchoolData();
  }, [page, setPage, Serach, isPaid]);

  return (
    <>
      <DynamicTable
        data={data}
        columns={columns}
        addComponent={<Register />}
        setTotalPage={setTotalPage}
        setPage={setPage}
        setLimit={setLimit}
        totalPage={totalPage}
        page={page}
        limit={limit}
        setSerach={setSerach}
        Serach={Serach}
        updateData={updateData}
      />
      <Button onClick={() => setIsPaid("true")}>Check Paid school</Button>
      <Button onClick={() => setIsPaid("false")}>Check Unpaid school</Button>
      <Button onClick={() => setIsPaid("")}>clear</Button>
    </>
  );
};

export default SchoolsPage;
