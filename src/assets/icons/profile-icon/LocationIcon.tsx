export const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.25 22.7002C9.83168 22.7002 5.25 14.0788 5.25 10.1203C5.25 6.02687 8.37947 2.7002 12.25 2.7002C16.1205 2.7002 19.25 6.02687 19.25 10.1203C19.25 14.0788 14.6683 22.7002 12.25 22.7002Z"
        fill="black"
        fillOpacity="0.87"
      />
      <path
        d="M12.25 13.6092C10.317 13.6092 8.75 11.9811 8.75 9.97279C8.75 7.96448 10.317 6.33643 12.25 6.33643C14.183 6.33643 15.75 7.96448 15.75 9.97279C15.75 11.9811 14.183 13.6092 12.25 13.6092Z"
        fill="white"
      />
    </svg>
  );
};

export default LocationIcon;
