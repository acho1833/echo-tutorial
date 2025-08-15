'use client';

import { useAtomValue } from 'jotai';
import WidgetAuthScreen from '../screens/widget-auth-screen';
import { screenAtom } from '../../atoms/widget-atoms';
import WidgetErrorScreen from '../screens/widget-error-screen';
import WidgetLoadingScreen from '../screens/widget-loading-screen';

type Props = {
    organizationId: string | null;
};

const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        auth: <WidgetAuthScreen />,
        voice: <p>Todo: Voice</p>,
        inbox: <p>Todo: Inbox</p>,
        selection: <p>Todo: Selection</p>,
        chat: <p>Todo: Chat</p>,
        contact: <p>Todo: Contact</p>,
    };

    return (
        <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {screenComponents[screen]}
        </main>
    );
};

export default WidgetView;
