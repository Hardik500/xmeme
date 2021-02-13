//meme-gallery.js

import React, { useState } from "react";
import Gallery from "react-photo-gallery";

import Photo from "./customImageHandler";

/** 
 * This component handles the main functionality to display the memes
 * It uses ReactPhotoGallery library to display the memes in an orderly and symettric fashion
 * To display the memes in that fashion we need to send the height and width of the image from the backend
 * And ReactPhotoGallery handles everything for us
*/

export default function MemeGallery({ theme, setMemeData, memes }) {
    const [hovered, setHovered] = useState(null);

    const handleHover = (index) => {
        setHovered(index);
    };

    return (
        <Gallery
            photos={memes}
            direction={"column"}
            margin={20}
            renderImage={(props) =>
                Photo({ ...props, hovered, handleHover, updateMeme: setMemeData, theme })
            }
        />
    );
}
