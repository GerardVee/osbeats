import 'isomorphic-fetch';
import '../styles/osbeats.scss';
import React, { Component } from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';
import cheerio from 'cheerio';
import playlistsFromJSON from './playlists.json';

const api = process.env.API;

const results = (html) =>
{
    const $ = cheerio.load(html, {
        normalizeWhitespace: true,
        xmlMode: true
    });
    return $('.img_mini').map((index, element) =>
    {
        const href = $(element.children[0]).attr('href');
        const image = $(element.children[0]).children('.minimage');
        const title = image.attr('title');
        const src = image.attr('src').replace(/\s/g, '');
        return { title, src: 'https://www.bensound.com/' + src.substr(src.indexOf('ben')), href };
    }).get();
};

class OSBeats extends Component
{
    state =
    {
        currentSong: 0,
        currentPlaylist: -1,
        songDetails: {},
        playStatus: Sound.status.PLAYING,
        volume: 100,
        position: 0,
        loop: false,
        duration: 0,
        search: '',
        suggestions: [],
        playlists: playlistsFromJSON,
        page: '/',
    };

    async componentDidMount()
    {
        const mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        if (mobile)
        {
            alert('Mobile is not supported!');
        }
    }

    onLoadingMP3({ duration })
    {
        const { duration: d, position } = this.state;
        if (d === 0 || position === 0)
        {
            this.setState({ duration });
        }
    }

    setPosition({ position })
    {
        this.setState({ position });
    }

    setStop()
    {
        this.setState({ playStatus: Sound.status.STOPPED });
    }

    updateSearch({ target })
    {
        this.setState({ search: target.value });
    }

    searchOnEnter({ key })
    {
        if (key === 'Enter')
        {
            this.search();
        }
    }

    async search()
    {
        const { search } = this.state;
        const req = await fetch(api + `osbeats/search?q=${ search }`);
        if (!req.ok)
        {
            alert('Search failed');
            return;
        }
        const res = await req.text();
        if (res === 'Nothing')
        {
            alert('Search failed');
            return;
        }
        const html = res.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
        const suggestions = results(html);
        this.setState({ suggestions, page: 'search' });
    }

    modifyPlayStatus()
    {
        const { playStatus } = this.state;
        this.setState({ playStatus: playStatus === Sound.status.PLAYING ? Sound.status.PAUSED : Sound.status.PLAYING });
    }

    flipLoop()
    {
        const { loop } = this.state;
        this.setState({ loop: !loop });
    }

    setPlaylist(index)
    {
        this.setState({ currentPlaylist: index, page: 'playlist' });
    }

    setSongFromPlaylist(details, index)
    {
        this.setState({ songDetails: details, currentSong: index, position: 0 });
    }

    setSongFromSearch(details)
    {
        this.setState({ songDetails: details, currentSong: 0, currentPlaylist: -1, position: 0 });
    }

    stepBackward()
    {
        const { currentSong, currentPlaylist, playlists } = this.state;
        this.setState({ currentSong: currentSong <= 0 ? playlists[currentPlaylist].playlist.length - 1 : currentSong - 1 }, () =>
        {
            this.setState({ songDetails: playlists[currentPlaylist].playlist[this.state.currentSong], position: 0 });
        });
    }

    stepForward()
    {
        const { currentSong, currentPlaylist, playlists } = this.state;
        this.setState({ currentSong: currentSong >= playlists[currentPlaylist].playlist.length - 1 ? 0 : currentSong + 1 }, () =>
        {
            this.setState({ songDetails: playlists[currentPlaylist].playlist[this.state.currentSong], position: 0 });
        });
    }

    seek(position)
    {
        this.setState({ position });
    }

    setVolume(volume)
    {
        this.setState({ volume });
    }

    render()
    {
        const { search } = this.state;
        return (
            <>
                <Header search={ search } updateSearch={ (e) => this.updateSearch(e) } searchOnEnter={ (e) => this.searchOnEnter(e) }
                    query={ () => this.search() }
                />
                <Content { ...this.state } setPlaylist={ (i) => this.setPlaylist(i) } setSongFromPlaylist={ (details, index) => this.setSongFromPlaylist(details, index) }
                    setSongFromSearch={ (details) => this.setSongFromSearch(details) } onLoadingMP3={ (object) => this.onLoadingMP3(object) }
                    setPosition={ (obj) => this.setPosition(obj) } setStop={ () => this.setStop() }
                />
                <Footer { ...this.state } modifyPlayStatus={ () => this.modifyPlayStatus() } flipLoop={ () => this.flipLoop() }
                    setPlaylist={ (index) => this.setPlaylist(index) } stepBackward={ () => this.stepBackward() } stepForward={ () => this.stepForward() }
                    seek={ (position) => this.seek(position) } setVolume={ (volume) => this.setVolume(volume) }
                />
            </>
        );
    }
}

ReactDOM.render(<OSBeats />, document.getElementById('root'));