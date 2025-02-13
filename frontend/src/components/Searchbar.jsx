import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import QRCode from "qrcode";
import { Link } from "react-router-dom";
import FileSaver from "file-saver";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
} from "react-share";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loader, setLoader] = useState(true);
  const [qrCode, setQrCode] = useState("");
  const [toggleQrCode, setToggleQrCode] = useState(false);
  const [toggleShare, setToggleShare] = useState(false);
  const [toggleSpinner, setToggleSpinner] = useState(false);

  const postData = async () => {
    setLoader(false);
    setToggleSpinner(true);
    try {
      const response = await axios.post(`${BASE_URL}/url`, { url: search });
      setShortUrl(`${BASE_URL}/${response?.data?.id}`);
      QRCode.toDataURL(`${BASE_URL}/${response?.data?.id}`).then(setQrCode);
    } catch (error) {
      toast.error("Error while shortening the URL");
    } finally {
      setLoader(true);
      setToggleSpinner(false);
    }
  };

  const handleSubmit = () => {
    if (!search) {
      toast.error("Please enter your long URL");
    } else {
      postData();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (toggleQrCode) setToggleShare(false);
    if (toggleShare) setToggleQrCode(false);
  }, [toggleQrCode, toggleShare]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-12">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        URL Shortener
      </h1>

      {toggleSpinner && (
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-dotted rounded-full animate-spin"></div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 border-2 border-gray-200 rounded-md text-center">
        <div className="relative mb-4 mx-auto">
          {loader ? (
            <input
              type="text"
              placeholder="Enter long URL here"
              className="w-full sm:w-[500px] p-4 text-lg rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={search}
              onKeyDown={handleKey}
              onChange={(e) => setSearch(e.target.value)}
            />
          ) : (
            <div className="h-12 w-full sm:w-[500px] bg-gray-300 animate-pulse rounded-md" />
          )}
          <button
            className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
            disabled={!loader}>
            {loader ? "Shorten" : "Shortening..."}
          </button>
        </div>
        {loader ? (
          shortUrl && (
            <>
              <p className="text-lg text-gray-700">Shortened URL:</p>
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="w-full sm:w-[500px] p-3 mt-3 text-center border-2 rounded-md bg-white"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <Link to={shortUrl} target="_blank">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200">
                    Open
                  </button>
                </Link>
                <CopyToClipboard text={shortUrl}>
                  <button
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200"
                    onClick={() => toast.success("Copied!")}>
                    Copy
                  </button>
                </CopyToClipboard>
                <button
                  onClick={() => setToggleQrCode(!toggleQrCode)}
                  className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-200">
                  QR Code
                </button>
                <button
                  onClick={() => setToggleShare(!toggleShare)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-200">
                  Share
                </button>
              </div>

              {toggleQrCode && (
                <div className="mt-6">
                  <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => FileSaver.saveAs(qrCode, "qrCode.jpg")}>
                    Download QR
                  </button>
                </div>
              )}

              {toggleShare && (
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                  <FacebookShareButton url={shortUrl}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={shortUrl}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  <TwitterShareButton url={shortUrl}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <TelegramShareButton url={shortUrl}>
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>
                  <LinkedinShareButton url={shortUrl}>
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <RedditShareButton url={shortUrl}>
                    <RedditIcon size={40} round />
                  </RedditShareButton>
                </div>
              )}
            </>
          )
        ) : (
          <div className="mt-8 p-6 bg-gray-50 border-2 border-gray-200 rounded-md text-center">
            <div className="h-12 bg-gray-300 w-4/5 mx-auto animate-pulse rounded-md" />
            <div className="flex justify-center mt-4 gap-4">
              <div className="h-10 w-20 bg-gray-300 animate-pulse rounded-md" />
              <div className="h-10 w-20 bg-gray-300 animate-pulse rounded-md" />
              <div className="h-10 w-20 bg-gray-300 animate-pulse rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
