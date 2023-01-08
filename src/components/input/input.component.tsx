import { forwardRef } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  label?: string;
}

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, IInput>((props, ref) => {
  const { value, name, onChange, type, placeholder, label, ...restProps } = props;

  return (
    <div className='w-full max-w-[400px]'>
      <label className='font-regularMedium mb-1' htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        className='font-regularMedium text-base w-full px-5 py-3 drop-shadow-brutal rounded-md border-2 border-solid border-black mb-5 focus:outline-none'
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
});
