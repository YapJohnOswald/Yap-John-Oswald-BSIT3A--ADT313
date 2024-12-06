import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css'; 

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          console.log(response.data); // Inspect the data here
          setMovie(response.data);
        })
        .catch((error) => {
          console.error(error);
          navigate('/'); // Navigate to home on error
        });
    }
  }, [movieId, setMovie, navigate]);

  return (
    <div className="view-container">
      {movie ? (
        <>
          {/* Movie Banner */}
          <div
            className="movie-banner"
            style={{
              backgroundImage: `url(${movie.bannerImage || '/default-banner.jpg'})`, // Fallback to default image
            }}
          >
            <div className="banner-overlay">
              <h1 className="movie-title">{movie.title || 'Untitled Movie'}</h1>
            </div>
          </div>

          {/* Movie Details */}
          <div className="movie-details">
            <h3 className="movie-overview">
              {movie.overview || 'No overview available for this movie.'}
            </h3>
          </div>

          {/* Cast & Crew */}
          {movie.casts && movie.casts.length > 0 && (
            <div className="cncsection">
              <h2>Cast & Crew</h2>
              <ul className="cast-list">
                {movie.casts.map((cast, index) => (
                  <li key={index}>{cast.name || 'Unknown Cast Member'}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Videos */}
          {movie.videos && movie.videos.length > 0 && (
            <div className="videosection">
              <h2>Videos</h2>
              <div className="video-gallery">
                {movie.videos.map((video, index) => (
                  <video style={{ width: '500px', height: 'auto' }} key={index} controls>
                    <source
                      src={video.url}
                      type={video.type || 'video/mp4'} // Support dynamic video types
                    />
                    Your browser does not support this video format.
                  </video>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {movie.photos && movie.photos.length > 0 && (
            <div className="photosection">
              <h2>Photos</h2>
              <div className="photo-gallery">
                {movie.photos.filter((_, index) => index !== 0).map((photo, index) => ( // Filter out the first photo
                  <img
                    style={{ width: '1000px', height: 'auto' }}
                    key={index}
                    src={photo.url}
                    alt={photo.caption || `Movie Photo ${index + 1}`}
                    loading="lazy" // Optimize image loading
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/path/to/default-image.jpg'; // Fallback image
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;