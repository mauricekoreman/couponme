interface ISticker extends React.HTMLAttributes<HTMLDivElement> {
  stickerURI: string | null;
  scale?: number;
  className?: string;
}

export const Sticker = ({ stickerURI, scale = 1, className }: ISticker) =>
  stickerURI ? (
    <div
      className={`relative flex justify-center items-center ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <div className='bg-[#FFE4E4] rounded-full h-44 w-44' />
      <img src={stickerURI} className='absolute object-contain w-64 h-64' />
    </div>
  ) : null;
