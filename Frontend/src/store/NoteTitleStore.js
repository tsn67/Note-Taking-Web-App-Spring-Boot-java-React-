import { create } from "zustand";

const titleStore = create((set, get) => ({
    loading: true,
    titles: [], //{id:, title:, date:}
    setLoadingStatus: (input) => set((state) => ({ loading: input })),
    addTitle: (input) =>
        set((state) => ({
            titles: [...state.titles, input],
        })),
    removeTitle: (id) => {
        const { titles } = get();
        const newTitles = titles.filter((obj) => obj.id != id);
        set({ titles: newTitles });
    },
    setAll: (inputs) =>
        set(() => ({
            titles: inputs,
    })),
}));

export { titleStore };
