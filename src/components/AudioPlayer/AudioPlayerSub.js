import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp, mdiVolumeHigh } from "@mdi/js";

const AudioPlayerSub = ({ openQueue, setOpenQueue, volume, setVolume }) => {
    const [openVol, setOpenVol] = useState(false);

    return (
        <div className="flex justify-end items-center mr-2 gap-2">
            <div
                className={`rounded-full hover:bg-red-200 flex items-center cursor-pointer justify-end w-40 ${
                    openVol && "pl-2 pr-4"
                }`}
                onMouseEnter={() => setOpenVol(true)}
                onMouseLeave={() => setOpenVol(false)}
            >
                <Icon
                    path={mdiVolumeHigh}
                    title="Volume"
                    className="icon-small fill-current text-pink-600"
                />
                <input
                    type="range"
                    className={`w-full ${!openVol && "hidden"}`}
                    defaultValue={volume * 100}
                    onChange={(e) => setVolume(e.target.value / 100)}
                />
            </div>
            {openQueue ? (
                <div className="btn-icon" onClick={() => setOpenQueue(false)}>
                    <Icon
                        path={mdiChevronDown}
                        title="Hide queue"
                        className={
                            "icon-small fill-current mx-2.5 text-pink-600"
                        }
                    />
                </div>
            ) : (
                <div className="btn-icon" onClick={() => setOpenQueue(true)}>
                    <Icon
                        path={mdiChevronUp}
                        title="Show queue"
                        className={
                            "icon-small fill-current mx-2.5 text-pink-600"
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default AudioPlayerSub;
