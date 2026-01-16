import Link from "next/link";
import LogoSvg from "../svg/logo-svg";

const Logo = () => {
    return (
        <Link href="/" className="inline-block cursor-pointer">
            <LogoSvg />
        </Link>
    )
}
export default Logo;