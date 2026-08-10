import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuthPopup = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);
    const handleGetStarted = () => {
        if(session) return router.push('/dashboard');
        setShowAuthPopup(true);
    }
    return { showAuthPopup, setShowAuthPopup, handleGetStarted }
}