import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <h1> Resource Details: {id}</h1>
    </div>
  );
};

export default page;
