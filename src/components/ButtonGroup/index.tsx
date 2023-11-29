import classNames from "classnames";
import { IconType } from "react-icons/lib";
import Button, { ButtonColor } from "../Button";

type Props = {
  buttons: {
    id: string;
    text?: string;
    icon?: IconType;
    onClick?: () => void;
    color?: ButtonColor;
  }[];
  className?: string;
};
export default function ButtonGroup({ className, buttons }: Props) {
  return (
    <div className={classNames("flex flex-nowrap", className)}>
      {buttons.map(({ id, text, icon, onClick, color }) => (
        <Button
          key={id}
          text={text}
          onClick={onClick}
          icon={icon}
          color={color}
          className="flex-shrink-0 flex-1 border first:rounded-l-full rounded-none last:rounded-r-full border-gray-500"
        />
      ))}
    </div>
  );
}
