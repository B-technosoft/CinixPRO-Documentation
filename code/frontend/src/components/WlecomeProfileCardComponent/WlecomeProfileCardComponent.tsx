import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinnerComponent from "../LoadingSpinnerComponent/LoadingSpinnerComponent";

import DefaultProfile from "../../assets/images/pngegg.png";

interface WlecomeProfileCardComponentInterface {
  isFetching: boolean;
  profile?: string | null;
  name: string;
  children: React.ReactNode;
}

const WlecomeProfileCardComponent = ({
  isFetching,
  name,
  profile,
  children,
}: WlecomeProfileCardComponentInterface) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white drop-shadow-md divide-y h-[20rem] flex flex-col justify-between rounded-xl">
        <div className="bg-[url('/assets/images/profile-img.png')] flex-1 bg-cover bg-no-repeat bg-center">
          <div className="p-4">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="p-4 flex gap-28">
          <div className="flex flex-col gap-8 relative">
            <div className="absolute bottom-24">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {isFetching && <LoadingSpinnerComponent />}
                  {!isFetching && profile && (
                    <LazyLoadImage
                      effect="blur"
                      src={profile}
                      alt="DefaultProfile"
                    />
                  )}
                  {!isFetching && !profile && (
                    <LazyLoadImage
                      effect="blur"
                      src={DefaultProfile}
                      alt="DefaultProfile"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-[4rem]">
              {!isFetching && profile && (
                <p className="text-base capitalize">{name}</p>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default WlecomeProfileCardComponent;
