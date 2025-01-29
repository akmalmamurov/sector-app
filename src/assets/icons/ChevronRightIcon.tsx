type Props = React.SVGProps<SVGSVGElement>;
export const ChevronRightIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width={6}
      height={9}
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.88278 4.68577L0.873321 1.86311C0.586171 1.59378 0.586171 1.15712 0.873321 0.887789C1.16048 0.618459 1.62598 0.618459 1.91318 0.887789L5.44258 4.19817C5.72978 4.46747 5.72978 4.90417 5.44258 5.17347L1.91318 8.48377C1.62598 8.75317 1.16048 8.75317 0.873321 8.48377C0.586171 8.21447 0.586171 7.77777 0.873321 7.50847L3.88278 4.68577Z"
        fill="#555555"
      />
    </svg>
  );
};

export default ChevronRightIcon;
