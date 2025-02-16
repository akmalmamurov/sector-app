interface Props {
  onNextStep: () => void;
}

export const MyCart = ({ onNextStep }: Props) => {
  return (
    <div>
      as
      <button onClick={onNextStep}>gg</button>
    </div>
  );
};

export default MyCart;
