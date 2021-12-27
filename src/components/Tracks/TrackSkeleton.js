import Skeleton from "react-loading-skeleton";

const TrackSkeleton = ({ id }) => {
    return (
        <div key={`track_skeleton_${id}`}>
            <div className="track-item">
                <Skeleton className="ml-4" width={"1rem"} />
                <div className="items gap-4">
                    <div>
                        <Skeleton />
                        <div className="artist-list h-6">
                            <Skeleton className="link-item" />
                        </div>
                    </div>
                    <Skeleton />
                    <Skeleton className="text-left" />
                </div>
            </div>
        </div>
    );
};

export default TrackSkeleton;
