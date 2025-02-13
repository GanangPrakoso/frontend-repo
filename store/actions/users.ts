import { Dispatch } from "@reduxjs/toolkit";
import { setData, setIsLoading } from "../slices/users";
import { UserData } from "@/types";

export const fetchUserData = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const res = await fetch(process.env.API_URL + "/fetch-user-data", {
      method: "get",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    const { data } = await res.json();
    dispatch(setData(data));
  } catch (err) {
    throw err;
  } finally {
    setTimeout(() => dispatch(setIsLoading(false)), 500);
  }
};

export const editUserData = (value: UserData) => async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const res = await fetch(
      process.env.API_URL + "/update-user-data/" + value.id,
      {
        method: "put",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(await res.json());
    }

    dispatch(fetchUserData() as any);
  } catch (err) {
    throw err;
  }
};
