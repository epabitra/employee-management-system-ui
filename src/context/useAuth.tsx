import { userProfile } from "@/models/User"
import { loginAPI, registerAPI } from "@/services/auth-service"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { SignupFormValues } from "@/models/SignupForm"
import { CURRENT_USER_DETAILS } from "@/constants/ApiConstant"


type userContextType = {
    user: userProfile | null
    token: string | null
    registerUser: (userDetails: any) => Promise<boolean>
    loginUser: (email: string, password: string) => void
    logout: () => void
    isLoggedIn: () => boolean
    loading: boolean
}

type Props = { children: React.ReactNode }

const userContext = createContext<userContextType>({} as userContextType)

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<userProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (user && token) {
            try {
                setUser(JSON.parse(user))
                setToken(token)
                axios.defaults.headers.common["Authorization"] = "Bearer " + token
            } catch (error) {
                logout();
            }
        }
        setLoading(false)
    }, [])


    const decodeTokenToUser = (token: string): userProfile => {
        const decoded: any = jwtDecode(token)

        return {
            email: decoded?.email || "",
            roles: decoded?.roles || "",
        }
    }


    const fetchCurrentUserDetails = async (): Promise<userProfile | null> => {
        try {
            const res = await axios.get(CURRENT_USER_DETAILS); 
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch current user details:", error);
            return null;
        }
    };



    const registerUser = async (userDetails: SignupFormValues): Promise<boolean> => {
        console.log("registerUser received:", userDetails);
        try {
            const res = await registerAPI(userDetails);
            console.log("Signup payload being sent:", res)
            if (res) {
                const decodedUser = decodeTokenToUser(res.data.token)
                localStorage.setItem("user", JSON.stringify(decodedUser));
                console.log(decodedUser)

                const token = res?.data.token!
                localStorage.setItem("token", token)

                setToken(token);

                const fullUser = await fetchCurrentUserDetails();
                if (fullUser && token) {
                    setUser(fullUser);
                    localStorage.setItem("userDetails", JSON.stringify(fullUser));
                }

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                toast.success("Signup Successfull");
                navigate("/");
                return true;

            } else {
                toast.warning("Server error occured!");
                return false;
            }
        } catch (error) {
            toast.warning("Server error occured!");
            console.error("Signup failed:", error);
            return false;
        }
    }



    const loginUser = async (email: string, password: string) => {
        try {
            await loginAPI(email, password).then(async (res) => {
                if (res) {
                    const decodedUser = decodeTokenToUser(res.data.token)
                    localStorage.setItem("user", JSON.stringify(decodedUser))

                    const token = res?.data.token!
                    localStorage.setItem("token", token)

                    const fullUser = await fetchCurrentUserDetails();
                    if (fullUser && token) {
                        setUser(fullUser);
                        localStorage.setItem("userDetails", JSON.stringify(fullUser));
                    }

                    setToken(res?.data.token!)
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    toast.success("Login Successfull!")
                    navigate("/")
                }
            })
                .catch(() => toast.warning("Server error occured!"))
        } catch (error) {
            console.error("Signup failed:", error)
        }
    }

    const isLoggedIn = () => {
        return !!user
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setToken(null)
        toast.success("Logout Successfull");
        navigate("/login")
    }

    return (
        <userContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser, loading }}>
            {children}
            {/* {loading ? children : null} */}
        </userContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(userContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}