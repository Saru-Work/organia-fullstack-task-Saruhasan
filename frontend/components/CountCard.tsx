type DataProp = {
  data: {
    status: string;
    count: number;
    fill: string;
    stroke: string;
  };
};
const CountCard = ({ data }: DataProp) => {
  return (
    <div
      style={{ backgroundColor: data.fill, border: `1px solid ${data.stroke}` }}
      className="flex p-5 gap-2 rounded-2xl shadow-md"
    >
      <div>
        <div className="w-10 h-10 bg-amber-500"></div>
        <div>{data.status}</div>
      </div>
      <div className="text-5xl">{data.count}</div>
    </div>
  );
};

export default CountCard;
