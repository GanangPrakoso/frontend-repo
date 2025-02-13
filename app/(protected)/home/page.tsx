"use client";

import { Box, Button, Skeleton } from "@mui/material";
import EditDialog from "@/components/organisms/edit-dialog";
import { useEffect, useState } from "react";
import { UserData } from "@/types";
import UserCard from "@/components/molecules/user-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/store/actions/users";
import { RootState } from "@/store";
import { setIsEdit } from "@/store/slices/users";
import ReplayIcon from "@mui/icons-material/Replay";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state: RootState) => state.users);

  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (value: UserData) => {
    console.log("Edit clicked for:", value);
    setOpenDialog(true);
    dispatch(setIsEdit(value));
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (!openDialog) dispatch(setIsEdit(null));
  }, [openDialog]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          p: 4,
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton
                variant="rounded"
                sx={{ width: { xs: "100%", md: "22%" } }}
                height={220}
                key={i}
              />
            ))}
          </>
        ) : (
          data?.map((el: UserData, i) => (
            <UserCard
              key={`user_key_` + i}
              data={el}
              index={i}
              editHandler={handleEdit}
            />
          ))
        )}
      </Box>

      <EditDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Edit User"
        description="To update user please provide required information."
      />

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={() => dispatch(fetchUserData())}
        >
          <ReplayIcon />
        </Button>
      </Box>
    </>
  );
}
