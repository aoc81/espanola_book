import { Link, NavLink } from "react-router-dom";
import { useLocalePath } from "../../lib/siteContext";

export function LocalizedLink({ to, ...props }) {
  const localePath = useLocalePath();
  return <Link to={localePath(to)} {...props} />;
}

export function LocalizedNavLink({ to, ...props }) {
  const localePath = useLocalePath();
  return <NavLink to={localePath(to)} {...props} />;
}
