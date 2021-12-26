import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp, mdiVolumeHigh } from "@mdi/js";

const AudioPlayerSub = ({ openQueue, setOpenQueue, volume, setVolume }) => {
    const [openVol, setOpenVol] = useState(true);

    return (
        <div className="player-sub">
            <div
                className={`volume-container ${openVol && "pl-2 pr-4"}`}
                onMouseEnter={() => setOpenVol(true)}
                onMouseLeave={() => setOpenVol(false)}
            >
                <Icon path={mdiVolumeHigh} title="Volume" />
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
                        className="mx-2.5"
                    />
                </div>
            ) : (
                <div className="btn-icon" onClick={() => setOpenQueue(true)}>
                    <Icon
                        path={mdiChevronUp}
                        title="Show queue"
                        className="mx-2.5"
                    />
                </div>
            )}
        </div>
    );
};

export default AudioPlayerSub;
