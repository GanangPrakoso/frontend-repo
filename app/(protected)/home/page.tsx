"use client";

import { Box } from "@mui/material";
import EditDialog from "@/components/organisms/edit-dialog";
import { useState } from "react";
import { UserData } from "@/types";
import UserCard from "@/components/molecules/user-card";

const data = [
  {
    id: "Z2uFhDbMBLrIT3JMlqRU",
    recentlyActive: 1739386689,
    totalAverageWeightRatings: 5.1,
    numberOfRents: 10,
  },
  {
    id: "c4Yjrv0lxlr7jft1wiiF",
    recentlyActive: 1738938812,
    numberOfRents: 30,
    totalAverageWeightRatings: 4.3,
  },
  {
    id: "iGlIDEdhuy22LyeCGZ0C",
    recentlyActive: 1739387327,
    totalAverageWeightRatings: 44,
    numberOfRents: 10,
  },
];

export default function StickyHeadTable() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (value: UserData) => {
    console.log("Edit clicked for:", value);
    setOpenDialog(true);
  };

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
        {data?.map((el: UserData, i) => (
          <UserCard
            key={`user_key_` + i}
            data={el}
            index={i}
            editHandler={handleEdit}
          />
        ))}
      </Box>
      <EditDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Edit User"
        description="To update user please provide required information."
      />
    </>
  );
}
