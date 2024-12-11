import { useUser } from '@/store';
import {
    LayoutDashboard,
    LogOut,
    House,
    CirclePlus,
    Inbox,
} from 'lucide-react';
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';

// Menu items.
const items = [
    {
        title: 'Dashboard',
        url: '/account',
        icon: <LayoutDashboard />,
    },
    {
        title: 'Properties',
        url: '/account/properties',
        icon: <House />,
    },
    {
        title: 'Add Properties',
        url: '/account/add-property',
        icon: <CirclePlus />,
    },
    {
        title: "Inbox",
        url: '/account/inbox',
        icon: <Inbox />
    }
];

const AppSidebar: React.FC<{ selected: string }> = ({ selected }) => {
    //eslint-disable-next-line
    const [_, __, removeCookie] = useCookies(['token']);
    const { user } = useUser();
    return (
        <div className="p-12 min-w-80">
            <div>
                <p className="font-bold text-2xl bg-gradient-to-b from-indigo-300 to-indigo-700 inline-block text-transparent bg-clip-text">
                    Real
                </p>
                <p className="text-sm text-slate-700">Hi, {user.email.split("@")[0]}</p>
            </div>
            <div className="border my-3"></div>
            <div>
                <ul className="flex flex-col">
                    {items.map(({ title, url, icon }) => {
                        return (
                            <div key={title} >
                                <Link
                                    className={`py-3 pl-3 flex gap-3 ${title == selected
                                        ? 'bg-gradient-to-t from-indigo-600 bg-indigo-400  rounded-lg'
                                        : 'text-indigo-500'
                                        }`}
                                    to={url}
                                >
                                    <div className={`${title == selected && 'text-white'}`}>
                                        {icon}
                                    </div>

                                    <p className={`${title == selected && 'text-white'}`}>
                                        {title}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </ul>
                <p
                    onClick={() => removeCookie('token')}
                    className="py-3 pl-3 flex gap-3 text-indigo-500 cursor-pointer"
                >
                    <LogOut />
                    Logout
                </p>
            </div>
        </div>
    );
};

export default AppSidebar;