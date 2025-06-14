import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
    middleware: (getDefaultMidleware) => getDefaultMidleware({serializableCheck:false})
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']