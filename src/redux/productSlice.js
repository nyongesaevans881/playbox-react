import { createSlice } from "@reduxjs/toolkit";
import { games } from "../constants/2-games/games.js";
import { actionnride } from "../constants/3-ride/actionnride.js";
import { toys } from "../constants/4-toys/toys.js";
import { decor } from "../constants/5-decor/decor.js";
import { furniture } from "../constants/6-furniture/furniture.js";
import { audio } from "../constants/7-audio/audio.js";
import { xbox } from "../constants/1-consoles/xbox.js";
import { playstation } from "../constants/1-consoles/playstation.js";
import { handhelds } from "../constants/1-consoles/handhelds.js"
import { pc } from "../constants/8-pc/pc.js";
import { laptops } from "../constants/9-laptops/laptops.js";


const initialState = {
  games,
  actionnride,
  toys,
  decor,
  furniture,
  audio,
  xbox,
  playstation,
  handhelds,
  pc,
  laptops,
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
