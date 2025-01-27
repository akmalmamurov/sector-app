type DiscountProps = React.SVGProps<SVGSVGElement>;

export const DiscountIcon: React.FC<DiscountProps> = (props) => {
  return (
    <svg
      width={21}
      height={20}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L2.70711 14.7071C2.31658 15.0976 1.68342 15.0976 1.29289 14.7071C0.90237 14.3166 0.90237 13.6834 1.29289 13.2929L13.2929 1.29289C13.6834 0.90237 14.3166 0.90237 14.7071 1.29289Z"
        fill="#333333"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 7C5.433 7 7 5.433 7 3.5C7 1.567 5.433 0 3.5 0C1.567 0 0 1.567 0 3.5C0 5.433 1.567 7 3.5 7ZM3.5 5C4.32843 5 5 4.32843 5 3.5C5 2.67157 4.32843 2 3.5 2C2.67157 2 2 2.67157 2 3.5C2 4.32843 2.67157 5 3.5 5Z"
        fill="#333333"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 16C14.433 16 16 14.433 16 12.5C16 10.567 14.433 9 12.5 9C10.567 9 9 10.567 9 12.5C9 14.433 10.567 16 12.5 16ZM12.5 14C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14Z"
        fill="#333333"
      />
    </svg>
  );
};

export default DiscountIcon;
