import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form"
import Http from "../../../utils/http";
import { useState } from "react";

const UpdateUserModal = ({updateflag, setUpdateFlag, handleClose, onUpdate, updateId}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const [nameList, setNamelist] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const handleUpdateOk = (data) => {
    console.log(updateId);
    Http.put(`/api/user/${updateId}`, {
      email: data.email,
      phone: data.phonenumber,
      name: data.username,
      password: data.password,
    })
      .then((data) => {
        onUpdate();
      })
      .catch((err) => {});
    setUpdateFlag(false);
  };
  return (
    <Dialog
      open={updateflag}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "80%", // You can use any valid CSS value here
          maxWidth: "400px", // Optional: you can set a maximum width as well
        },
      }}
    >
      <DialogTitle>Update Company</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          Please input the necessary informations for updating a company.
        </Typography>

        <form onSubmit={handleSubmit(handleUpdateOk)} style={{}}>
          <Controller
            name="username"
            control={control}
            defaultValue={nameList}
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                style={{ marginBottom: "8px", width: "100%" }}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={userEmail}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                style={{ marginBottom: "8px", width: "100%" }}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                style={{ marginBottom: "8px", width: "100%" }}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            defaultValue={userPhone}
            rules={{ required: "Phone Number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                style={{ marginBottom: "8px", width: "100%" }}
                error={!!errors.phonenumber}
                helperText={
                  errors.phonenumber ? errors.phonenumber.message : ""
                }
              />
            )}
          />

          <Stack
            direction={"row"}
            style={{
              justifyContent: "right",
              gap: "8px",
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100px" }}
            >
              Update
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>)
}
export default UpdateUserModal;