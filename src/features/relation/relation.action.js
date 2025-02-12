import { createAsyncThunk } from "@reduxjs/toolkit";
import { LIST_RELATION } from "./relation.type";
import { listRelationService } from "../../services/relation.service";

export const listRelation = createAsyncThunk(LIST_RELATION, async () => {
  try {
    const res = await listRelationService();
    const data = res.data;
    console.log("relation data", data);
    return data;
  } catch (error) {
    console.log({ errorMessage: error });
  }
});
