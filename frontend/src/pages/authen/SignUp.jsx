// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "@/components/common/Form";
import { signupFormControl } from "@/config";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
  role: "user",
};

function SignUp() {
  const [formData, setFormData] = useState(initialState);
  const { setIsAdmin, isAdmin } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();


const updatedFormData = { ...formData, role: isAdmin ? "admin" : "user" };

console.log("Submitting signup with formData:", updatedFormData);
    dispatch(signupUser(updatedFormData)).then((data) => {
      console.log("Signup response:", data);
      if (data?.payload?.success) {
       toast({
          title: data?.payload?.message,
       });
       if (data?.payload?.user?.role === 'admin') {
        setIsAdmin(true); 
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
        });
      }

  return (
    <div className="w-full p-10">
      <h1 className="text-4xl font-bold tracking-tight text-foreground text-center mb-5">
        Sign Up {isAdmin ? "as Admin" : ""}
      </h1>
      <p className="mb-5 text-center text-2xl">
        Already have an account?{" "}
        <Link to="/authen/login" className="hover:underline ml-2 font-medium">
          login
        </Link>
      </p>
      <Form
        formControls={signupFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}

export default SignUp;