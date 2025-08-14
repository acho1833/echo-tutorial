'use client';

import WidgetFooter from '../componnents/widget-footer';
import WidgetHeader from '../componnents/widget-header';
import WidgetAuthScreen from '../screens/widget-auth-screen';

type Props = {
    organizationId: string;
};

const WidgetView = ({ organizationId }: Props) => {
    return (
        <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            <WidgetAuthScreen />
            {/* <WidgetFooter /> */}
        </main>
    );
};

export default WidgetView;
