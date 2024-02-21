import { LazyLoadImage } from "react-lazy-load-image-component";
import { CredentialCardInterface } from "./interface";

const CredentialCardLayout = ({
  src,
  link,
  title,
}: CredentialCardInterface) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl leading-loose p-8">
      <div className="flex justify-center">
        <figure className="bg-[#4ed9ac] p-2 rounded-xl">
          <LazyLoadImage
            effect="blur"
            src={src}
            alt={src}
            className="w-[5rem]"
          />
        </figure>
      </div>
      <div className="card-body text-center gap-8 justify-center items-center">
        <h2 className="card-title justify-center text-2xl">{title}</h2>
        <a
          href={link}
          target="_blank"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
        >
          Check Demo
        </a>
      </div>
    </div>
  );
};

export default CredentialCardLayout;
