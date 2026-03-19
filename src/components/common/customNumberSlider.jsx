const CustomNumberSlider = ({
  withNumber = false,
  value,
  onChange,
  min = 0,
  max = 100,
}) => {
  const maxArray = Array.from({ length: max + 1 }, (_, index) => index);

  return (
    <div className="w-full text-[--gray-1]">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="range range-primary"
      />
      {withNumber && (
        <>
          <div className="flex justify-between px-2.5 text-xs">
            {maxArray.map((_, index) => (
              <span key={index}>|</span>
            ))}
          </div>
          <div className="flex justify-between px-2.5 text-xs">
            {maxArray.map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomNumberSlider;
