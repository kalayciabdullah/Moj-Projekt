const StatisticCard = ({ title, amount,img }) => {
    return (
      <div className="card-item bg-blue-500 p-8 rounded-lg">
        <div className="flex gap-x-4">
          <div className="rounded-full bg-white w-16 h-16 p-3">
            <img src={img} alt="" />
          </div>
          <div className="text-white">
            <p className="mb-2 text-lg font-medium text-white">{title}</p>
            <p className="text-xl font-semibold text-white">{amount}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatisticCard;