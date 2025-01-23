import { baseUserUrl } from "@/constant/baseurl";
import { endPoint } from "@/constant/endpoints";
import axios from "axios";

const config = {
  headers: {
    Authorization: "Bearer ", //+ UserData.token,
  },
};

export async function getSchoolsApi({ page, limit, school_name, isPaid }) {
  let url =
    baseUserUrl + endPoint.GetSchools + `?limit=${limit}&page=${page + 1}`;
  console.log(school_name);
  if (school_name != "") {
    url = url + `&school_name=${school_name}`;
  }
  if (isPaid != "") {
    url = url + `&isPaid=${isPaid}`;
  }

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (err) {
    return err.response
      ? err.response.data
      : err.message || "An error occurred";
  }
}
