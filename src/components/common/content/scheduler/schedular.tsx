import React, { useState } from "react";

import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Schedular = () => {
  const [value, onChange] = useState<Value>(new Date());

  return <div></div>;
};

export default Schedular;
