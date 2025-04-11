import {
  clearAllForgotPasswordError,
  forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordError());
    }

    if (isAuthenticated) {
      navigateTo("/");
    }

    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-1">
        {/* <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <img
          src="/placeholder.svg"
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div> */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="mx-auto w-full max-w-[400px] space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email to request for password
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={"/login"}
                    className="text-sm font-medium underline"
                    prefetch={false}
                  >
                    Remember your password?
                  </Link>
                </div>
              </div>
              {loading ? (
                <SpecialLoadingButton content={"requesting..."} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleForgotPassword}
                >
                  forgot password
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
