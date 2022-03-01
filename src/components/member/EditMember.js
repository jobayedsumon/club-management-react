import React from "react";
import { useParams } from "react-router-dom";
import MemberForm from "./MemberForm";

const EditMember = () => {
  const params = useParams();

  return <MemberForm id={params.id} />;
};

export default EditMember;
