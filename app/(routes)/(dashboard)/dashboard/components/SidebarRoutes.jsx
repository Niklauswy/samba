'use client'

import {dataSlidebarRoutes} from "@/app/(routes)/(dashboard)/dashboard/components/SidebarRoutes.data";
import SidebarItem from "@/app/(routes)/(dashboard)/dashboard/components/SidebarItem";
import {Badge} from "@/components/ui/badge";

const SidebarRoutes = () => {
    const renderItemsForSection = (section) => {
        return dataSlidebarRoutes
            .filter(item => item.section === section)
            .map((item) => (
                <SidebarItem key={item.label} item={item}>{item.label}</SidebarItem>
            ));
    };

    return (
        <div className="flex flex-col justify-between h-full">

            <div className="p-2 md:p-6  text-black">

                <p className="mb-2 text-slate-500 text-xs font-semibold uppercase">GENERAL</p>
                {renderItemsForSection("general")}


                <p className="mt-10 mb-2 text-slate-500 text-xs font-semibold uppercase">GESTIONAR</p>
                {renderItemsForSection("gestionar")}

                  <p className="mt-10 mb-2 text-slate-500 text-xs font-semibold uppercase">SOPORTE</p>
                {renderItemsForSection("soporte")}


            </div>
            <div className="p-2 md:p-6  text-black text-center">

                <p className="mb-2 text-slate-500 text-xs font-semibold uppercase text-center">UABC 2024 COPYRIGHT</p>
                <Badge color="primary" className="text-center bg-green-600">v1.0.4</Badge>


            </div>
        </div>
    );
};

export default SidebarRoutes;