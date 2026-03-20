import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  active: "#22c55e",
  maintenance: "#f59e0b",
  inactive: "#9ca3af",
};

const BusStatusChart = ({ buses }) => {
  const chartData = useMemo(() => {
    const counts = { active: 0, maintenance: 0, inactive: 0 };
    buses.forEach((b) => {
      const s = (b.status || "").toLowerCase();
      if (counts[s] !== undefined) counts[s]++;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        key: name,
      }));
  }, [buses]);

  if (chartData.length === 0) {
    return <EmptyState text="No bus data to display" />;
  }

  return (
    <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
      <h3 className="mb-4 text-base font-semibold text-gray-800">Bus status</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={COLORS[entry.key]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, fontSize: 14 }}
            formatter={(value, name) => [`${value} buses`, name]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const EmptyState = ({ text }) => (
  <div className="flex h-[320px] items-center justify-center rounded-md bg-white p-5 shadow-md shadow-black/5">
    <p className="text-sm text-textLight">{text}</p>
  </div>
);

export default BusStatusChart;
