import React from "react";

function page({ params }: any) {
  return (
    <div>
      <div>User Info</div>
      <div>{params.id}</div>
    </div>
  );
}

export default page;
