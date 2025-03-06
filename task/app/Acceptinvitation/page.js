"use client"

import { useAcceptInvitationMutation } from "@/app/store/authApi";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect,Suspense  } from "react";

const AcceptInvitation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

  const [acceptInvitation, { isLoading }] = useAcceptInvitationMutation();

  useEffect(() => {
    if (!token) {
      alert("Invalid Link ");
      return;
    }

    const handleAccept = async () => {
      try {
        const response = await acceptInvitation(token).unwrap();

        if (response.success) {
          alert("Invitation Accepted");

          // Redirect after clicking OK
          setTimeout(() => {
            router.push(`/resetPassword?token=${response.resetToken}`);
          }, 1000);
        } else {
          alert("Error accepting invitation");
        }
      } catch (error) {
        alert(error.data?.error || "Something went wrong");
      }
    };

    handleAccept();
  }, [token, acceptInvitation]);

  return (
    // <div style={{ textAlign: "center", marginTop: "20px" }}>
    //   {isLoading ? <h2>Processing...</h2> : <h2>Checking Invitation...</h2>}
    // </div>
    <Suspense fallback={<div>Loading...</div>}>
      <AcceptInvitation />
    </Suspense>
  );
};

export default AcceptInvitation;
