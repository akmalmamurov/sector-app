
export const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_19_1150)">
        <g clipPath="url(#clip1_19_1150)">
          <mask
            id="mask0_19_1150"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x={2}
            y={2}
            width={22}
            height={22}
          >
            <path
              d="M23.5994 2.32446H2.76611V23.1578H23.5994V2.32446Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_19_1150)">
            <path
              d="M10.9403 15.5026L10.5956 20.3498C11.0887 20.3498 11.3023 20.138 11.5583 19.8836L13.87 17.6745L18.6599 21.1823C19.5383 21.6719 20.1573 21.4141 20.3943 20.3742L23.5383 5.6415L23.5393 5.64064C23.8179 4.34202 23.0696 3.83421 22.2137 4.15279L3.73279 11.2283C2.47151 11.7179 2.4906 12.421 3.51839 12.7396L8.24321 14.2092L19.218 7.34202C19.7346 7.00001 20.2042 7.18925 19.8179 7.53126L10.9403 15.5026Z"
              fill="#CCCCCC"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_19_1150">
          <rect
            width={25}
            height={25}
            fill="white"
            transform="translate(0.682617 0.241089)"
          />
        </clipPath>
        <clipPath id="clip1_19_1150">
          <rect
            width={25}
            height={25}
            fill="white"
            transform="translate(0.682617 0.241089)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TelegramIcon;
