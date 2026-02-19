import React from "react";

import { Icon } from 'lucide-react';
import { stairsArrowUpRight } from '@lucide/lab';
import { CircleDollarSign, Receipt, IdCard, Users } from 'lucide-react';

const DashboardIframe = ({ active, setActive, iframeData }) => {
  const tabs = [
    { key: "prime", label: "Prime" },
    { key: "revenue", label: "Revenue" },
    { key: "cogs", label: "CoGS" },
    { key: "labors", label: "Labors" },
    { key: "guests", label: "Guests" },
  ];

  const icons = {
    prime: <Icon iconNode={stairsArrowUpRight} size={19} strokeWidth={active === "prime" ? 2.7 : 2} />,
    revenue: <CircleDollarSign size={19} strokeWidth={active === "revenue" ? 2.7 : 2} />,
    cogs: <Receipt size={19} strokeWidth={active === "cogs" ? 2.7 : 2} />,
    labors: <IdCard size={19} strokeWidth={active === "labors" ? 2.7 : 2} />,
    guests: <Users size={19} strokeWidth={active === "guests" ? 2.7 : 2} />,
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] bg-white rounded-2xl shadow-card border border-[var(--border)] overflow-hidden">
      <iframe
        id="dashboardFrame"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://embed.domo.com/embed/pages/nxEKD?pfilters=%5B%7B%22column%22%3A%22Master%20Location%22%2C%22operand%22%3A%22IN%22%2C%22values%22%3A%5B%22The%20Stables%20Kitchen%20%26%20Beer%20Garden%22%2C%22Bloom%20Southern%20Kitchen%22%5D%7D%5D&amp;enableFilters=true&amp;lockedFilters=Master%20Location"
        className="rounded-2xl"
      />
    </div>
  );
};

export default DashboardIframe;
