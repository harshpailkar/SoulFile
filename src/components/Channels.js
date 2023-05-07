import { useEffect, useState } from "react";

const Channels = ({ provider, account, soulfile }) => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    async function handleSubmit(e) {
        if (!image) {
            setError('Please select a file');
        } else {
            console.log(image);
            setError(null);
            e.preventDefault();
            setIsLoading(true);
            const signer = await provider.getSigner();
            const transaction = await soulfile
                .connect(signer)
                .safeMint(
                    account,
                    "QmcKWqayEfVL6KujBRLZpgPs9vDemPFr3UhvB86NX9Ni3G"
                );
            await transaction.wait();

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
        }
    }

    return (
        <div className="fileupload">
            <h2>Convert your images to</h2>
            <h1 className="gradient-text">SoulBound NFTs</h1>
            <div className="spacer"></div>

            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="image-upload">Choose an image:</label> */}
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="custom-file-input"
                    onChange={handleImageChange}
                />
                <button type="submit" className="btn__upload" disabled={!image}>
                    Upload
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
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
};

export default Channels;
