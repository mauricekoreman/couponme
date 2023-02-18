interface IAuthheading {
  title: string;
  subtitle?: string;
  subtitleClass?: string;
  titleClass?: string;
}

export const AuthHeading = ({ title, subtitle, subtitleClass, titleClass }: IAuthheading) => (
  <div>
    <h2 className={`font-displayRegular text-base ${subtitleClass}`}>{subtitle}</h2>
    <h1
      className={`font-displayRegular text-dynamic leading-none relative after:content-[''] after:h-5 after:w-48 after:-z-10 after:bg-pink after:bg-opacity-40 after:absolute after:bottom-0 after:-translate-x-full after:-skew-x-[30deg] ${titleClass}`}
    >
      {title}
    </h1>
  </div>
);
