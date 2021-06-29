/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const AudioPlayerComponent = ({ children }) => {
	// styles
	const playerStyle = css`
		font-size: 0.8em;
		width: 98%;
		padding: 10px 1%;
		background-color: #303030;
		color: #d0d0d0;
		overflow: hidden;
		position: absolute;
		bottom: 0;

		&:focus {
			outline: none;
		}
	`;

	const playerDetailStyle = css`
		display: grid;
		grid-template-columns: minmax(2rem, 1fr) minmax(4rem, 2fr) minmax(2rem, 0.8fr);
		grid-template-rows: 1fr 1fr;
	`;

	// markdown
	return (
		<div css={playerStyle}>
			<div css={playerDetailStyle}>{children}</div>
		</div>
	);
};
