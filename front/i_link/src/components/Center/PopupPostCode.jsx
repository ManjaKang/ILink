// 2022 08 08 배지우

import React from "react";
import DaumPostcode from "react-daum-postcode";
import { Button, Modal } from "@mui/material";

const PopupPostCode = (props) => {
  const { addAddress, onClose } = props;
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    const addressdata = {
      fullAddress: fullAddress,
      zonecode: data.zonecode,
    };

    addAddress(addressdata);
    onClose();
  };

  const postCodeStyle = {
    position: "fixed",
    top: 110,
    left: 650,
    width: 500,
    bgcolor: "red",
    border: "2px solid #000",
    boxShadow: 0,
    p: 4,
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />

      <Button 
        id ="font_test"
        sx={{
        
        ml : 13,
        background : "#FF8A7B",
        color : "black",
        }}
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </Button>
    </div>
  );
};

export default PopupPostCode;
