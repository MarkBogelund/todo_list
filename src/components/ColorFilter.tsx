function ColorFilter({
  handleColorClick,
  className,
}: {
  handleColorClick: (color: string) => void;
  className?: string;
}) {
  return (
    <div className={`${className} flex gap-4`}>
      <button
        onClick={() => handleColorClick("red")}
        className="sm:w-4 w-6 aspect-square rounded-[100%] bg-[#E63A3A]"
      ></button>
      <button
        onClick={() => handleColorClick("yellow")}
        className="sm:w-4 w-6 aspect-square rounded-[100%] bg-[#EFDE82]"
      ></button>
      <button
        onClick={() => handleColorClick("blue")}
        className="sm:w-4 w-6 aspect-square rounded-[100%] bg-[#75C9F8]"
      ></button>
      <button
        onClick={() => handleColorClick("all")}
        className="sm:w-4 w-6 aspect-square rounded-[100%] border-2 border-white"
      ></button>
    </div>
  );
}

export default ColorFilter;
