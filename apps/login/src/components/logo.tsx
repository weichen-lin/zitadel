type Props = {
  lightSrc?: string;
  darkSrc?: string;
};

const brandPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand`;

export function Logo({ lightSrc, darkSrc }: Props) {
  return (
    <>
      <img
        className="h-auto w-[150px] max-w-full dark:hidden"
        src={lightSrc || `${brandPath}/parazeni-logo.svg`}
        width={150}
        height={41}
        alt={lightSrc ? "Logo" : "ParaZeni"}
      />
      <img
        className="hidden h-auto w-[150px] max-w-full dark:block"
        src={darkSrc || `${brandPath}/parazeni-logo-white.svg`}
        width={150}
        height={41}
        alt={darkSrc ? "Logo" : "ParaZeni"}
      />
    </>
  );
}
