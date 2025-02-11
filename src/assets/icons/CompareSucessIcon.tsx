export const CompareSucessIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#0054AE", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#93c5fd", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        d="M17.8125 17.8125H2.1875"
        stroke="white"
        strokeLinecap="round"
        fill="#2563eb"
      />
      <path
        d="M17.0312 17.8125V11.9531C17.0312 11.3059 16.5066 10.7812 15.8594 10.7812H13.5156C12.8684 10.7812 12.3438 11.3059 12.3438 11.9531V17.8125"
        stroke="white"
        strokeWidth="1.2"
        fill="#3b82f6"
      />
      <path
        d="M12.3438 17.8125V4.53125C12.3438 3.4264 12.3437 2.87397 12.0005 2.53073C11.6573 2.1875 11.1048 2.1875 10 2.1875C8.89516 2.1875 8.34272 2.1875 7.99948 2.53073C7.65625 2.87397 7.65625 3.4264 7.65625 4.53125V17.8125"
        stroke="white"
        strokeWidth="1.2"
        fill="url(#gradient)"
      />
      <path
        d="M7.65625 17.8125V8.04688C7.65625 7.39966 7.13159 6.875 6.48438 6.875H4.14062C3.49341 6.875 2.96875 7.39966 2.96875 8.04688V17.8125"
        stroke="white"
        strokeWidth="1.2"
        fill="url(#gradient)"
      />
    </svg>
  );
};

export default CompareSucessIcon;
