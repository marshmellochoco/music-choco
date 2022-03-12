import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiHome, mdiMagnify, mdiMusicBoxMultiple } from '@mdi/js';
import logo from '../images/music-choco.png';
import logoDark from '../images/music-choco-dark.png';
import { useState } from 'react';

const Navbar = ({ resetToken }) => {
    const { displayName } = useSelector((state) => state.userReducer);
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        if (!document.documentElement.classList.contains('dark')) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <>
            <div className='navbar-placeholder'></div>
            <div className='navbar navbar-shadow'>
                <Link to='/' className='nav-logo w-min' title='music-choco'>
                    <img src={!isDark ? logo : logoDark} alt='music-chcoo' />
                </Link>

                <div className='nav-items'>
                    <Link to='/' className='nav-item'>
                        <Icon
                            path={mdiHome}
                            className='sm:hidden'
                            title='Home'
                        />
                        <span className='hidden sm:block'>Home</span>
                    </Link>
                    <Link to='/library' className='nav-item'>
                        <Icon
                            path={mdiMusicBoxMultiple}
                            className='sm:hidden'
                            title='Library'
                        />
                        <span className='hidden sm:block'>Library</span>
                    </Link>
                    <Link to='/search' className='nav-item'>
                        <Icon
                            path={mdiMagnify}
                            className='sm:hidden'
                            title='Search'
                        />
                        <span className='hidden sm:block'>Search</span>
                    </Link>
                </div>
                <div
                    className='nav-user'
                    onClick={resetToken}
                    onContextMenu={toggleTheme}
                >
                    {displayName}
                </div>
            </div>
        </>
    );
};

export default Navbar;
// TODO: user dropdown
