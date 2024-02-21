import { Controller } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageUploadInterface } from "./interface";
import { memo, useState } from "react";

import AvatarImg from "../../assets/images/avatar.png";

const ImageUploadComponent = ({
  control,
  name,
  defaultValue = "",
}: ImageUploadInterface) => {
  const [files, setFiles] = useState<string | null>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label htmlFor={name} className="cursor-pointer">
          {defaultValue && (
            <LazyLoadImage
              src={files ?? defaultValue}
              effect="blur"
              alt="Avatar"
              className="h-96 w-96 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          {!defaultValue && (
            <LazyLoadImage
              src={files ?? AvatarImg}
              effect="blur"
              alt="Avatar"
              className="h-96 w-96 rounded-full object-cover border-2 border-gray-300"
            />
          )}
          <input
            type="file"
            id={name}
            className="hidden"
            onChange={(e) => {
              setFiles(URL.createObjectURL(e.target.files![0]));
              field.onChange(e.target.files);
            }}
          />
        </label>
      )}
    />
  );
};

export default memo(ImageUploadComponent);
