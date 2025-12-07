import React from "react";

const Table = ({ HeadingData, bodyData, actionData, type = "normal" }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl">
      <table className="w-full h-fit border-collapse text-[0.95rem] bg-white rounded-[15px] min-w-[700px]">
        <thead>
          <tr className=" border-b-2 border-[var(--light-grey)] text-sm">
            {HeadingData.th.map((item, index) => {
              const isSticky = type === "special" && index === 0;
              return (
                <th
                  key={index}
                  className={`font-semibold text-left py-[10px] px-[15px] whitespace-nowrap bg-white
                    ${isSticky ? "sticky z-[1] left-0 bg-white" : ""}
                    ${index === HeadingData.th.length - 1 ? "text-center" : ""}
                    relative
                    ${index== HeadingData.th.length - 1 ? 'flex justify-center ' : 'text-left'}
                  `}
                >
                  {isSticky && (
                    <div className="absolute top-0 right-0 h-full w-[1px] bg-[var(--light-grey)]" />
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
              className="border-b-2 border-[var(--light-grey)] last:border-b-0 text-sm"
            >
              {Object.values(item).map((value, idx) => {
                const isSticky = type === "special" && idx === 0;
                return (
                  <td
                    key={idx}
                    className={`py-[10px] px-[15px] text-wrap break-words
                      ${isSticky ? "sticky left-0 bg-white" : ""}
                    `}
                  >
                    {isSticky && (
                      <div className="absolute top-0 right-0 h-full w-[1px] bg-[var(--light-grey)]" />
                    )}
                    <span className={`flex items-center gap-[5px] 
                      ${value === "Active" || value === "Enabled" ? "text-green-700 font-semibold" : ""}
                      ${value === "Inactive" || value === "Disabled" ? "text-red-700 font-semibold" : ""}
                      ${value === "View" ? "text-green-700 font-medium" : ""}
                    `}>
                      {!value ? 
                        <span >--</span> 
                        :
                        ( idx === 0 
                          ? <span className="font-semibold">{value}</span> 
                          : value
                        )
                      }
                    </span>
                  </td>
                );
              })}
              <td className="py-[10px] px-[15px] whitespace-nowrap">
                <span className="flex items-center gap-[8px] justify-center">
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
