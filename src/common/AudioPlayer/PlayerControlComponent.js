/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mdiPauseCircleOutline, mdiPlayCircleOutline, mdiSkipNext, mdiSkipPrevious } from '@mdi/js';
import Icon from '@mdi/react';

export const PlayerControlComponent = ({ playing, playPause, nextSong, prevSong }) => {
	// styles
	const playerControlStyle = css`
		text-align: center;

		& > svg {
			height: 100%;
			margin: auto;
			width: 1.8em;
			margin: 0px 12px;
			cursor: pointer;

			&:hover {
				opacity: 0.7;
			}
		}

		& > .play {
			width: 2.5em;
		}
	`;

	// markdown
	return (
		<div css={playerControlStyle}>
			<Icon path={mdiSkipPrevious} onClick={prevSong} />
			{playing ? (
				<Icon
					path={mdiPauseCircleOutline}
					className='play'
					onClick={() => playPause(false)}
				/>
			) : (
				<Icon
					path={mdiPlayCircleOutline}
					className='play'
					onClick={() => playPause(true)}
				/>
			)}
			<Icon path={mdiSkipNext} onClick={nextSong} />
		</div>
	);
};
