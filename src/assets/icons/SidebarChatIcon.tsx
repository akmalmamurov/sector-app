type Props = React.SVGProps<SVGSVGElement>;
export const SidebarChatIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.647 0.361084H1.7582C0.900304 0.361084 0.202637 1.05875 0.202637 1.91664V14.3611L3.9357 11.5611C4.20497 11.3592 4.53248 11.25 4.86907 11.25H12.647C13.5049 11.25 14.2026 10.5523 14.2026 9.69441V1.91664C14.2026 1.05875 13.5049 0.361084 12.647 0.361084ZM12.647 9.69441H4.351C4.01445 9.69441 3.68698 9.80356 3.41774 10.0055L1.7582 11.25V1.91664H12.647V9.69441Z"
        fill="#6AB04C"
      />
    </svg>
  );
};

export default SidebarChatIcon;
