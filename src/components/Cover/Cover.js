import "./Cover.css";

function Cover(props) {
  return (
    <div className="cover">
      <img src={props.image} alt="song cover"></img>
    </div>
  );
}

export default Cover;
