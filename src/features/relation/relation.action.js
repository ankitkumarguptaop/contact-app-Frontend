import { createAsyncThunk } from "@reduxjs/toolkit";
import { listRelationType } from "./relation.type";
import { listRelationService } from "../../services/relation.service";

export const listRelation = createAsyncThunk(listRelationType, async () => {
  try {
    const res = await listRelationService();
    const data = res.data;
    console.log("relation data", data);
    return data;
  } catch (error) {
    console.log({ errorMessage: error });
  }
});
