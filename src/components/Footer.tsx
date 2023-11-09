import { FaChartBar, FaList, FaPen } from "react-icons/fa";
import Button from "./Button";
import { IconType } from "react-icons/lib";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

type Props = {
  icon: IconType;
  path: string;
};
function FooterTab({ icon, path }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = path === location.pathname;
  return (
    <Button
      icon={icon}
      className={classNames(
        "aspect-square h-full",
        isActive && "text-green-500"
      )}
      onClick={() => navigate(path)}
    />
  );
}
const ROUTES = [
  { icon: FaPen, path: "/" },
  { icon: FaList, path: "/expenditures" },
  { icon: FaChartBar, path: "/analysis" },
];
export default function Footer() {
  return (
    <div className="sticky z-20 bottom-0 h-16 right-0 flex items-center justify-around bg-normal">
      {ROUTES.map(({ icon, path }) => (
        <FooterTab icon={icon} key={path} path={path} />
      ))}
    </div>
  );
}
