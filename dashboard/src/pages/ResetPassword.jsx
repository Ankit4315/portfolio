import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllForgotPasswordError,
  resetPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleresetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
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
      dispatch(getUser());
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
              <h1 className="text-3xl font-bold">reset Password</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Set a new password
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {loading ? (
                <SpecialLoadingButton content={"reseting password..."} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleresetPassword}
                >
                  reset password
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
