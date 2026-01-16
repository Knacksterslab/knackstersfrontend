import Link from "next/link";
import { ReactNode } from "react";
import OutlineButton from "../svg/outline-button";
import PrimaryButton from "../svg/primary-button";
interface ButtonProps {
    href?: string;
    className?: string;
    onClick?: () => void;
    variant?: 'outline' | 'default';
    link?: boolean;
    children?: ReactNode;
}

export default function ThemeButton({
    href,
    className,
    onClick,
    variant,
    link
}: ButtonProps) {
    let Component: ReactNode;

    if (link) {
        if (!href) {
            console.warn('Button with link prop requires href');
            return null;
        }

        if (variant === 'outline') {
            Component = <Link href={href} className={className}>
                <OutlineButton />
            </Link>
        }
        else {
            Component = <Link href={href} className={className}>
                <PrimaryButton />
            </Link>
        }
    }
    else {
        if (variant === 'outline') {
            Component = <button className={className} onClick={onClick} type="button">
                <OutlineButton />
            </button>
        }
        else {
            Component = <button className={className} onClick={onClick} type="button">
                <PrimaryButton />
            </button>
        }
    }

    return Component;
}