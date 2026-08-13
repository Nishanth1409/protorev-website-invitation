import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/data/contact";

type Props = {
  /** light = for cream/light bars; dark = for navy/black bars */
  variant?: "light" | "dark";
  href?: string;
  className?: string;
  size?: "header" | "footer";
  external?: boolean;
};

const SRC = {
  light: "/brand/logo-light.webp",
  dark: "/brand/logo-dark.webp",
} as const;

/**
 * Official Protorev Digital company lockup.
 * Digital light.png → light surfaces; Digital Dark.png → dark surfaces.
 */
export function BrandLogo({
  variant = "light",
  href = "/",
  className = "",
  size = "header",
  external = false,
}: Props) {
  const dims =
    size === "header"
      ? { width: 200, height: 50, className: "h-9 w-auto sm:h-10" }
      : { width: 240, height: 60, className: "h-11 w-auto sm:h-12" };

  const img = (
    <Image
      src={SRC[variant]}
      alt={`${COMPANY.name} logo`}
      width={dims.width}
      height={dims.height}
      priority={size === "header"}
      className={`${dims.className} object-contain object-left`}
    />
  );

  const classes = `inline-flex items-center ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        aria-label={`${COMPANY.name} — home`}
      >
        {img}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={`${COMPANY.name} — home`}>
      {img}
    </Link>
  );
}
