const TrackHeader = () => {
    return (
        <>
            <div className="flex items-center">
                <div className="w-4 ml-4">#</div>
                <div className="grid grid-cols-6 items-center w-full py-2 px-4">
                    <div className="col-span-3">
                        <h3 className="font-bold">Track</h3>
                    </div>
                    <span className="col-span-2" />
                    <span className="col-span-1 text-right">Duration</span>
                </div>
            </div>
            <hr className="border-b border-red-100 mx-2" />
        </>
    );
};

export default TrackHeader;
