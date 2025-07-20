import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface Menu {
  id: string;
  name: string;
}

export interface MenuGroup {
  id: string;
  name: string;
  menus: Menu[];
}

interface MenuState {
  menuGroups: MenuGroup[];
}

const initialState: MenuState = {
  menuGroups: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuGroups: (state, action: PayloadAction<MenuGroup[]>) => {
      state.menuGroups = action.payload;
    },
    addMenuGroup: (state, action: PayloadAction<MenuGroup>) => {
      state.menuGroups.push(action.payload);
    },
    removeMenuGroup: (state, action: PayloadAction<string>) => {
      state.menuGroups = state.menuGroups.filter((group) => group.id !== action.payload);
    },
    addMenu: (state, action: PayloadAction<{ groupId: string; menu: Menu }>) => {
      const group = state.menuGroups.find((group) => group.id === action.payload.groupId);
      if (group) {
        group.menus.push(action.payload.menu);
      }
    },
    removeMenu: (state, action: PayloadAction<{ groupId: string; menuId: string }>) => {
      const group = state.menuGroups.find((group) => group.id === action.payload.groupId);
      if (group) {
        group.menus = group.menus.filter((menu) => menu.id !== action.payload.menuId);
      }
    },
  },
});

export const { setMenuGroups, addMenuGroup, removeMenuGroup, addMenu, removeMenu } = menuSlice.actions;

export const selectMenuGroups = (state: RootState) => state.menu.menuGroups;

export default menuSlice.reducer;
