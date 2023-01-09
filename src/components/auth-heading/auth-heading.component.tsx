interface IAuthheading {
  title: string;
  subtitle?: string;
  subtitleClass?: string;
  titleClass?: string;
}

export const AuthHeading = ({ title, subtitle, subtitleClass, titleClass }: IAuthheading) => (
  <div>
    <h2 className={`font-displayRegular text-base ${subtitleClass}`}>{subtitle}</h2>
    <h1 className={`font-displayRegular text-dynamic ${titleClass}`}>{title}</h1>
  </div>
);
