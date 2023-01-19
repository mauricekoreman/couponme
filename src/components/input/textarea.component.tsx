import { forwardRef } from "react";

interface IITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  label?: string;
}

type Ref = HTMLTextAreaElement;

export const Textarea = forwardRef<Ref, IITextarea>((props, ref) => {
  const { value, name, placeholder, label, ...restProps } = props;

  return (
    <div className='w-full max-w-[400px]'>
      <label className='font-regularMedium text-lg mb-1' htmlFor={name}>
        {label}
      </label>
      <textarea
        ref={ref}
        className='font-regularMedium text-lg w-full px-5 py-3 drop-shadow-brutal rounded-md border-2 border-solid border-black mb-5 focus:outline-none'
        value={value}
        name={name}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
});

