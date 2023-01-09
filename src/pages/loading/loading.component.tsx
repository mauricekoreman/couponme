import image from "../../assets/adaptive-icon.png";

export const Loading = () => (
  <div className='w-screen h-screen flex items-center justify-center'>
    <img src={image} className='w-72 h-72' />
  </div>
);
