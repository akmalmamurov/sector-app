import { ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MIN = 12621;
const MAX = 291374493;

export default function CustomRangeSlider() {
  const [minVal, setMinVal] = useState(12621);
  const [maxVal, setMaxVal] = useState(291374493);

  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (range.current) {
      const minPercent = (minVal / MAX) * 100;
      const maxPercent = (maxVal / MAX) * 100;
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal]);

  return (
    <div className="space-y-4">
      <p className="text-base font-normal text-textColor">
        Диапазон ({minVal} - {maxVal})
      </p>

      <div className="relative h-4">
        {/* Track */}
        <div className="absolute w-full h-1 rounded bg-superSilver top-1/2 transform -translate-y-1/2" />
        {/* Range */}
        <div
          ref={range}
          className="absolute h-1 bg-cerulean rounded top-1/2 transform -translate-y-1/2"
        />
        {/* Left Thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 1000))
          }
          className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 custom-range"
          style={{ zIndex: minVal > MAX - 100000 ? "5" : "15" }}
        />
        {/* Right Thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 1000))
          }
          className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 custom-range"
        />
      </div>

      <div className="flex gap-4 justify-between">
        <div className="w-1/2 h-[42px] relative">
          <input
            type="number"
            value={minVal}
            className="w-full h-[42px] text-center pr-3 border focus:outline-none text-textColor"
            min={MIN}
            max={MAX}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value < 1) {
                value = 1;
              } else if (value > 9999) {
                value = 9999;
              }
              setMinVal(value);
            }}
          />
          <div className="absolute top-0 h-full right-[10px] flex flex-col justify-center">
            <button
              disabled={minVal === MAX}
              className="cursor-pointer disabled:opacity-60 disabled:cursor-auto"
              onClick={() => setMinVal(minVal + 1)}
            >
              <ChevronUp strokeWidth={2.75} size={16} />
            </button>
            <button
              disabled={minVal === MIN}
              className="cursor-pointer disabled:opacity-60 disabled:cursor-auto"
              onClick={() => setMinVal(minVal - 1)}
            >
              <ChevronUp size={16} strokeWidth={2.75} className="rotate-180" />
            </button>
          </div>
        </div>
        <div className="w-1/2 h-[42px] relative">
          <input
            type="number"
            value={maxVal}
            className="w-full h-[42px] text-center pr-3 border focus:outline-none text-textColor"
            min={MIN}
            max={MAX}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value < 1) {
                value = 1;
              } else if (value > 9999) {
                value = 9999;
              }
              setMaxVal(value);
            }}
          />
          <div className="absolute top-0 h-full right-[10px] flex flex-col justify-center">
            <button
              disabled={maxVal === MAX}
              className="cursor-pointer disabled:opacity-60 disabled:cursor-auto"
              onClick={() => setMaxVal(maxVal + 1)}
            >
              <ChevronUp strokeWidth={2.75} size={16} />
            </button>
            <button
              disabled={maxVal === MIN}
              className="cursor-pointer disabled:opacity-60 disabled:cursor-auto"
              onClick={() => setMaxVal(maxVal - 1)}
            >
              <ChevronUp size={16} strokeWidth={2.75} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          border: 2px solid cerulean;
          background: white;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          border: 2px solid #22c55e;
          background: white;
          cursor: pointer;
        }

        input[type="range"] {
          -webkit-appearance: none;
        }

        input[type="range"]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
