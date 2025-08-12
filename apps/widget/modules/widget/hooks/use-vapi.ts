import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

type TranscriptMessage = {
    role: 'user' | 'assistant';
    text: string;
};

const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // Only for testing the Vapi instance
        const vapiInstance = new Vapi('4c45ce2e-be5f-4079-94fd-30b853e921fe');
        setVapi(vapiInstance);

        vapiInstance.on('call-start', () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on('call-end', () => {
            setIsConnected(false);
            setIsSpeaking(false);
            setIsConnecting(false);
        });

        vapiInstance.on('speech-start', () => {
            setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
            setIsSpeaking(false);
        });

        vapiInstance.on('error', (error) => {
            console.error(error, 'VAPI_ERROR');
            setIsConnecting(false);
        });

        vapiInstance.on('message', (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === 'user' ? 'user' : 'assistant',
                        text: message.transcript,
                    },
                ]);
            }
        });

        return () => {
            vapiInstance?.stop();
        };
    }, []);

    const startCall = () => {
        setIsConnecting(true);
        vapi?.start('f124a76e-42fc-41ce-b56c-1c625489cf7f');
    };

    const endCall = () => {
        setIsConnecting(false);
        vapi?.stop();
    };

    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall,
    };
};

export default useVapi;
