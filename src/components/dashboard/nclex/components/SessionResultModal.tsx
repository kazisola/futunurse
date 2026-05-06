import { ISessionResult } from '@/types/NCLEX';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Download, Goal } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';

interface SessionResultModalProps {
    result: ISessionResult | null;
    onResetSession: () => void;
}

const SessionResultModal = ({ result, onResetSession }: SessionResultModalProps) => {
    console.log("Result:", result);
    const hasSaved = useRef(false);
    const isOpen = Boolean(result);

    useEffect(() => {
        if (!result) return;
        if (hasSaved.current) return;

        hasSaved.current = true;

        const handleSaveSession = async () => {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/nclex/sessions`,
                    { ...result, category: result.category }
                );
                console.log("Saved session:", res);
            } catch (err) {
                console.error("Error saving session:", err);
            }
        };

        handleSaveSession();
    }, [result]);
    
    return (
        <Dialog open={isOpen}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className='flex flex-col items-center'>
                    <Goal size={60} className='text-green-600 bg-green-600/30 p-3 rounded-full' />
                    <h2 className='text-gray-700 font-bold text-xl mt-3 mb-2'>Session Complete!</h2>
                    <p className='text-sm text-gray-600'>Great job on completing your practice session</p>
                    <h1 className='mt-7 mb-2 font-bold text-4xl text-green-600'>{result?.score}%</h1>
                    <p className='text-gray-700'>You scored {result?.correctAnswers} out of {result?.totalQuestions} questions correctly</p>
                    <div className='w-full my-7'>
                        <div className='flex items-center justify-between text-gray-800 text-sm mb-2'>
                            <p>Session Result</p>
                            <p>{result?.score}%</p>
                        </div>
                        <Progress value={result?.score} />
                    </div>
                    <div className='w-full grid grid-cols-2 gap-3'>
                        <div className='border border-green-500/10 bg-green-500/10 p-2 rounded-md text-center'>
                            <h4 className='font-semibold text-green-600 text-2xl'>{result?.correctAnswers}</h4>
                            <p className='text-sm text-gray-600'>Correct</p>
                        </div>
                        <div className='border border-red-500/10 bg-red-500/10 p-2 rounded-md text-center'>
                            <h4 className='font-bold text-red-600 text-2xl'>{(result?.totalQuestions ?? 0) - (result?.correctAnswers ?? 0)}</h4>
                            <p className='text-sm text-gray-600'>Incorrect</p>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-3 my-7'>
                        <Button size={'lg'} onClick={onResetSession}>Practice Again</Button>
                        <Button size={'lg'} variant={'outline'}><Download /> Export Result</Button>
                    </div>
                    <Button onClick={() => redirect("/dashboard/nclex")} className='w-full' size={'lg'} variant={'outline'}>Back to NCLEX</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SessionResultModal;