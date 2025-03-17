"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Logo() {
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState<string>("placeholder.svg");

  useEffect(() => {
    setLogoSrc(resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg");
  }, [resolvedTheme]);

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        width={40}
        height={40}
        alt="MailGo logo"
        className="h-20 w-20"
        priority
				suppressHydrationWarning
      />
      <h1 className="text-3xl font-bold">MailGo</h1>
    </Link>
  );
}
