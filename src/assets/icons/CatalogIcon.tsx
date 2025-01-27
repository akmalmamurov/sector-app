type Props = React.SVGProps<SVGSVGElement>;
export const CatalogIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="6.36133" width={18} height={2} rx={1} fill="currentColor" />
      <rect y="12.3613" width={18} height={2} rx={1} fill="currentColor" />
      <rect y="0.361328" width={18} height={2} rx={1} fill="currentColor" />
    </svg>
  );
};

export default CatalogIcon;
