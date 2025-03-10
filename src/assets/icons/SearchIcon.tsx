
export const SearchIcon= (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_32_964)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5931 15.4397H16.4965L22.2026 21.1573L20.4988 22.8611L14.7812 17.155V16.2516L14.4725 15.9314C13.1689 17.0521 11.4765 17.7267 9.63546 17.7267C5.53026 17.7267 2.20264 14.3991 2.20264 10.2939C2.20264 6.18874 5.53026 2.86111 9.63546 2.86111C13.7406 2.86111 17.0682 6.18874 17.0682 10.2939C17.0682 12.135 16.3936 13.8274 15.2729 15.131L15.5931 15.4397ZM4.20264 10.3611C4.20264 13.4044 6.65931 15.8611 9.70264 15.8611C12.7459 15.8611 15.2026 13.4044 15.2026 10.3611C15.2026 7.31778 12.7459 4.86111 9.70264 4.86111C6.65931 4.86111 4.20264 7.31778 4.20264 10.3611Z"
          fill={props.color ? props.color : "#0054AE"}
        />
      </g>
      <defs>
        <clipPath id="clip0_32_964">
          <rect
            width={24}
            height={24}
            fill="white"
            transform="translate(0.202637 0.861115)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
