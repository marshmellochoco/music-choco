/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const PlayerDetailComponent = ({ songData, albumUrl }) => {
	// styles
	const playerPlayingStyle = css`
		margin: auto 0;
		grid-row: 1/3;
		text-align: left;
		display: grid;
		grid-template-columns: 64px 1fr;
		grid-template-rows: 1fr 1fr;
		@media (max-width: 768px) {
			display: flex;
			flex-direction: column;
		}
	`;

	const playerIconStyle = css`
		grid-row: 1/3;
		width: 64px;
		height: 64px;

		& > img {
			max-width: 64px;
			max-height: 64px;
			background-color: white;
		}

		@media (max-width: 768px) {
			display: none;
		}
	`;

	const playerTitleStyle = css`
		font-size: 1.2em;
		margin: 0 10px;
		display: flex;
		align-items: flex-end;
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
	`;

	const playerArtistStyle = css`
		font-size: 1em;
		margin: 0 10px;
		display: flex;
		align-items: flex-start;
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
	`;

	// markdown
	return (
		<div css={playerPlayingStyle}>
			<div css={playerIconStyle}>
				<img src={albumUrl} />
			</div>
			<div css={playerTitleStyle}>{songData && songData.songId ? songData.title : '---'}</div>
			<div css={playerArtistStyle}>
				{songData && songData.songId ? songData.artist : '---'}
			</div>
		</div>
	);
};
