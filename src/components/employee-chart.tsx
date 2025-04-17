import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "JavaScript", value: 300, color: "#4B0082" },
  { name: "React", value: 150, color: "#FF6B81" },
  { name: "Node.js", value: 100, color: "#FFD166" },
  { name: "Python", value: 80, color: "#06D6A0" },
  { name: "Java", value: 50, color: "#118AB2" },
  { name: "Other", value: 20, color: "#9370DB" },
]

export function EmployeeChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}