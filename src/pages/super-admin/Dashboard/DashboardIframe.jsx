import React from "react";

import { Icon } from 'lucide-react';
import { stairsArrowUpRight } from '@lucide/lab';
import { CircleDollarSign, Receipt,IdCard, Users } from 'lucide-react';
// import { IdCardLanyard } from 'lucide-react';
// import './DashboardIframe.css';

const DashboardIframe = ({ active, setActive, iframeData}) => {
    const tabs = [
        { key: "prime", label: "Prime" },
        { key: "revenue", label: "Revenue" },
        { key: "cogs", label: "CoGS" },
        { key: "labors", label: "Labors" },
        { key: "guests", label: "Guests" },
      ];
    // Add icons for each tab
    const icons = {
    prime: <Icon iconNode={stairsArrowUpRight} size={19} strokeWidth={active=="prime"? 2.7:2}/>,
    revenue: <CircleDollarSign size={19} strokeWidth={active=="revenue"? 2.7:2}/>,
    cogs: <Receipt size={19} strokeWidth={active=="cogs"? 2.7:2}/>,
    labors: <IdCard size={19} strokeWidth={active=="labors"? 2.7:2}/>,
    guests: <Users size={19} strokeWidth={active=="guests"? 2.7:2}/>,
    };
  return (
    <div className="w-full h-[90vh] p-5 bg-white ">
      <iframe id="dashboardFrame" width="100%" height="100%" frameborder="0" src="https://embed.domo.com/embed/pages/nxEKD?pfilters=%5B%7B%22column%22%3A%22Master%20Location%22%2C%22operand%22%3A%22IN%22%2C%22values%22%3A%5B%22The%20Stables%20Kitchen%20%26%20Beer%20Garden%22%2C%22Bloom%20Southern%20Kitchen%22%5D%7D%5D&amp;enableFilters=true&amp;lockedFilters=Master%20Location"></iframe>
      {/* <div className="flex rounded-t-[15px] overflow-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`
              flex-1 px-4 py-2 text-center font-medium cursor-pointer transition
              flex items-center justify-center gap-2
              ${active === tab.key
                ? "relative bg-[var(--primary-blue)] rounded-t-[15px] text-white"
                : "bg-[var(--secondary-blue)] text-white hover:brightness-95 rounded-t-[15px]"}
            `}
            onClick={() => setActive(tab.key)}
          >
            {icons[tab.key]}
            <span className={active === tab.key ? "font-semibold" : ""}>{tab.label}</span>
          </div>
        ))}
      </div>
      <div className="min-h-[200px] bg-[#f7fbff] rounded-b-[12px] mt-0 p-6 border-2 border-[var(--primary-blue)]">
        Content for <b>{tabs.find((t) => t.key === active).label}</b>
      </div> */}
    </div>
  );
};

export default DashboardIframe;
