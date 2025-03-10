export const AddressIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_921_30097"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={23}
        height={23}
      >
        <path
          d="M22.6504 0.200012H0.650391V22.2H22.6504V0.200012Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_921_30097)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.07915 2.664L2.47066 5.32176L0.255859 6.48136L1.18353 8.2532L3.39833 7.09361L4.32601 8.86545L0.339369 10.9527L1.26705 12.7246L6.1396 10.1734L7.02552 9.70961L6.56169 8.82369L4.70634 5.28001L2.85098 1.73633L1.07915 2.664ZM3.60711 18.272L6.70783 16.6486L9.95469 22.85L11.7265 21.9223L8.01583 14.835L7.55199 13.9491L6.66607 14.4129L2.67943 16.5002L3.60711 18.272ZM12.3035 15.4868L13.1857 15.025L20.273 11.3143L21.2007 13.0861L14.9955 16.3349L15.7544 17.7993L20.5012 15.3141L21.4289 17.0859L16.6746 19.5751L17.5374 21.2402L15.7617 22.1604L12.7616 16.371L12.3035 15.4868Z"
          fill="#333333"
        />
      </g>
    </svg>
  );
};

export default AddressIcon;
