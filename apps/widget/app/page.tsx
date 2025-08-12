'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@workspace/backend/_generated/api';
import { Button } from '@workspace/ui/components/button';
import useVapi from '@/modules/widget/hooks/use-vapi';

export default function Page() {
    const addUser = useMutation(api.users.add);
    const { isConnected, isConnecting, isSpeaking, transcript, startCall, endCall } = useVapi();

    return (
        <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
            <Button onClick={() => startCall()}>Start Call</Button>
            <Button onClick={() => endCall()} variant="destructive">
                End Call
            </Button>
            <p>isConnected: {isConnected ? 'Yes' : 'No'}</p>
            <p>isConnecting: {isConnecting ? 'Yes' : 'No'}</p>
            <p>isSpeaking: {isSpeaking ? 'Yes' : 'No'}</p>
            <pre>{JSON.stringify(transcript, null, 2)}</pre>
        </div>
    );
}
