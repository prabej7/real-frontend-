import AppSidebar from "@/components/user/SideBar"
import React from 'react';

interface Props {
    title: string;
    selected: string;
    children: React.ReactNode;
    titleOptions?: React.ReactNode;
}

const Section: React.FC<Props> = ({
    selected,
    title,
    children,
    titleOptions,
}) => {
    return (
        <div className="flex w-full min-h-screen ">
            <AppSidebar selected={selected} />
            <div className="flex-grow p-12">
                <div className="flex justify-between" style={{ width: '100%' }}>
                    <h1 className="font-bold text-xl text-indigo-500">{title}</h1>
                    {titleOptions}
                </div>
                <div className="overflow-auto">{children}</div>
            </div>
        </div>
    );
};

export default Section;