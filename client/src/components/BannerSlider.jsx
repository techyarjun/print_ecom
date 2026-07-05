import "../styles/BannerSlider.css";

const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
  "/images/banner4.png",
  "/images/banner5.png",
];

// Create pairs:
// [1,2] -> [2,3] -> [3,4] -> [4,1]
const slides = banners.map((_, index) => [
  banners[index],
  banners[(index + 1) % banners.length],
]);

function BannerSlider() {
  return (
    <section className="banner-slider">
      <div
        id="heroSlider"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroSlider"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {slides.map((pair, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="banner-row">
                <div className="banner-col">
                  <img
                    src={pair[0]}
                    className="banner-image"
                    alt={`Banner ${index + 1}`}
                  />
                </div>

                <div className="banner-col">
                  <img
                    src={pair[1]}
                    className="banner-image"
                    alt={`Banner ${index + 2}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>

        {/* Next */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
}

export default BannerSlider;