/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiMagnify } from '@mdi/js';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AlbumPageContainer } from './pages/AlbumPage/AlbumPageContainer';
import { AudioPlayerContainer } from './common/AudioPlayer/AudioPlayerContainer';
import { QueueContainer } from './common/Queue/QueueContainer';
import { SearchContainer } from './common/Search/SearchContainer';
import { HomePageContainer } from './pages/HomePage/HomePageContainer';
import { LoginPageContainer } from './pages/LoginPage/LoginPageContainer';
import { EditAlbum } from './pages/AddSong/EditAlbum';

export const MainComponent = ({ username, token, search, openQueue, handleLogout, setSearch }) => {
	// styles
	const appContainerStyle = css`
		height: 90%;
		width: calc(100% - 2rem);
		padding-left: 2rem;
		display: ${openQueue ? 'grid' : 'block'};
		grid-template-columns: 1fr 25rem;
		@media (max-width: 1024px) {
			display: block;
		}
	`;

	const appStyle = css`
		overflow-y: scroll;
		height: 100%;
		padding-right: 1rem;
		@media (max-width: 1024px) {
			display: ${openQueue ? 'none' : 'block'};
		}
	`;

	const appHeaderStyle = css`
		display: flex;
		height: 8vh;
		align-items: center;
		justify-content: space-between;
	`;

	const leftHeaderStyle = css`
		display: flex;
		align-items: center;
		& > h1 {
			min-width: max-content;
		}
	`;

	const searchbarStyle = css`
		height: 2rem;
		padding: 0 0.5rem;
		margin: 0 1rem;
		display: flex;
		align-self: center;
		background-color: var(--contrast-color);
		border-radius: 2rem;
		min-width: 12rem;

		& svg {
			align-self: center;
			margin: 0;
			color: var(--primary-color);
			width: 24px;
			height: 24px;
		}
		& input[type='text'] {
			width: 100%;
			display: flex;
			height: 1em;
			font-size: 1em;
			align-self: center;
			border: none;
			background-color: var(--contrast-color);
			outline: none;
		}
	`;

	const loggedUserStyle = css`
		display: flex;
		height: 2rem;
		min-width: 8rem;
		align-items: center;
		padding: 0 0.5rem;
		margin-right: 1rem;
		cursor: pointer;
		&:hover {
			background-color: var(--thirtiary-color);
		}
		& > svg {
			margin: 0.5rem;
		}
	`;

	// markdown
	return (
		<div className='App' onContextMenu={(e) => e.preventDefault()}>
			<Router basename='/music-choco'>
				{!token || token === '' ? (
					<Switch>
						<Route exact path='/login' component={LoginPageContainer} />
						<Route path='/'>
							<Redirect to='/login' />
						</Route>
					</Switch>
				) : (
					<>
						<div css={appContainerStyle}>
							<div css={appStyle}>
								<div css={appHeaderStyle}>
									<div css={leftHeaderStyle}>
										<h1>music-choco</h1>
										<div css={searchbarStyle}>
											<Icon path={mdiMagnify} />
											<input
												type='text'
												onChange={(e) => setSearch(e.target.value)}
											></input>
										</div>
									</div>
									<div css={loggedUserStyle} onClick={handleLogout}>
										<Icon path={mdiAccountCircle} size={1} />
										<span>{username}</span>
									</div>
								</div>
								<Switch>
									<Route exact path='/'>
										{search === '' ? (
											<HomePageContainer />
										) : (
											<SearchContainer search={search} />
										)}
									</Route>
									<Route path='/login'>
										<Redirect to='/' />
									</Route>
									<Route path='/albums/:id'>
										<AlbumPageContainer />
									</Route>
									<Route path='/addSong'>
										<EditAlbum />
									</Route>
								</Switch>
							</div>
							<QueueContainer openQueue={openQueue} />
						</div>
						<AudioPlayerContainer />
					</>
				)}
			</Router>
		</div>
	);
};
