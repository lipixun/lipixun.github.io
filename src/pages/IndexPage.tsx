// IndexPage
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export function IndexPage() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing='1em' alignItems='center'>
        <Avatar alt='Avatar' src='https://github.com/lipixun.png?size=96' sx={{ width: 96, height: 96 }} />
        <span>Intangible Cultural Heritage Inheritor of Hand-Crafted Coding</span>
        <span>纯手工 · 匠心</span>
        <span>Beijing China</span>
      </Stack>
    </div>
  );
}
