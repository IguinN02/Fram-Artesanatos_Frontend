import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/usuario/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return { success: false, error: "Erro ao conectar com o servidor" };
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};