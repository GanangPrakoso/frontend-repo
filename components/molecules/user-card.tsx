import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

export interface UserData {
  id: string;
  recentlyActive: number;
  totalAverageWeightRatings: number;
  numberOfRents: number;
}

interface Props {
  data: UserData;
  index: number;
  editHandler: (data: UserData) => void;
}

export default function UserCard(props: Props) {
  const { data, index, editHandler } = props;

  const date = new Date(data?.recentlyActive * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 2,
        boxShadow: 3,
        width: { xs: "100%", sm: "initial" },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          User {index + 1}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          id: {data?.id}
        </Typography>

        <Typography variant="body1">
          Total Average Weight Ratings: {data?.totalAverageWeightRatings}
        </Typography>
        <Typography variant="body1">
          Number of Rents: {data?.numberOfRents}
        </Typography>
        <Typography variant="body1">recently Active: {date}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => editHandler(data)} startIcon={<EditIcon />}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
