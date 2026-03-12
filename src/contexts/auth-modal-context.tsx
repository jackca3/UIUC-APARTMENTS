"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthModalContextType = {
    isOpen: boolean;
    openAuthModal: (reason?: string) => void;
    closeAuthModal: () => void;
    modalReason: string;
};

const AuthModalContext = createContext<AuthModalContextType>({
    isOpen: false,
    openAuthModal: () => {},
    closeAuthModal: () => {},
    modalReason: "",
});

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalReason, setModalReason] = useState("");

    const openAuthModal = (reason = "") => {
        setModalReason(reason);
        setIsOpen(true);
    };

    const closeAuthModal = () => setIsOpen(false);

    return (
        <AuthModalContext.Provider value={{ isOpen, openAuthModal, closeAuthModal, modalReason }}>
            {children}
        </AuthModalContext.Provider>
    );
}

export const useAuthModal = () => useContext(AuthModalContext);
