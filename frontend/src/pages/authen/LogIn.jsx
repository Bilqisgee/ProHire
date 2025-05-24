// eslint-disable-next-line no-unused-vars
import React, { useState  } from "react";
import Form from "@/components/common/Form";
import { loginFormControl } from "@/config";
import { Link, useOutletContext, useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { loginUser, connectSocket  } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    email: "",
    role: "user",
};

function Login() {
    const [formData, setFormData] = useState(initialState);
    const { isAdmin, setIsAdmin } = useOutletContext(); 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { toast } = useToast();
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("Submitting login with formData:", formData);

        // Set the role to 'admin' if logging in as admin
        const updatedFormData = { ...formData, role: isAdmin ? "admin" : "user" };
        
dispatch(loginUser(updatedFormData)).then((data) => {
    console.log("login response", data);
    if (data?.payload?.success){
        toast({
            title:  data?.payload?.message,
        });
       
        dispatch(connectSocket());

        if (data?.payload?.user?.role === 'admin') {
            setIsAdmin(true); // Set isAdmin to true
            navigate("/admin/profile-admin");
        } else {
            navigate("/user/profile");
        }
    } else {
        toast({
            title: data?.payload?.message,
            variant: "destructive",
        })
    }
    console.log(updatedFormData);
})


     } 

    return (
        <div className="w-full p-10">
            <h1 className="text-4xl font-bold tracking-tight text-foreground text-center mb-5">
                Log In {isAdmin ? "as Admin" : ""}
            </h1>
            <p className="mb-5 text-center text-2xl">
                Create an account?{" "}
                <Link to="/authen/signup" className="hover:underline ml-2 font-medium">
                    SignUp
                </Link>
            </p>
            <Form
                formControls={loginFormControl}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText={"LogIn"}
            />
        </div>
    );
}

export default Login;