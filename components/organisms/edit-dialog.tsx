import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { editUserData } from "@/store/actions/users";
import { UserData } from "@/types";
import { Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description?: string;
}

export default function EditDialog(props: Props) {
  const dispatch = useDispatch();

  const { isEdit } = useSelector((state: RootState) => state.users);
  const { open, setOpen, title, description } = props;

  const [toast, setToast] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [form, setForm] = useState<any>({
    id: "",
    recentlyActive: 0,
    totalAverageWeightRatings: 0,
    numberOfRents: 0,
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

  const submitHandler = async () => {
    try {
      const bodyData = {
        ...form,
        recentlyActive: Math.floor(
          new Date(form?.recentlyActive).getTime() / 1000
        ),
      };
      await dispatch(editUserData(bodyData as UserData) as any);
      setToast(true);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const date = new Date(isEdit?.recentlyActive * 1000)
        .toISOString()
        .split("T")[0];

      setForm({
        ...isEdit,
        recentlyActive: date,
      });
    }
  }, [isEdit]);

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
            value={form?.totalAverageWeightRatings}
            onChange={changeHandler}
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
            value={form?.numberOfRents}
            onChange={changeHandler}
          />
          <TextField
            required
            margin="dense"
            name="recentlyActive"
            label="Recently Active"
            type="date"
            fullWidth
            variant="filled"
            value={form?.recentlyActive}
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={submitHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast}
        autoHideDuration={2000}
        onClose={() => setToast(false)}
        message="Success Edit User"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
