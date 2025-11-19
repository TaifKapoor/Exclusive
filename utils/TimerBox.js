// components/common/TimerBox.jsx (Optional separate file)

const TimerBox = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-full text-foreground">
      <span className="text-sm font-bold leading-none">{value}</span>
      <span className="text-[10px] font-normal">{label}</span>
    </div>
  );
};

export default TimerBox;