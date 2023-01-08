interface IAuthheading {
  title: string;
  subtitle: string;
}

export const AuthHeading = ({ title, subtitle }: IAuthheading) => (
  <div>
    <h2 className='font-displayRegular text-lg'>{subtitle}</h2>
    <h1 className='font-displayRegular text-6xl'>{title}</h1>
  </div>
);
