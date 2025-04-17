import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts"
  
  const data = [
    { month: "Jan", unit1: 2, unit2: 18, unit3: 1 },
    { month: "Feb", unit1: 3, unit2: 10, unit3: 2 },
    { month: "Mar", unit1: 3, unit2: 5, unit3: 6 },
    { month: "Apr", unit1: 4, unit2: 8, unit3: 4 },
    { month: "May", unit1: 1, unit2: 20, unit3: 10 },
  ]
  
  export function SalaryChart() {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="unit1"
              stroke="#FF6B81"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="unit2" stroke="#4B0082" />
            <Line type="monotone" dataKey="unit3" stroke="#FFD166" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }