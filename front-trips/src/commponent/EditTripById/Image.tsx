import React from 'react';

interface EditTripImageProps {
  imageurl: string | undefined;
}

const EditTripImage: React.FC<EditTripImageProps> = ({ imageurl }) => {
  return (
    <div
      className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"
      style={{
        backgroundImage: `url(${imageurl ||
          'https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_7_i.jpg'})`,
        backgroundSize: 'cover',
      }}
    >
      {/* You can add additional styling or content for the image here */}
    </div>
  );
};

export default EditTripImage;
