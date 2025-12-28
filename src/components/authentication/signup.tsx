import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GoogleIcon from "../../../public/icons/google.png";

interface SignUpProps {
    signInInstead: () => void;
    onClose: () => void;
}

type FormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = ({ signInInstead, onClose }: SignUpProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // User sign up logic:
        const res = fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await res.then(res => res.json());
        if (!data?.success) {
            setLoading(false);
            return;
        };

        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

        const signInRes = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password
        });
        console.log(signInRes)

        if (signInRes?.ok === false) {
            console.log(signInRes.error);
        } else {
            router.push("/dashboard");
            console.log("User authenticated!");
            onClose();
        }
    }
    return (
        <div>
            <div className='flex items-center justify-center flex-col text-center'>
                <h5 className='font-bold text-lg text-gray-900 uppercase'>Sign Up Now</h5>
                <p className='text-gray-700 text-sm'>Sign up to create your account to continue your nursing journey</p>
            </div>

            <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} size={'lg'} variant={'secondary'} className='w-full my-6 rounded-full'>
                <Image src={GoogleIcon || null} alt={"google-icon"} priority width={30} height={30} />
                Continue with Google
            </Button>
            <div className="flex items-center mb-5">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500 font-medium text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2.5'>
                    <Label htmlFor='name'>Full name</Label>
                    <Input type='text' placeholder='John Doe' required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' placeholder='student@nursing.edu' required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' placeholder='Enter password' required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='cpassword'>Confirm password</Label>
                    <Input type='password' placeholder='Confirm password' required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
                <Button size={'lg'} className='w-full mt-4 rounded-full'>{loading ? 'Loading...' : 'Sign Up'}</Button>
            </form>
            <p className='text-gray-700 text-center text-sm mt-3'>Already have an account? <Button variant={'link'} onClick={signInInstead}>Sign In</Button></p>
        </div>
    );
};

export default SignUp;