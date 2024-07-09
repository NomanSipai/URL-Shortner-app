import { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import QRCode from "qrcode";
import Qrcode from "./Qrcode";
import { saveAs } from "file-saver";
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
import spinner from "/spinner.gif";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loader, setLoader] = useState(true);
  const [qrCode, setQrCode] = useState("");
  const [toggleQrCode, setToggleQrCode] = useState(false);
  const [toggleShare, setToggleShare] = useState(false);
  const [toggleSpinner, setToggleSpinner] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const postData = async () => {
    setLoader(false);
    setToggleSpinner(true);
    setButtonDisable(true);
    const data = new FormData();
    data.append("url", search);
    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "x-rapidapi-key": "f5add045ffmshdd02414960a8f35p19b67fjsn37cac1b63b32",
        "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      setShortUrl(response.data.result_url);
      setLoader(true);
      QRCode.toDataURL(response.data.result_url).then((val) => setQrCode(val));
      setToggleSpinner(false);
    } catch (error) {
      console.error(error);
      setLoader(true);
      setToggleSpinner(false);
    }
  };
  const handleSubmit = () => {
    if (!search) {
      toast.error("please Enter your long url");
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
    if (toggleQrCode) {
      setToggleShare(false);
    }
    if (toggleShare) {
      setToggleQrCode(false);
    }
  }, [toggleQrCode, toggleShare]);

  return (
    <div className="w-[43rem] rounded-xl me-auto ms-auto p-10 bg-gray-100">
      {toggleQrCode && (
        <div
          className=" inset-0 fixed bg-black bg-opacity-30 transition-opacity"
          onClick={() => setToggleQrCode(false)}
        />
      )}
      {toggleShare && (
        <div
          className=" inset-0 fixed bg-black bg-opacity-30 transition-opacity"
          onClick={() => setToggleShare(false)}
        />
      )}
      <form className="max-w-3xl mx-auto " onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-[34px] w-full mb-5 font-bold">
          Transform Long URLs into Short URLs
        </h1>
        {shortUrl ? (
          <>
            <div className="flex items-center mb-2">
              <img src="https://tinyurl.com/images/home/url.svg" alt="" />
              <h5 className="text-xl text-gray-500 ms-2 font-medium">
                Your long URL
              </h5>
            </div>

            <input
              type="search"
              id="default-search"
              className="block w-full p-5 ps-6 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
              placeholder="Enter long link here"
              readOnly
              value={search}
            />
          </>
        ) : (
          <>
            <div className="flex items-center mb-2">
              <svg
                data-v-da533260=""
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width={20}
                height={18}>
                <path
                  data-v-da533260=""
                  d="M10.27,6.64l2.88-2.88A10,10,0,0,1,24.59,1.35a11.54,11.54,0,0,1,6.05,6.06,10,10,0,0,1-2.4,11.44l-2.88,2.89.07-6.15A5.88,5.88,0,0,0,26.71,9.1,7.48,7.48,0,0,0,22.9,5.29a5.86,5.86,0,0,0-6.48,1.28ZM3.76,13.15,6.3,10.6A3.76,3.76,0,0,0,7.38,13l1.31,1.3-1.9,1.9a5.91,5.91,0,0,0-1.5,6.71A7.48,7.48,0,0,0,9.1,26.71a5.91,5.91,0,0,0,6.71-1.5l1.91-1.91L19,24.61a3.53,3.53,0,0,0,1,.7h0a3.92,3.92,0,0,0,1.16.35l.24,0-2.55,2.55A10,10,0,0,1,7.41,30.65a11.54,11.54,0,0,1-6-6.06A10,10,0,0,1,3.76,13.15Z"
                  className="a"
                />
                <path
                  data-v-da533260=""
                  d="M17,19.21l-3.84,3.9c-2.5,2.54-6.7-1.89-4.27-4.35l3.83-3.9L9.22,11.3a1.07,1.07,0,0,1,0-1.5,1,1,0,0,1,.67-.31l11.35-.12a1,1,0,0,1,1.17,1.21l-.13,11.58a1,1,0,0,1-1.17.91,1.09,1.09,0,0,1-.6-.31Z"
                  className="b"
                  fill="green"
                />
              </svg>
              <h5 className="text-xl text-gray-500 ms-2 font-medium">
                Shorten a long URL
              </h5>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-5 ps-6 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter long link here"
              required=""
              value={search}
              onKeyDown={handleKey}
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        )}
      </form>

      {shortUrl && (
        <div>
          {loader ? (
            <div className="max-w-3xl mx-auto">
              <div className="my-4 bg-gray-100 text-xl items-center">
                <div className="flex items-center mb-2 ">
                  <img
                    src="https://tinyurl.com/images/home/magic-wand.svg"
                    alt=""
                  />
                  <h5 className="text-xl text-gray-500 ms-2 font-medium">
                    Tiny URL
                  </h5>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-5 ps-6 text-lg text-gray-900 border  rounded-lg bg-gray-50 outline-none"
                  placeholder="shorten a link here..."
                  readOnly
                  value={shortUrl}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex mt-4">
                  <Link
                    target="_blank"
                    to={`${shortUrl}`}
                    className="flex justify-center items-center me-2">
                    <button
                      type="button"
                      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 px-5 py-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={17}
                        height={17}
                        fill="currentColor"
                        className="bi bi-box-arrow-up-right"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                        />
                        <path
                          fillRule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <div className="flex relative items-center">
                    <button
                      onClick={() => setToggleQrCode(!toggleQrCode)}
                      className="flex relative px-2 py-2 text-lg items-center text-white  bg-teal-400 hover:bg-teal-500 font-medium rounded-md text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-qr-code me-1"
                        viewBox="0 0 16 16">
                        <path d="M2 2h2v2H2z" />
                        <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                        <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                        <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                        <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                      </svg>
                      QR
                    </button>
                    {toggleQrCode && (
                      <div className=" mt-72 -ms-14 bottom-full left-0 absolute  bg-white rounded-lg px-4 py-2">
                        <img src={qrCode} alt="qr" />
                        <div className=" mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              FileSaver.saveAs(qrCode, "qrCode.jpg")
                            }
                            className=" w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center ms-2">
                    <button
                      onClick={() => setToggleShare(!toggleShare)}
                      className="flex px-2 py-2 text-lg items-center text-white  bg-teal-400 hover:bg-teal-500 font-medium rounded-md text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-share-fill me-2"
                        viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                      </svg>
                      Share
                    </button>
                    {toggleShare && (
                      <div className="-ms-7 grid grid-cols-2 bg-white rounded-lg px-4 py-4 absolute mt-[16rem]">
                        <FacebookShareButton url={shortUrl} className="m-2">
                          <FacebookIcon round={true} size={40}></FacebookIcon>
                        </FacebookShareButton>
                        <WhatsappShareButton url={shortUrl} className="m-2">
                          <WhatsappIcon round={true} size={40}></WhatsappIcon>
                        </WhatsappShareButton>
                        <TwitterShareButton url={shortUrl} className="m-2">
                          <TwitterIcon round={true} size={40}></TwitterIcon>
                        </TwitterShareButton>
                        <TelegramShareButton url={shortUrl} className="m-2">
                          <TelegramIcon round={true} size={40}></TelegramIcon>
                        </TelegramShareButton>
                        <LinkedinShareButton url={shortUrl} className="m-2">
                          <LinkedinIcon round={true} size={40}></LinkedinIcon>
                        </LinkedinShareButton>
                        <RedditShareButton url={shortUrl} className="m-2">
                          <RedditIcon round={true} size={40}></RedditIcon>
                        </RedditShareButton>
                      </div>
                    )}
                  </div>

                  <CopyToClipboard text={shortUrl}>
                    <div
                      className="p-2 hover:bg-gray-200"
                      onClick={() => toast.success("Copied !")}>
                      <button className="flex items-center text-lg  font-medium justify-center bg-[#1f8144] text-white px-2 py-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg "
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-copy cursor-pointer me-1 "
                          viewBox="0 0 16 16">
                          <path
                            fillRule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                          />
                        </svg>
                        Copy
                      </button>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between my-4 animate-pulse bg-gray-100 px-2 py-4 text-xl items-center">
                <div className="h-4 py-4 w-96 rounded-md bg-gray-200"></div>
                <div className="h-4 w-8 py-4 rounded-md bg-gray-200"></div>
              </div>
            </div>
          )}
        </div>
      )}
      {shortUrl ? (
        <button
          onClick={() => setShortUrl("") || setSearch("")}
          className=" w-full focus:outline-none text-white bg-[linear-gradient(to_top,#48c6ef_0%,#6f86d6_100%)]  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl p-4 me-2 mb-2">
          Shorter Another
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={buttonDisable}
          className=" mt-5 w-full focus:outline-none text-white bg-[linear-gradient(to_top,#48c6ef_0%,#6f86d6_100%)] focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-xl p-4 me-2 mb-2 ">
          {toggleSpinner ? (
            <img className="mx-auto" src={spinner} width={30} alt="" />
          ) : (
            "Shorten URL"
          )}
        </button>
      )}
    </div>
  );
};

export default Searchbar;
