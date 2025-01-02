'use client';
import store from "@/redux/store/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import AppRouter from "./appRouter";

export default function AppReduxProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <AppRouter>
            {children}
            </AppRouter>
        </Provider>
    );
}