import react from "react";

function Mycompo(props) {
  const style =
    props.list.switch === true
      ? { fontSize: "20px", color: "blue" }
      : { fontSize: "15px", color: "black" };

  return (
    <div>
      <h4 style={style}>
        {props.list.text}
        <button
          onClick={() => {
            props.swtogle(props.list.id);
          }}
        >
          변경
        </button>
        <button
          onClick={() => {
            props.onupdate(props.list.id);
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            props.ondelete(props.list.id);
          }}
        >
          x
        </button>
      </h4>
    </div>
  );
}

export default Mycompo;
