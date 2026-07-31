import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import GoogleIcon from "../../../public/icons/google.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, LucideEyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

interface SignInProps {
    signUpInstead: () => void;
    onClose: () => void;
}

type FormData = {
    email: string;
    password: string;
}

const SignIn = ({ signUpInstead, onClose }: SignInProps) => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        email: 'demo@example.com',
        password: 'Demo123'
    });
    const [showPasswor, setShowPassword] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const signInRes = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password
            });
            if (signInRes?.ok === false) {
                console.log(signInRes.error);
                setError("Invalid username or password")
                setLoading(false);
                setTimeout(() => {
                    setError(null)
                }, 2000)
            } else {
                toast.success("Sign in successful!")
                router.push("/dashboard");
                onClose();
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div className='flex items-center justify-center flex-col text-center'>
                <h5 className='font-bold text-lg text-gray-900 uppercase'>Welcome Back</h5>
                <p className='text-gray-700 text-sm'>Sign in to your account to continue your nursing journey</p>
            </div>
            <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} size={'lg'} variant={'secondary'} className='w-full my-6 rounded-full hover:bg-gray-200'>
                <Image src={GoogleIcon || null} alt={"google-icon"} priority width={30} height={30} />
                Sign in with Google
            </Button>
            <div className="flex items-center mb-5">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500 font-medium text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <form onSubmit={handleSubmit} className='text-center space-y-4'>
                <div className='space-y-2.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' placeholder='student@nursing.edu' required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5 relative'>
                    <Label htmlFor='password'>Password</Label>
                    <Input type={showPasswor ? 'text' : 'password'} placeholder='Enter password' required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button onClick={() => setShowPassword(!showPasswor)} variant={'ghost'} size={'icon'} className='absolute top-6.5 right-0.5' type='button'>
                        {showPasswor ? <Eye /> : <LucideEyeOff />}
                    </Button>
                </div>
                {error &&
                    <strong className='text-red-400 text-xs '>{error}</strong>
                }
                <Button type='submit' size={'lg'} className='w-full mt-4 rounded-full'>{loading ? 'Loading...' : 'Sign In'}</Button>
            </form>
            <p className='text-gray-700 text-center text-sm mt-3'>Don&apos;t have an account? <Button variant={'link'} onClick={signUpInstead} className='w-auto text-sm pl-2'>Sign Up</Button></p>
            <ToastContainer />
        </div>
    );
};

export default SignIn;