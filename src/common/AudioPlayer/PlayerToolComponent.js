/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Icon from '@mdi/react';
import { mdiArchive, mdiVolumeHigh, mdiVolumeMute } from '@mdi/js';

export const PlayerToolComponent = ({ volume, lastVolume, changeVolume, toggleQueue }) => {
	// styles
	const playerVolumeStyle = css`
		display: flex;
		justify-content: flex-end;
		grid-row: 1/3;
		grid-column: 3;

		& svg {
			padding: 4px;
			width: 1.8em;
			cursor: pointer;
			margin: 0 10px;

			&:hover {
				opacity: 0.7;
			}
		}

		& > div {
			display: flex;
			& > div {
				@media (max-width: 768px) {
					display: none;
				}
			}
		}
	`;

	// markdown
	return (
		<div css={playerVolumeStyle}>
			<div>
				<Icon path={mdiArchive} onClick={toggleQueue} />
			</div>

			<div>
				{volume === 0 ? (
					<Icon path={mdiVolumeMute} onClick={() => changeVolume(lastVolume)} />
				) : (
					<Icon path={mdiVolumeHigh} onClick={() => changeVolume(0)} />
				)}

				<Slider
					onChange={(value) => {
						changeVolume(value / 100);
					}}
					transform={volume * 100 - 100}
				/>
			</div>
		</div>
	);
};

const Slider = ({ onChange, transform }) => {
	const sliderStyle = css`
		width: 96%;
		margin: auto 2%;
		background-color: grey;
		height: 0.3em;
		border-radius: 2px;
		overflow: hidden;
	`;

	const sliderFrontStyle = css`
		width: 100%;
		height: 100%;
		background-color: green;
	`;

	const sliderBackStyle = css`
		cursor: pointer;
		width: 100%;
		height: 100%;
		opacity: 0;
		margin: auto 0;
		float: right;
		transform: translateY(-100%);
	`;

	return (
		<div css={sliderStyle}>
			<div css={sliderFrontStyle} style={{ transform: `translateX(${transform}%)` }} />
			<input css={sliderBackStyle} type='range' onChange={(e) => onChange(e.target.value)} />
		</div>
	);
};
