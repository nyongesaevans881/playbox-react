import { createSlice } from "@reduxjs/toolkit";
import { consoles } from "../constants/1-consoles/consoles.js";
import { controllers } from "../constants/1-consoles/controllers.js";
import { keyboards } from "../constants/2-pc/keyboards.js";
import { mice } from "../constants/2-pc/mice.js";
import { accessories } from "../constants/1-consoles/accessories.js";
import { games } from "../constants/1-consoles/games.js";
import { hardware } from "../constants/2-pc/hardware.js";
import { actionnride } from "../constants/3-ride/actionnride.js";
import { toys } from "../constants/4-toys/toys.js";
import { decor } from "../constants/5-decor/decor.js";
import { furniture } from "../constants/6-furniture/furniture.js";
import { audio } from "../constants/7-audio/audio.js";


const initialState = {
  consoles,
  keyboards,
  controllers,
  mice,
  accessories,
  games,
  hardware,
  actionnride,
  toys,
  decor,
  furniture,
  audio
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
