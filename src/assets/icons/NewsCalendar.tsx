export const NewsCalendar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      className="mr-xxs"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M7 2H5V3.81827H3C2.44772 3.81827 2 4.26598 2 4.81827V21.0001C2 21.5524 2.44772 22.0001 3 22.0001H21C21.5523 22.0001 22 21.5524 22 21.0001V4.81826C22 4.26598 21.5523 3.81827 21 3.81827H19V2H17V3.81827H7V2ZM17 6.54545V5.81826H7V6.54545H5V5.81826H4V20.0001H20V5.81826H19V6.54545H17ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM17 10H15V12H17V10ZM7 14.0001H9V16.0001H7V14.0001ZM13 14.0001H11V16.0001H13V14.0001ZM15 14.0001H17V16.0001H15V14.0001Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default NewsCalendar;
