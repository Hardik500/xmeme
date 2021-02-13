// customImageHandler.js

// This component handles the functionality to display images in ReactPhotoGallery
// And also handles the logic of what happens when an image is clicked or hovered

import React from "react";
import LazyLoad from 'react-lazyload';
import { formatDistanceToNow } from 'date-fns'

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
  margin: "-30px 0",
};

export default function Photo(props) {
  const {
    index,
    photo,
    theme,
    margin,
    direction,
    top,
    left,
    hovered,
    handleHover,
    updateMeme,
  } = props;

  const container = {
    backgroundColor: theme === "light" ? "#eee" : "#111",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  };

  let isHovered = hovered === index ? true : false;

  //calculate x,y scale to sets the size of the container WRT images height and width
  const sx = (100 - (80 / photo.width) * 100) / 100;
  const sy = (100 - (80 / photo.height) * 100) / 100;

  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  //Direction is ReactMemeGallery feature to display memes in an order
  if (direction === "column") {
    container.position = "absolute";
    container.left = left;
    container.top = top;
    if (isHovered) {
      container.paddingBottom = "6px";
    }
  }

  const {
    id,
    src,
    date,
    height,
    width,
    author,
    caption,
  } = photo;

  // This variable is used to send the data to the backend when a meme is clicked
  const data = {
    name: author,
    url: src,
    caption: caption,
    id,
    index,
  };

  return (
    <div
      style={{ margin, width, ...container, height: isHovered ? "" : height }}
      className={!isHovered ? "photo-parent not-selected" : "photo-parent"}
      key={index}
      onClick={() => updateMeme(data)}
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={() => handleHover(null)}
    >
      {/* Display additional information when a meme is hovered */}
      {isHovered && (
        <div className="photo-header">
          <h3>{caption}</h3>
        </div>
      )}

      {/* Lazily load the image component when the user is within 350px distance to the component */}
      <LazyLoad height={height} width={width} once={true} offset={350}>
        <img
          alt={caption}
          style={
            isHovered ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
          }
          {...photo}
        />
      </LazyLoad>
        
      {/* Display additional information when a meme is hovered */}
      {isHovered && (
        <div className="photo-footer">
          <div className="photo-author">Posted by {author}</div>
          <div className="photo-date">Posted {formatDistanceToNow(new Date(date))} ago</div>
        </div>)}
    </div>
  );
}
