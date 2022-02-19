const TrackHeader = ({ album = false }) => {
    return (
        <>
            <div className="track-header">
                <div className="number">#</div>
                <div className="items">
                    <h3 className={album ? "col-span-2" : "col-span-3"}>
                        Track
                    </h3>
                    <span>{album ? "Album" : ""}</span>
                </div>
                <span className="text-right w-20 pr-8">Duration</span>
            </div>
            <hr className="border-b border-primary-100 mx-2" />
        </>
    );
};

export default TrackHeader;
