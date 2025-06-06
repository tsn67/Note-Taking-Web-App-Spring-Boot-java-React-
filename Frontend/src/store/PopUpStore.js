import { create } from "zustand";

const usePopUpStore = create((set) => ({
    type: null,
    message: null,
    setType: (input) => set((state) => ({ type: state.type==null?input:null })),
    setMessage: (msg) => set((state) => ({message: state.message==null?msg:null})),
}));

export {usePopUpStore};