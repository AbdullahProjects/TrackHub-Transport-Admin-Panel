import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { Assigned: "#258BA1", Unassigned: "#d1d5db" };

const DriverAllocationChart = ({ buses }) => {
  const chartData = useMemo(() => {
    let assigned = 0;
    let unassigned = 0;
    buses.forEach((b) => {
      if (b.assignedDriverId) assigned++;
      else unassigned++;
    });
    return [
      { name: "Assigned", value: assigned },
      { name: "Unassigned", value: unassigned },
    ].filter((d) => d.value > 0);
  }, [buses]);

  if (chartData.length === 0) {
    return <EmptyState text="No bus data to display" />;
  }

  return (
    <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
      <h3 className="mb-4 text-base font-semibold text-gray-800">Driver allocation</h3>
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
              <Cell key={entry.name} fill={COLORS[entry.name]} />
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

export default DriverAllocationChart;
