"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    is_verified: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, session: null, is_verified: false, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [is_verified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    // Only instantiate the Supabase client if we have the required environment variables
    const [supabase] = useState(() =>
        process.env.NEXT_PUBLIC_SUPABASE_URL ? createClient() : null
    );

    useEffect(() => {
        if (!supabase) {
            // Mock mode: set a fake verified student user
            setUser({
                id: 'u1a2f082-d72a-2b28-1008-18b9cad0e1f2',
                email: 'illini_student@illinois.edu',
                user_metadata: { username: 'illini_renter' }
            } as any);
            setIsVerified(true);
            setLoading(false);
            return;
        }

        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                // Fetch profile verification status
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('is_verified')
                    .eq('id', session.user.id)
                    .single();
                setIsVerified(profile?.is_verified ?? false);
            } else {
                setIsVerified(false);
            }

            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('is_verified')
                    .eq('id', session.user.id)
                    .single();
                setIsVerified(profile?.is_verified ?? false);
            } else {
                setIsVerified(false);
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps: supabase is stable via ref, runs only once

    return (
        <AuthContext.Provider value={{ user, session, is_verified, loading }}>
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