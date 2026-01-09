import "../styles/gallery.css";

const VideoLayerCard = () => {
  return (
    <div className="video-layer-card">
      <iframe
        className="video-layer-iframe"
        src="https://www.youtube.com/embed/NyP46COYfCg?autoplay=1&mute=1&loop=1&playlist=NyP46COYfCg&controls=0&modestbranding=1&showinfo=0"
        title="Pursuit Gallery Video"
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoLayerCard;
