import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description?: string;
}

export default function EditDialog(props: Props) {
  const { open, setOpen, title, description } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const [form, setForm] = useState({
    email: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description && <DialogContentText>{description}</DialogContentText>}
          <TextField
            autoFocus
            required
            margin="dense"
            id="totalAverageWeightRatings"
            name="totalAverageWeightRatings"
            label="Total Average Weight Ratings"
            type="number"
            fullWidth
            variant="filled"
            // value={form?.email}
            // onChange={changeHandler}
          />
          <TextField
            required
            margin="dense"
            id="numberOfRents"
            name="numberOfRents"
            label="number Of Rents"
            type="number"
            fullWidth
            variant="filled"
            // value={form?.email}
            // onChange={changeHandler}
          />
          <TextField
            required
            margin="dense"
            name="recentlyActive"
            label="Recently Active"
            type="date"
            fullWidth
            variant="filled"
            value={null}
            // onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
