export const DownRightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1270_7221)">
        <g clipPath="url(#clip1_1270_7221)">
          <mask
            id="mask0_1270_7221"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={21}
            height={21}
          >
            <path
              d="M20.7969 20.8H0.796875V0.799988H20.7969V20.8Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_1270_7221)">
            <path
              d="M20.7969 14.4364L10.7969 20.8V15.3455H6.35242C3.2891 15.3455 0.796875 13.3064 0.796875 10.8V0.799988H3.0191V10.8C3.0191 12.3036 4.51465 13.5272 6.35242 13.5272H10.7969V8.07271L20.7969 14.4364Z"
              fill="#0054AE"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1270_7221">
          <rect
            width={20}
            height={20}
            fill="white"
            transform="translate(0.796875 0.799988)"
          />
        </clipPath>
        <clipPath id="clip1_1270_7221">
          <rect
            width={20}
            height={20}
            fill="white"
            transform="translate(0.796875 0.799988)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownRightIcon;
