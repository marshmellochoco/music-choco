const TrackHeader = ({ album = false }) => {
    return (
        <>
            <div className="track-header">
                <div className="number">#</div>
                <div className="items">
                    <h3>Track</h3>
                    <span>{album ? "Album" : ""}</span>
                    <span className="text-left">Duration</span>
                </div>
            </div>
            <hr className="border-b border-red-100 mx-2" />
        </>
    );
};

export default TrackHeader;
