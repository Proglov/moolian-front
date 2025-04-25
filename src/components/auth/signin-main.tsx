'use client'
import { useSearchParams } from "next/navigation"
import SigninPhone from "./signin-phone";
import SigninUsername from "./signin-username";

const USERNAME_TAB = 'username';


export default function SigninMain() {
    const searchParams = useSearchParams()

    const tab = searchParams.get('tab');

    if (tab === USERNAME_TAB)
        return <SigninUsername />;
    return <SigninPhone />;
}
