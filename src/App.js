import React from 'react'
import { Capacitor } from '@capacitor/core';
import { useState, useEffect, useRef } from 'react';
import { useVideoPlayer } from 'react-video-player-hook';
import { ExitStatus } from 'typescript';


const VideoPlayer = () => {
    const [url, setUrl] = useState( undefined );
    const platform = Capacitor.getPlatform();

    let apiTimer1 = useRef();
    let apiTimer2 = useRef();
    let apiCount = useRef(-1);
    const exit = useRef(false)

    const onPlay = async (fromPlayerId,currentTime) => {
        if(!exit.current) {
            const mIsPlaying = await isPlaying(fromPlayerId);
            console.log("==> mIsPlaying " + JSON.stringify(mIsPlaying));
            apiCount.current += 1;
            if(apiCount.current === 0) {
                const volume = await getVolume(fromPlayerId);
                if(volume.result) {
                    console.log("==> volume " + volume.value);
                } else {
                    console.log("==> volume " + volume.message);
                }
                apiTimer1.current = setTimeout(async () => {
                    const duration = await getDuration(fromPlayerId);
                    console.log("==> duration " + 
                                JSON.stringify(duration));
                    if(duration.result) {
                        console.log("==> duration " + duration.value);
                    } else {
                        console.log("==> duration " + duration.message);
                    }
                    const volume = await setVolume(fromPlayerId,0.2);
                    console.log("====> Volume ",volume.value);
                    const currentTime = await getCurrentTime(
                                        fromPlayerId);
                    if(currentTime.result) {
                        console.log('==> currentTime ' + 
                                currentTime.value);
                        const seektime = currentTime.value + 
                                0.4 * duration.value; 
                        console.log("seektime" + seektime)
                        const sCurrentTime = await setCurrentTime(
                                                fromPlayerId,seektime);
                        console.log("==> setCurrentTime " + 
                                sCurrentTime.value);
                    }
                    const mPause = await pause(fromPlayerId);
                    console.log('==> mPause ', mPause);
                }, 10000);
            } 
        }
    };
    const onPause = async (fromPlayerId,currentTime) => {
            if(!exit.current) {
            if(apiCount.current === 0) {
                apiCount.current += 1;
                const mIsPlaying = await isPlaying(fromPlayerId);
                console.log("==> in Pause mIsPlaying " +
                        mIsPlaying.value);
                const volume = await getVolume(fromPlayerId);
                if(volume.result) {
                    console.log("==> volume " + volume.value);
                }                
                const currentTime = await getCurrentTime(fromPlayerId);
                if(currentTime.result) {
                    console.log('==> currentTime ' + currentTime.value);
                }
                let muted = await getMuted(fromPlayerId);
                console.log("==> muted before setMuted " + muted.value);
                muted = await setMuted(fromPlayerId,!muted.value);
                console.log("==> setMuted " + muted.value);
                muted = await getMuted(fromPlayerId);
                console.log("==> muted after setMuted " + muted.value);
                apiTimer2.current = setTimeout(async () => {
                    const duration = await getDuration(fromPlayerId);
                    const rCurrentTime = await setCurrentTime(
                                        fromPlayerId,duration.value - 4);
                    console.log('====> setCurrentTime ',
                            rCurrentTime.value);
                    await play(fromPlayerId);
                }, 4000);
            }
        }
    };
    const onReady = (fromPlayerId,currentTime) => {
        console.log("in OnReady playerId " + fromPlayerId +
                " currentTime " + currentTime);
    };
    const onEnded = (fromPlayerId,currentTime) => {
        console.log("in OnEnded playerId " + fromPlayerId +
                " currentTime " + currentTime);
        exitClear();
    };
    const onExit = (dismiss) => {
        console.log("in OnExit dismiss " + dismiss);
        exitClear();
    };
    const exitClear = () => {
        if(!ExitStatus.current) {
            window.clearTimeout(apiTimer1.current);
            window.clearTimeout(apiTimer2.current);
            apiTimer1.current = 0;
            apiTimer2.current = 0;
            exit.current = true;
            setUrl("");
        }
    };
    const {initPlayer, isPlaying, pause, play, getDuration, setVolume,
        getVolume, setMuted, getMuted, setCurrentTime, getCurrentTime,
        stopAllPlayers} = useVideoPlayer({
            onReady,
            onPlay,
            onPause,
            onEnded,
            onExit
    });

    useEffect(  () => {
        if ( platform === "ios" || platform === "android" ) {
            // test url from public/assets
            setUrl( 'public/assets/video/video.mp4' )
        } else {
            // test url from http:
            setUrl( 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4' )
        }
    }, [platform, url] )
    

    useEffect( () => {
        if( url && !exit.current ) {
            // test mode "embedded" for video player on Web platform
            const playerWeb = async () => {

                let res = await initPlayer( "embedded", url,
                "fullscreen-video",'div', 1280, 720);

                if ( res.result.result && res.result.value ) {
                    res = await play( "fullscreen-video" );
                }
/*
                await initPlayer( "fullscreen", url,
                                   "fullscreen-video",'div');
*/
            }
            // test mode "fullscreen" for video player 
            // on native platforms
            const playerNative = async () => {
                try {
                    await initPlayer("fullscreen", url,
                                     "fullscreen-video");

                } catch ( error ) {
                    console.log( error );
                }
            }
            if ( platform === "ios" || platform === "android" )
                playerNative();
            else
                playerWeb(); 
        
        }
        
    }, [initPlayer, play, isPlaying, pause, getDuration,
        getVolume, setVolume, getCurrentTime, setCurrentTime, 
        getMuted, setMuted, stopAllPlayers,
        platform, url, exit] );

    return (
        <div className="main-container">
            {(!exit.current) &&
                <div id="fullscreen-video" slot="fixed">
                </div>
            }
        </div>
    )
}

export default VideoPlayer