import React from "react";
import ReactDOM from "react-dom/client";
import './styles.css'
import { useState } from "react";


const itemList = [
  {
    title: "Item Index 1",
    thumbnail: "https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg"
  },
  {
    title: "Item Index 2",
    thumbnail: "https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg"
  },
  {
    title: "Item Index 3",
    thumbnail: "https://www.akc.org/wp-content/uploads/2018/05/Three-Australian-Shepherd-puppies-sitting-in-a-field.jpg"
  }
];

function App() {
  return (
    <div className="slider">
      <Header />
      <div className="container">
        <Slider />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <h1>Dog Breed Slider</h1>
    </header>
  )
}

function Slider() {
  const [sliderItems, setSliderItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const url = `https://api.thedogapi.com/v1/breeds?limit=30`
  const api_key = "live_3bzpQW3qG8hBts9ppkMn9RtRJFw7jP1YwJd5st0cqHuk5bAE51KhCnfM78CRuOO7";

  React.useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key": api_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          title: item.name || `Item Index ${index + 1}`,
          thumbnail: item.image?.url || "https://via.placeholder.com/150",
          origin: item.origin,
          lifeSpan: item.life_span,
          temperament: item.temperament,
          breedGroup: item.breed_group,
        }));
        setSliderItems(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
  }

  function handlePrevious() {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? sliderItems.length -1 : prevIndex -1)
  }

  return (
    <div className="carousel-container">
      <span id="prevBtn" className="nav-button" onClick={handlePrevious}>&#8249;</span>
      <span id="nextBtn" className="nav-button" onClick={handleNext}>&#8250;</span>

      <div className="carousel" id="carousel">
        {sliderItems.length > 0 ? (
          <SliderItem key={currentIndex} sliderObj={sliderItems[currentIndex]} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

function SliderItem({ sliderObj }) {
  return (
    <div className="carousel-item">
      <img src={sliderObj.thumbnail} alt={sliderObj.title} />
      <p>Name: {sliderObj.title}</p>
      {sliderObj.origin ? <span>Origin: {sliderObj.origin}</span> : null}
      {sliderObj.lifeSpan ? <span>Lifespan: {sliderObj.lifeSpan}</span> : null}
      {sliderObj.temperament ? <span>Temperament: {sliderObj.temperament}</span> : null}
      {sliderObj.breedGroup ? <span>Breed Group: {sliderObj.breedGroup}</span> : null}
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

