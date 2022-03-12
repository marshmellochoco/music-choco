import { useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiClose } from '@mdi/js';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import TrackItem from '../components/Tracks/TrackItem';
import TrackHeader from '../components/Tracks/TrackHeader';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    class QueueHandler {
        constructor() {
            this.requesting = false;
            this.stack = [];
        }

        add(q) {
            if (this.stack.length < 2) {
                return new Promise((resolve, reject) => {
                    this.stack.push(q);
                    this.makeQuery();
                });
            }
            return new Promise((resolve, reject) => {
                this.stack[1] = q;
                this.makeQuery();
            });
        }

        makeQuery() {
            if (!this.stack.length || this.requesting) {
                return null;
            }

            this.requesting = true;
            axios
                .post(`${process.env.REACT_APP_API_URL}/search`, {
                    q: this.stack[0],
                })
                .then((res) => {
                    setData(res.data);
                    setIsLoading(false);
                    this.requesting = false;
                    this.stack.splice(0, 1);
                    this.makeQuery();
                });
        }
    }
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef();
    let queue = new QueueHandler();

    const search = (query) => {
        if (query === '' || !query) {
            return;
        }
        setIsLoading(true);
        queue.add(query);
    };

    const clearInput = () => {
        ref.current.focus();
        ref.current.value = '';
    };

    return (
        <div className='page-content'>
            <h1 className='title'>Search</h1>
            <div>
                <div className='border flex px-2 py-1 gap-2 items-center'>
                    <Link to='/' className='btn-icon'>
                        <Icon path={mdiArrowLeft} className='icon-small' />
                    </Link>
                    <input
                        type='text'
                        className='w-full py-0.5 px-1 outline-none'
                        ref={ref}
                        autoFocus={true}
                        onChange={(e) => search(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') search();
                        }}
                    />
                    <div className='btn-icon' onClick={clearInput}>
                        <Icon path={mdiClose} className='icon-small' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {isLoading && (
                    <div className='flex h-full justify-center mt-8'>
                        <div className='loader' />
                    </div>
                )}
                {!isLoading &&
                    data &&
                    data.tracks.total === 0 &&
                    data.artists.total === 0 &&
                    data.albums.total === 0 && <div>No result found.</div>}
                {!isLoading && data && data.tracks.total > 0 && (
                    <div>
                        <h2 className='title2'>Tracks</h2>
                        <div>
                            <TrackHeader album={true} />
                            {data.tracks.items.map((t, i) => (
                                <TrackItem
                                    i={i + 1}
                                    t={t}
                                    album={true}
                                    key={`search_track_${t.id}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!isLoading && data && data.artists.total > 0 && (
                    <div>
                        <h2 className='title2'>Artists</h2>
                        <div className='card-list'>
                            {data.artists.items.map((a) => (
                                <ArtistCard
                                    artist={a}
                                    key={`search_artist_${a.id}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!isLoading && data && data.albums.total > 0 && (
                    <div>
                        <h2 className='title2'>Albums</h2>
                        <div className='card-list'>
                            {data.albums.items.map((a) => (
                                <AlbumCard
                                    album={a}
                                    key={`search_album_${a.id}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
