import { baseUserUrl } from "@/constant/baseurl";
import { endPoint } from "@/constant/endpoints";
import axios from "axios";

const config = {
  headers: {
    Authorization: "Bearer ", //+ UserData.token,
  },
};

export async function registerUserApi(data) {
  const url = baseUserUrl + endPoint.Register;

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (err) {
    return err.response
      ? err.response.data
      : err.message || "An error occurred";
  }
}

export async function sendOtpApi(data) {
  const url = baseUserUrl + endPoint.SendOtp;

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (err) {
    return err.response
      ? err.response.data
      : err.message || "An error occurred";
  }
}

export async function veryfyOtpApi(data) {
  const url = baseUserUrl + endPoint.VeryfyOtp;

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (err) {
    return err.response
      ? err.response.data
      : err.message || "An error occurred";
  }
}
