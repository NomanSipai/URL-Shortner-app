import { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [dataList, setDataList] = useState([]);
  const [loader, setLoader] = useState(true);
  const postData = async () => {
    setLoader(false);
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
      console.log(response.data.result_url);
      setShortUrl(response.data.result_url);
      setLoader(true);
    } catch (error) {
      console.error(error);
      setLoader(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();

    setDataList([...dataList, shortUrl]);
    console.log(dataList);
    setSearch("");
  };
  return (
    <>
      <form className=" max-w-3xl mt-48 mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-arrow-repeat w-5 h-5 text-gray-500 dark:text-gray-400"
              viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="shorten a link here..."
            required=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            SHORTEN
          </button>
        </div>
      </form>
      {shortUrl && (
        <div>
          {loader ? (
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between my-4 bg-gray-100 px-2 py-2 text-xl items-center">
                <p>{shortUrl}</p>
                <CopyToClipboard text={shortUrl}>
                  <div
                    className="p-2 hover:bg-gray-200"
                    onClick={() => toast.success("Copied !")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-copy w-6 h-6 cursor-pointer "
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </div>
                </CopyToClipboard>
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
    </>
  );
};

export default Searchbar;
