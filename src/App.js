import { useState } from "react";
import { useEffect } from "react";
import uuid from "react-uuid";
import Mycompo from "./Mycompo.js";
import axios from "axios";

function App() {
  let [list, Setlist] = useState([]); // todolist 전체 리스트
  let [add, Setadd] = useState(""); // input으로 입력받고 list안의 key를 text로 가지는 값(value)
  let [sw, Setsw] = useState(false); // 체크박스 클릭시 text모양을 변경해주는 역할 toggle 이용
  let [tg, Settg] = useState(false); // useeffect 사용시 의존성 배열로 toggle시 useeffect 실행

  useEffect(() => {
    axios.get("http://localhost:3000/totallist").then((res) => {
      Setlist(res.data);
    });
  }, [tg]);

  const onchange = (e) => {
    // 이벤트가 일어나는 e.terget = input, 그의 value인 내가 입력한 값을 add에 넣어주는 역할
    Setadd(e.target.value);
  };

  const onclick = () => {
    // input값을 입력하고 전체 리스트에 넣어주기 위한 함수
    const total = {
      id: uuid(), // id를 1씩 증가하는 usestate사용시 후에 오류발생위험이 있어 랜덤한 id를 가지게 하기 위해 uuid 사용
      text: add, // text를 key로 가지는 값은 내가 입력한 add값
      switch: sw, // 글씨 변경의 조건을 위해 체크박스 클릭시 toggle 해주기 위함
    };
    /**
    axios.post("http://localhost:3000/totallist", total).then((res) => {
      // 새로 추가한 객체를 리스트에 넣어주는 역할
    });
    Setadd(""); // input값을 초기화 해줘서 추가 버튼을 누르면 input창이 비워지게 해주는 역할
    Settg(!tg);
     */
    axios.post("http://localhost:3000/totallist", total).then((res) => {
      // 새로 추가한 객체를 리스트에 넣어주는 역할
    }).then(()=>{
      Setadd("")
      Settg(!tg)
    });
  };

  const onupdate = (id) => {
    const uplist = list.find((n) => n.id === id);
    uplist.text = add;

    axios.put(`http://localhost:3000/totallist/${id}`, uplist).then(() => {});
    const uuplist = list.map((item) => {
      if (item.id === id) {
        return uplist;
      } else {
        return item;
      }
    });
    Setlist(uuplist);
  };

  const ondelete = (id) => {
    axios.delete(`http://localhost:3000/totallist/${id}`).then(() => {
      const dtlist = list.filter((n) => n.id !== id);
      Setlist(dtlist);
    });
  };

  const swtogle = (id) => {
    const cplist = list.find((n) => n.id === id);
    const cpcplist = { ...cplist, switch: !cplist.switch };
    axios.put(`http://localhost:3000/totallist/${id}`, cpcplist).then(() => {
      Settg(!tg);
    });
  };

  return (
    <div>
      <div className="main">
        <input value={add} onChange={onchange}></input>
        <button onClick={onclick}>+</button>
      </div>
      <div>
        {list.map((n) => {
          return (
            <Mycompo
              key={n.id}
              list={n}
              id={n.id}
              text={n.text}
              onupdate={onupdate}
              ondelete={ondelete}
              swtogle={swtogle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
