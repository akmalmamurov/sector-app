interface Props {
  onNextStep: () => void;
}

export const MyCart = ({ onNextStep }: Props) => {
  return (
    <div>
      <div>asdsad</div>
      <button onClick={onNextStep}>gg</button>
    </div>
  );
};

export default MyCart;
