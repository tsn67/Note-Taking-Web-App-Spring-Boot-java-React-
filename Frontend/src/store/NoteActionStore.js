import { create } from "zustand";

const noteActionStore = create((set) => ({
    activeIndex: -1,
    searching: false,
    setSearching: (input) => set((state) => ({searching: input})),
    setActiveIndex: (input)  => set((state) => ({activeIndex: input})),
}))

export {noteActionStore}