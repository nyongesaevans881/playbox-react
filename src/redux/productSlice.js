import { createSlice } from "@reduxjs/toolkit";
import { consoles } from "../constants/1-consoles/consoles.js";
import { controllers } from "../constants/1-consoles/controllers.js";
import { keyboards } from "../constants/2-pc/keyboards.js";
import { headphones } from "../constants/2-pc/headphones.js";
import { mice } from "../constants/2-pc/mice.js";
import { accessories } from "../constants/1-consoles/accessories.js";
import { games } from "../constants/1-consoles/games.js";
import { hardware } from "../constants/2-pc/hardware.js";

const initialState = {
  consoles,
  keyboards,
  controllers,
  headphones,
  mice,
  accessories,
  games,
  hardware,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// Selector to get all products
export const selectAllProducts = (state) =>
  Object.values(state.products).flat();

export default productSlice.reducer;
