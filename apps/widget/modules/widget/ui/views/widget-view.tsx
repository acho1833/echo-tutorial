'use client';

import WidgetFooter from './componnents/widget-footer';
import WidgetHeader from './componnents/widget-header';

type Props = {
    organizationId: string;
};

const WidgetView = ({ organizationId }: Props) => {
    return (
        <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className='text-3xl'>Hi there 👋</p>
                    <p className='text-lg'>How can we help you today?</p>
                </div>
            </WidgetHeader>
            <div className='flex flex-1'>Widget View {organizationId}</div>
            <WidgetFooter />
        </main>
    );
};

export default WidgetView;
