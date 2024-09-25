import React from "react";
import Spinner from "../shared/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <Spinner className="border-slate-950" />
    </div>
  );
};

export default Loading;
