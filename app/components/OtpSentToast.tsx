"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function OtpSentToast() {
  useEffect(() => {
    toast.success("OTP sent successfully! Check your email.");
  }, []);

  return null;
}
