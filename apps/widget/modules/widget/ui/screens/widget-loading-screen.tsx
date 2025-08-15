'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { LoaderIcon } from 'lucide-react';
import {
    errorMessageAtom,
    loadingMessageAtom,
    organizationIdAtom,
    screenAtom,
} from '../../atoms/widget-atoms';
import WidgetHeader from '../componnents/widget-header';
import { useEffect, useState } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@workspace/backend/_generated/api';
import { set } from 'react-hook-form';

type InitStep = 'org' | 'session' | 'settings' | 'vapi' | 'done';

const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
    const [step, setStep] = useState<InitStep>('org');
    const [sessionValid, setSessionValid] = useState<boolean>(false);

    const loadingMessage = useAtomValue(loadingMessageAtom);
    const setErrorMessage = useSetAtom(errorMessageAtom);
    const setLoadingMessage = useSetAtom(loadingMessageAtom);
    const setScreen = useSetAtom(screenAtom);
    const setOrganizationId = useSetAtom(organizationIdAtom);

    const validateOrganization = useAction(api.public.organizations.validate);

    useEffect(() => {
        if (step !== 'org') {
            return;
        }

        setLoadingMessage('Loading organization ID...');

        if (!organizationId) {
            setErrorMessage('Organization ID is required');
            setScreen('error');
            return;
        }

        setLoadingMessage('Verifying organization...');
        validateOrganization({ organizationId }).then((result) => {
            if (result.valid) {
                setOrganizationId(organizationId);
            } else {
                setErrorMessage(result.reason || '');
                setScreen('error');
            }
        }).catch(() => {
            setErrorMessage('Failed to validate organization');
            setScreen('error');
        });
    }, [step, organizationId, setErrorMessage, setScreen]);

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className="text-3xl">Hi there 👋</p>
                    <p className="text-lg">Let&apos;s get you started</p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
                <LoaderIcon className="animate-spin" />
                <p className="text-sm">{loadingMessage || 'Loading...'}</p>
            </div>
        </>
    );
};

export default WidgetLoadingScreen;
