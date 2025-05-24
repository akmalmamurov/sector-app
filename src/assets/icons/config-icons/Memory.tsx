const Memory = () => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 20 20"
    width="24"
    className="jsx-memory"
  >
    <rect
      x="2"
      y="6"
      width="16"
      height="8"
      rx="2"
      stroke="url(#memoryGradient)"
      strokeWidth="2"
      fill="url(#memoryGradient)"
    />
    <path
      d="M5 10h10M5 12h10"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="memoryGradient"
        x1="2"
        y1="6"
        x2="18"
        y2="14"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#2563EB" />
      </linearGradient>
    </defs>
  </svg>
);

export default Memory;
