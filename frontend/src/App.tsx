import React from "react";
const Data = React.lazy(() => import("./components/Data"));

function App() {
  const [file, setFile] = React.useState<any>();
  const [description, setDescription] = React.useState("");

  const sendFile = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    fetch("/file", {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Hello World</h1>
      <React.Suspense fallback={<h1>loading...</h1>}>
        <Data />
      </React.Suspense>

      <hr />

      <form onSubmit={sendFile} encType="multipart/form-data">
        <div>
          <label>File:</label>
          <input
            title="File"
            type="file"
            accept="file/*"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <label>File:</label>
          <input
            title="File"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="submit" title="Submit" />
      </form>
    </>
  );
}

export default App;
