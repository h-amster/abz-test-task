import './Tooltip.scss';

type Props = {
  text: string;
  style?: React.CSSProperties;
};

export const Tooltip: React.FC<Props> = ({ text, style = {} }) => {
  return (
    <div className="tooltip" style={style}>
      {text}
    </div>
  );
};
