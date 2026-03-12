"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession, signOut as storeSignOut, AuthSession, getUserById } from "@/lib/auth-store";

type AuthContextType = {
    user: { id: string; email: string; username: string } | null;
    is_verified: boolean;
    loading: boolean;
    signOut: () => void;
    refreshSession: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    is_verified: false,
    loading: true,
    signOut: () => {},
    refreshSession: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ id: string; email: string; username: string } | null>(null);
    const [loading, setLoading] = useState(true);

    const loadSession = () => {
        const session = getSession();
        if (session) {
            setUser({ id: session.userId, email: session.email, username: session.username });
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadSession();
    }, []);

    const signOut = () => {
        storeSignOut();
        setUser(null);
    };

    const refreshSession = () => {
        loadSession();
    };

    return (
        <AuthContext.Provider value={{ user, is_verified: !!user, loading, signOut, refreshSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};