import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form"
import Http from "../../../utils/http";

const AddWasherModal = ({open, setOpen, handleClose, onAdd}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const handleOk = (data) => {
    setOpen(false);
    Http.post("/api/user", {
      email: data.email,
      password: data.password,
      phone: data.phonenumber,
      name: data.username,
      role: "washer",
    })
      .then((data) => {
        onAdd();
      })
      .catch((err) => {});
  };
  return (
  <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      sx: {
        width: "80%", // You can use any valid CSS value here
        maxWidth: "400px", // Optional: you can set a maximum width as well
      },
    }}
  >
    <DialogTitle>Add Washer</DialogTitle>

    <DialogContent>
      <Typography sx={{ mb: 3 }}>
        Please input the necessary informations for adding a washer.
      </Typography>

      <form onSubmit={handleSubmit(handleOk)} style={{}}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
            Add
          </Button>
        </Stack>
      </form>
    </DialogContent>
  </Dialog>)
}
export default AddWasherModal;