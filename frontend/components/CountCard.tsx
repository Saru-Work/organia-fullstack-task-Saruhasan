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
      className="flex flex-1 items-center px-10 py-5 justify-between rounded-lg shadow-md"
    >
      <div className="text-5xl">{data.count}</div>
      <div className="text-xl">{data.status}</div>
    </div>
  );
};

export default CountCard;
