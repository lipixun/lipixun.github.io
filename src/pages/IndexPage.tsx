// IndexPage
import type { CSSProperties } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export function IndexPage() {
  return (
    <div className='index-page'>
      <SplashPage />
      <AICodingPage />
      <AboutPage />
    </div>
  );
}

function SplashPage() {
  return (
    <div className='index-sub-page'>
      <div className='index-sub-page-arrow' />
      <Stack className='index-sub-page-content' spacing='0.5em' alignItems='center'>
        <Avatar alt='Avatar' src='https://github.com/lipixun.png?size=96' sx={{ width: 96, height: 96 }} />
        <span style={textStyle}>Simon</span>
        <span style={textStyle}>Intangible Cultural Heritage Inheritor of Hand-Crafted Coding</span>
        <span style={textStyle}>匠心 · 纯手工</span>
        <span style={textStyle}>Beijing China</span>
      </Stack>
      <div className='index-sub-page-arrow'>
        <KeyboardDoubleArrowDownIcon className='index-sub-page-down-arrow' />
      </div>
    </div>
  );
}

function AICodingPage() {
  return (
    <div className='index-sub-page'>
      <div className='index-sub-page-arrow'>
        <KeyboardDoubleArrowUpIcon className='index-sub-page-up-arrow' />
      </div>
      <Stack className='index-sub-page-content' spacing='1em' alignItems='center'>
        <h1 style={titleStyle}>Really?</h1>
        <h2 style={subTitleStyle}>Of course not!</h2>
        <span style={textStyle}>AI将成为人类有史以来最重要的工具之一，人类将再一次学会使用 🔥</span>
        <span style={textStyle}>通过AI的辅助，Coding将变得前所未有的高效和准确</span>
      </Stack>
      <div className='index-sub-page-arrow'>
        <KeyboardDoubleArrowDownIcon className='index-sub-page-down-arrow' />
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className='index-sub-page'>
      <div className='index-sub-page-arrow'>
        <KeyboardDoubleArrowUpIcon className='index-sub-page-up-arrow' />
      </div>
      <Stack className='index-sub-page-content' spacing='1em' alignItems='center'>
        <h1 style={titleStyle}>About</h1>
        <span style={textStyle}>在学习如何与AI协作和共存、以及写出好的作品</span>
      </Stack>
      <div className='index-sub-page-arrow' />
    </div>
  );
}

const titleStyle: CSSProperties = {
  fontSize: 50,
  WebkitTextStroke: '1em black',
  paintOrder: 'stroke fill',
}

const subTitleStyle: CSSProperties = {
  fontSize: 35,
  WebkitTextStroke: '1em black',
  paintOrder: 'stroke fill',
}

const textStyle: CSSProperties = {
  fontSize: 18,
  WebkitTextStroke: '1em black',
  paintOrder: 'stroke fill',
}
