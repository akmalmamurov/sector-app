type Props = React.SVGProps<SVGSVGElement>;
export const ChevronBottomIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width={17}
      height={6}
      viewBox="0 0 17 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.18506 1.91208L7.62256 5.03708L11.06 1.91208"
        stroke="#333333"
        strokeWidth="1.25"
      />
    </svg>
  );
};

export default ChevronBottomIcon;
