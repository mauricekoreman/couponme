interface ISticker {
  stickerURI: string;
  imageSize?: string;
}

export const Sticker = ({ stickerURI, imageSize = "10rem" }: ISticker) => (
  <div className='flex items-center justify-center self-center relative'>
    <div className='bg-[#FFE4E4] rounded-full' style={{ height: "8rem", width: "8rem" }} />
    <img
      src={stickerURI}
      style={{ height: imageSize, width: imageSize, objectFit: "contain" }}
      className='absolute'
    />
  </div>
);

