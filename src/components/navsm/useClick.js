import { useState } from "react";
export default function useClick() {
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const [click5, setClick5] = useState(false);
  const [click6, setClick6] = useState(false);

  const Clicked = () => (!click ? setClick(true) : setClick(false));
  const Clicked2 = () => (!click ? setClick2(true) : setClick2(false));
  const Clicked3 = () => (!click ? setClick3(true) : setClick3(false));
  const Clicked4 = () => (!click ? setClick4(true) : setClick4(false));
  const Clicked5 = () => (!click ? setClick5(true) : setClick5(false));
  const Clicked6 = () => (!click ? setClick6(true) : setClick6(false));

  return {
    click,
    Clicked,
    click2,
    Clicked2,
    click3,
    Clicked3,
    click4,
    Clicked4,
    click5,
    Clicked5,
    click6,
    Clicked6,
  };
}
