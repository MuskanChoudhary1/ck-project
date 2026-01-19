export default function CostTable({ data }) {
  if (!data || data.length === 0) {
    return <div style={{ padding: "20px" }}>No data available</div>;
  }

  // Collect all months dynamically
  const months = [
    ...new Set(
      data.flatMap(s => s.monthlyCost.map(m => m.month))
    ),
  ];

  return (
    <table className="cost-table">
      <thead>
        <tr>
          <th>Service</th>
          {months.map((m) => (
            <th key={m}>{m}</th>
          ))}
          <th>Total</th>
        </tr>  
      </thead>

      <tbody>
        {data.map((service) => {
          let total = 0;

          return (
            <tr key={service.name}>
              <td>{service.name}</td>

              {months.map((month) => {
                const found = service.monthlyCost.find(m => m.month === month);
                const cost = found ? found.cost : 0;
                total += cost;

                return (
                  <td key={month}>
                    ${cost.toFixed(2)}
                  </td>
                );
              })}

              <td>
                ${total.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


