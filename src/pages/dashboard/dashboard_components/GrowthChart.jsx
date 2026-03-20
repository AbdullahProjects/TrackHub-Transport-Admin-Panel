import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const MONTHS = 6;

const buildMonthLabels = () => {
  const labels = [];
  const now = dayjs();
  for (let i = MONTHS - 1; i >= 0; i--) {
    labels.push(now.subtract(i, "month").format("YYYY-MM"));
  }
  return labels;
};

const GrowthChart = ({ drivers, buses }) => {
  const chartData = useMemo(() => {
    const months = buildMonthLabels();
    const driversByMonth = {};
    const busesByMonth = {};

    months.forEach((m) => {
      driversByMonth[m] = 0;
      busesByMonth[m] = 0;
    });

    drivers.forEach((d) => {
      if (!d.registeredDate) return;
      const parsed = dayjs(d.registeredDate, "DD/MM/YYYY");
      if (!parsed.isValid()) return;
      const key = parsed.format("YYYY-MM");
      if (driversByMonth[key] !== undefined) driversByMonth[key]++;
    });

    buses.forEach((b) => {
      if (!b.addedAt) return;
      const ts =
        typeof b.addedAt.toDate === "function"
          ? dayjs(b.addedAt.toDate())
          : dayjs(b.addedAt);
      if (!ts.isValid()) return;
      const key = ts.format("YYYY-MM");
      if (busesByMonth[key] !== undefined) busesByMonth[key]++;
    });

    return months.map((m) => ({
      month: dayjs(m, "YYYY-MM").format("MMM"),
      Drivers: driversByMonth[m],
      Buses: busesByMonth[m],
    }));
  }, [drivers, buses]);

  const hasData = chartData.some((d) => d.Drivers > 0 || d.Buses > 0);

  if (!hasData) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-md bg-white p-5 shadow-md shadow-black/5">
        <p className="text-sm text-textLight">No growth data in the last 6 months</p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white p-5 shadow-md shadow-black/5">
      <h3 className="mb-4 text-base font-semibold text-gray-800">
        Growth over the last 6 months
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 13 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 14 }} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: 13, paddingBottom: 8 }}
          />
          <Bar dataKey="Drivers" fill="#258BA1" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="Buses" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
