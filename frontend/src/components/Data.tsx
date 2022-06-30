import React from "react";
import SaveAs, { saveAs } from "file-saver";

export default function Data() {
  interface Lists {
    description: string;
    idName: string;
    name: string;
    __v: number;
    _id: string;
  }
  const [lists, setList] = React.useState<Lists[]>([]);

  React.useEffect(() => {
    fetch("/files/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data);

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveFile = (props: Lists) => {
    saveAs(`http://localhost:8080/file/${props.idName}`, `${props.name}`);
  };

  return (
    <div>
      <h5>{JSON.stringify(lists)}</h5>
      {lists.map((list, index) => {
        return (
          <>
            <button onClick={() => saveFile(list)}>{list.name}</button>;
            <img
              src={`http://localhost:8080/file/${list._id}`}
              alt="sdf"
              height={100}
              width={180}
            />
          </>
        );
      })}
    </div>
  );
}
