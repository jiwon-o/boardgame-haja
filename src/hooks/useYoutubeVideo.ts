import { useEffect } from 'react';

function useYouTubeVideo(gameTitle: string | undefined) {
  const API_KEY = 'AIzaSyDsdJ7M6h_0OQXEbPEGqwL2w3ly63MDNvM';

  useEffect(() => {
    if (!gameTitle) return;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${gameTitle} 하는 법&maxResults=1&type=video&part=snippet`;

    const fetchYouTubeVideo = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 검색 결과에서 맨 위 동영상 ID 가져오기
        const videoId = data.items[0].id.videoId;

        // iframe 생성
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allowFullscreen = true;

        const videoContainer = document.getElementById('video-container');

        // 컨테이너에 iframe 추가
        if (videoContainer) {
          videoContainer.appendChild(iframe);
        }
      } catch (error) {
        console.error('YouTube API 호출 오류:', error);
      }
    };

    fetchYouTubeVideo();
  }, [gameTitle]);
}

export default useYouTubeVideo;
