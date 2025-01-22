// components/Register.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import {
  PersonAdd,
  Email,
  Phone,
  School,
  Lock,
  CameraAlt,
} from "@mui/icons-material";
import { registerUserApi } from "@/pages/api/user";
import { useSnackbar } from "notistack";

const Register = () => {
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    schoolName: "",
    email: "",
    mobileNumber: "",
    address: "",
    isPaidSchool: false,
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar(); // Hook to trigger snackbars
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   console.log(formData);
      const response = await registerUserApi(formData);
      enqueueSnackbar(response.message)
      console.log("response; ", response.message);
    } catch (error) {}
  };

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required";
    if (!formData.schoolName) errors.schoolName = "School Name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.role) errors.role = "Role is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* School Logo Image */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <label htmlFor="image-upload">
            <input
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            <IconButton component="span">
              <CameraAlt />
            </IconButton>
          </label>
          {formData.image && (
            <img
              src={formData.image}
              alt="School Logo"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          )}
        </Box>

        {/* First Name */}
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ marginBottom: 2 }}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ marginBottom: 2 }}
        />

        {/* School Name */}
        <TextField
          fullWidth
          label="School Name"
          variant="outlined"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          error={!!errors.schoolName}
          helperText={errors.schoolName}
          sx={{ marginBottom: 2 }}
        />

        {/* Address */}
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={!!errors.address}
          helperText={errors.address}
          sx={{ marginBottom: 2 }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        {/* Mobile Number */}
        <TextField
          fullWidth
          label="Mobile Number"
          variant="outlined"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          error={!!errors.mobileNumber}
          helperText={errors.mobileNumber}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />

        {/* Is Paid School */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <InputLabel sx={{ marginRight: 2 }}>Is Paid School?</InputLabel>
          <Select
            name="isPaidSchool"
            value={formData.isPaidSchool}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </Box>

        {/* Role Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="school">School</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
          {errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          startIcon={<PersonAdd />}
          onClick={validate}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
