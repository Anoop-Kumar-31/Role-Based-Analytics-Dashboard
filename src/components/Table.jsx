import React from "react";

const Table = ({ HeadingData, bodyData, actionData, type = "normal" }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl max-h-[calc(100vh-200px)] border border-[var(--border)] shadow-card">
      <table className="w-full h-fit border-collapse text-[0.875rem] bg-white rounded-2xl min-w-[700px]">
        <thead>
          <tr className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white text-xs uppercase tracking-wider">
            {HeadingData.th.map((item, index) => {
              const isSticky = type === "special" && index === 0;
              return (
                <th
                  key={index}
                  className={`font-semibold text-left py-3 px-4 whitespace-nowrap
                    ${isSticky ? "sticky z-[1] left-0 bg-[#0F172A]" : ""}
                    ${index === HeadingData.th.length - 1 ? "text-center" : ""}
                    relative
                    ${index == HeadingData.th.length - 1 ? 'flex justify-center ' : 'text-left'}
                  `}
                >
                  {isSticky && (
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10" />
                  )}
                  <span className="flex items-center gap-[5px]">{item.title}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-[var(--border)] last:border-b-0 text-sm hover:bg-[var(--filler)] transition-colors duration-150 even:bg-[#F8FAFC]"
            >
              {Object.values(item).map((value, idx) => {
                const isSticky = type === "special" && idx === 0;
                return (
                  <td
                    key={idx}
                    className={`py-3 px-4 text-wrap break-words text-[var(--text-secondary)]
                      ${isSticky ? "sticky left-0 bg-white" : ""}
                    `}
                  >
                    {isSticky && (
                      <div className="absolute top-0 right-0 h-full w-[1px] bg-[var(--light-grey)]" />
                    )}
                    <span className={`flex items-center gap-[5px] 
                      ${value === "Active" || value === "Enabled" ? "text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs w-fit" : ""}
                      ${value === "Inactive" || value === "Disabled" ? "text-red-600 font-semibold bg-red-50 px-2.5 py-0.5 rounded-full text-xs w-fit" : ""}
                      ${value === "View" ? "text-[var(--primary-accent)] font-medium" : ""}
                    `}>
                      {!value ?
                        <span >--</span>
                        :
                        (idx === 0
                          ? <span className="font-semibold">{value}</span>
                          : value
                        )
                      }
                    </span>
                  </td>
                );
              })}
              <td className="py-3 px-4 whitespace-nowrap">
                <span className="flex items-center gap-2 justify-center">
                  {actionData.map((Action, aIdx) => {
                    if (typeof Action === "function") {
                      return (
                        <React.Fragment key={aIdx}>
                          {Action({ row: item, rowIndex: index, status: item?.status })}
                        </React.Fragment>
                      );
                    } else {
                      return React.cloneElement(Action, { key: aIdx });
                    }
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
