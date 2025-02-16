interface Props {
  handleNext: () => void;
}

export const MyCart = ({ handleNext }: Props) => {
  return (
    <div>
      as
      <button onClick={handleNext}>gg</button>
    </div>
  );
};

export default MyCart;
