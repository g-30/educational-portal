import { useState } from 'react';
import { AppBar, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const MyForm = styled('form')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '32px',
});

const MyInput = styled(TextField)({
    marginRight: '16px',
});

const MyButton = styled(Button)({
    marginLeft: '16px',
});

function App() {
    const [videos, setVideos] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState<string>('');

    const handleVideoUpload = () => {
        setVideos([...videos, videoUrl]);
        setVideoUrl('');
    };

    return (
        <>
            <AppBar position='static'>
                <Navbar />
            </AppBar>
            <MyForm onSubmit={(e) => e.preventDefault()}>
                <MyInput
                    label='Video URL'
                    variant='outlined'
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <MyButton variant='contained' onClick={handleVideoUpload}>
                    Upload
                </MyButton>
            </MyForm>
            <div>
                {videos.map((videoUrl: string, index: number) => (
                    <iframe
                        key={index}
                        src={videoUrl}
                        title={`Video ${index}`}
                        width='640'
                        height='360'
                        frameBorder='0'
                        allowFullScreen
                    ></iframe>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default App;
