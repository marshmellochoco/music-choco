import Skeleton from "react-loading-skeleton";

const TrackSkeleton = ({ id }) => {
    return (
        <div key={`track_skeleton_${id}`}>
            <div>
                <div className="grid grid-cols-6 items-center w-full py-2 px-4 hover:bg-red-50 ">
                    <div className="col-span-3">
                        <Skeleton />
                        <div className="artistList">
                            <Skeleton className="linkItem" />
                        </div>
                    </div>
                    <div className="col-span-2" />
                    <Skeleton className="col-span-1 text-right" />
                </div>
                <hr />
            </div>
        </div>
    );
};

export default TrackSkeleton;
