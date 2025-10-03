const PostForm = () => {
  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-extrabold text-black mb-10 border-4 border-black px-6 py-3 bg-pink-300 shadow-[6px_6px_0px_#000]">
        Upload Postingan
      </h1>
      <form className="bg-white border-4 border-black rounded-lg p-6 shadow-[6px_6px_0px_#000] w-full max-w-3xl space-y-5 text-black text-xl">
        <div>
          <label className="block font-bold mb-1">Judul Post</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
            placeholder="Masukkan judul post"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Konten Post</label>
          <textarea
            required
            className="w-full px-3 py-2 border-4 border-black rounded-md bg-white shadow-[4px_4px_0px_#000] focus:outline-none"
            placeholder="Masukkan konten post"
            rows="6"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-fit px-4 py-3 bg-blue-400 border-4 border-black text-black font-extrabold rounded-md shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-transform"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
