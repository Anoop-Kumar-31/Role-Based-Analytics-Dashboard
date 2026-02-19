import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  CircleDollarSign,
  Receipt,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Award,
  Info,
  Percent
} from 'lucide-react';

const DashboardIframe = ({ stats }) => {
  const summary = stats?.summary || {};
  const breakdown = stats?.breakdown || [];
  const trendData = stats?.charts?.revenue_expense_trend || [];

  // --- Derived Calculations ---

  // Profit Margin
  const profitMargin = summary.totalRevenue
    ? ((summary.netProfit / summary.totalRevenue) * 100).toFixed(1)
    : 0;

  // Sort restaurants by Net Profit to find best/worst
  const sortedByProfit = [...breakdown].sort((a, b) => b.net_profit - a.net_profit);
  const bestPerformer = sortedByProfit[0];
  const worstPerformer = sortedByProfit[sortedByProfit.length - 1];

  // Smart Insights Generation
  const insights = useMemo(() => {
    const list = [];
    if (summary.netProfit < 0) {
      list.push(`Overall business is operating at a loss (₹${Math.abs(summary.netProfit)?.toLocaleString()}).`);
    } else {
      list.push(`Overall business is profitable (₹${summary.netProfit?.toLocaleString()}).`);
    }

    if (worstPerformer) {
      const worstRatio = worstPerformer.revenue > 0
        ? ((worstPerformer.expense / worstPerformer.revenue) * 100).toFixed(0)
        : (worstPerformer.expense > 0 ? ">100" : "0");

      if (Number(worstRatio) > 100 || worstPerformer.net_profit < 0) {
        list.push(`${worstPerformer.restaurant_name} expenses exceed revenue (Ratio: ${worstRatio}%).`);
        list.push(`Immediate expense audit recommended for ${worstPerformer.restaurant_name}.`);
      }
    }

    if (bestPerformer && bestPerformer.net_profit > 0) {
      list.push(`${bestPerformer.restaurant_name} is the top performer with ₹${bestPerformer.net_profit?.toLocaleString()} profit.`);
    }

    return list;
  }, [summary, bestPerformer, worstPerformer]);


  // Helper for Expense Ratio Progress Bar
  const renderExpenseRatioBar = (revenue, expense) => {
    const ratio = revenue > 0 ? Math.min((expense / revenue) * 100, 100) : (expense > 0 ? 100 : 0);
    const color = ratio > 90 ? 'bg-red-600' : (ratio > 70 ? 'bg-yellow-500' : 'bg-green-600');

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${ratio}%` }}></div>
        <p className="text-xs text-right mt-1 text-gray-500">{ratio.toFixed(1)}% Exp. Ratio</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full pb-10 overflow-y-auto space-y-8 mt-6">

      {/* 🧭 1. KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                ₹{summary.totalRevenue?.toLocaleString() || '0'}
              </h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <CircleDollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Across {breakdown.length} Restaurants</p>
        </div>

        {/* Expense */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Expense</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                ₹{summary.totalExpense?.toLocaleString() || '0'}
              </h2>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <Receipt className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${summary.netProfit >= 0 ? 'border-green-500' : 'border-red-500 bg-red-50/10'}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Net Profit</p>
              <h2 className={`text-3xl font-bold mt-2 ${summary.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {summary.netProfit < 0 ? '-' : ''}₹{Math.abs(summary.netProfit || 0).toLocaleString()}
              </h2>
            </div>
            <div className={`p-3 rounded-xl ${summary.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              {summary.netProfit < 0 ? <TrendingDown size={24} className="text-red-500" /> : <TrendingUp size={24} className="text-green-500" />}
            </div>
          </div>
          <p className={`text-xs font-medium mt-1 ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {summary.netProfit >= 0 ? 'Profitable' : 'Overall Loss'}
          </p>
        </div>

        {/* Profit Margin */}
        <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${Number(profitMargin) >= 0 ? 'border-green-500' : 'border-red-500'}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Profit Margin</p>
              <h2 className={`text-3xl font-bold mt-2 ${Number(profitMargin) >= 0 ? 'text-gray-800' : 'text-red-700'}`}>
                {profitMargin}%
              </h2>
            </div>
            <div className={`p-3 rounded-xl ${Number(profitMargin) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <Percent size={24} className={Number(profitMargin) >= 0 ? 'text-green-600' : 'text-red-600'} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Net Profit / Revenue</p>
        </div>
      </div>

      {/* 🏢 3. RESTAURANT COMPARISON & INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Left Col: Top/Bottom Performers (taking up 2 cols space on XL) */}
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Award size={20} className="text-yellow-500" />
            Performance Highlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Best Performer */}
            {bestPerformer && (
              <div className={`bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden ${bestPerformer.net_profit >= 0 ? 'border-green-100' : 'border-red-100'}`}>
                <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-xl ${bestPerformer.net_profit >= 0 ? 'bg-green-600' : 'bg-yellow-600'}`}>
                  {bestPerformer.net_profit >= 0 ? '🏆 Best Performer' : '⚠ Least Margin'}
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-4 truncate pr-8">{bestPerformer.restaurant_name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Revenue</span>
                    <span className="font-semibold">₹{bestPerformer.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expense</span>
                    <span className="font-semibold">₹{bestPerformer.expense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="font-medium text-gray-700">Net Profit</span>
                    <span className={`font-bold ${bestPerformer.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{bestPerformer.net_profit?.toLocaleString()}</span>
                  </div>
                  {renderExpenseRatioBar(bestPerformer.revenue, bestPerformer.expense)}
                </div>
              </div>
            )}

            {/* Worst Performer */}
            {worstPerformer && (worstPerformer.restaurant_id !== bestPerformer?.restaurant_id) && (
              <div className={`bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden ${worstPerformer.net_profit >= 0 ? 'border-yellow-100' : 'border-red-100'}`}>
                <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-xl ${worstPerformer.net_profit >= 0 ? 'bg-yellow-500' : 'bg-red-600'}`}>
                  {worstPerformer.net_profit >= 0 ? '⚠ Lowest Margin' : '⚠ High Expense Alert'}
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-4 truncate pr-8">{worstPerformer.restaurant_name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Revenue</span>
                    <span className="font-semibold">₹{worstPerformer.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expense</span>
                    <span className={`font-semibold ${worstPerformer.net_profit >= 0 ? 'text-yellow-600' : 'text-red-500'}`}>₹{worstPerformer.expense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="font-medium text-gray-700">Net Profit</span>
                    <span className={`font-bold ${worstPerformer.net_profit >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>₹{worstPerformer.net_profit?.toLocaleString()}</span>
                  </div>
                  {renderExpenseRatioBar(worstPerformer.revenue, worstPerformer.expense)}
                </div>
              </div>
            )}
          </div>

          {/* Comparative Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
            <h4 className="font-bold text-gray-800 mb-4">Comparison Overview</h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="restaurant_name" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Expense" fill="#F97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="net_profit" name="Net Result" radius={[4, 4, 0, 0]}>
                    {breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.net_profit >= 0 ? '#10B981' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Insights & Timeline */}
        <div className="space-y-6">

          {/* 🚨 Smart Insights Panel */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-400" />
              Financial Insights
            </h3>
            <div className="space-y-3">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 items-start text-sm text-indigo-100 bg-white/10 p-3 rounded-lg">
                  <div className=" min-w-[8px] self-center h-[8px] rounded-full bg-yellow-400" />
                  {insight}
                </div>
              ))}
              {insights.length === 0 && <p className="text-sm text-indigo-200">No critical alerts at this time.</p>}
            </div>
          </div>

          {/* 📅 Daily Timeline (Mini) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h4 className="font-bold text-gray-700">Daily Breakdown</h4>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2 text-right">Net</th>
                    {/* <th className="px-4 py-2 text-right">Status</th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trendData.map((day, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-900">{day.date}</td>
                      <td className={`px-4 py-3 text-right font-bold ${day.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{day.net_profit?.toLocaleString()}
                      </td>
                      {/* <td className="px-4 py-3 text-right">
                         {day.net_profit >= 0 ? '🟢' : '🔴'}
                       </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      {/* 📈 2. TREND CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Financial Trend Analysis
        </h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" axisLine={true} tickLine={true} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={true} tickLine={true} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: 'none' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              {/* Optional: Add Profit Line if desired, or keep simpler with just Rev/Exp */}
              <Area type="monotone" dataKey="net_profit" name="Profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />

            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardIframe;
