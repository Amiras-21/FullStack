"use client";
import { useSendInvitationEmailMutation } from "@/app/store/authApi";

export const sendEmail = async ({ email, firstName, trainerId }) => {
  const [sendInvitationEmail] = useSendInvitationEmailMutation();

  try {
    const response = await sendInvitationEmail({ email, firstName, trainerId }).unwrap();
    return response.success ? "Email Sent Successfully" : "Email Sending Failed";
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw new Error("Failed to send email.");
  }
};
