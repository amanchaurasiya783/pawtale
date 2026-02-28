"use client";
import { useEffect, useState } from "react";
import { PlusCircleIcon as AddIcon } from "@heroicons/react/outline";

const AddIconComp = () => {
  return (
    <div>
      <AddIcon
        onClick={() => setSaveStatus(true)}
        className="w-8 h-8 hover:bg-gray-100 p-1 rounded-full"
      />
    </div>
  );
};

export default AddIconComp;
