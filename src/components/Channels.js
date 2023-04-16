import { useEffect, useState } from 'react'
const Channels = ({ provider, account, dappcord, channels, currentChannel, setCurrentChannel }) => {

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // handle the form submission here
      console.log(image);
      // simulate a delay of 2 seconds to hide the loader and show the popup
      setIsLoading(false);
      setIsUploaded(true);
      setTimeout(() => {
        setIsUploaded(false);
      }, 2000);
    }, 2000);
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="fileupload">
      <h3>Upload a file to convert it to a Soul Token!</h3>
      <div className="spacer"></div>

      <form onSubmit={handleSubmit}>
      <label htmlFor="image-upload">Choose an image:</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit" className='btn__upload'>Upload</button>
      <div className="spacer"></div>
      {isLoading && <p>Loading...</p>}
      {isUploaded && (
        <div>
          <p>File uploaded successfully!</p>
        </div>
      )}
    </form>
    </div>
  );
}

export default Channels;