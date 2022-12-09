import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { buySellFeeListingByIdFn } from "../../../Redux/Actions/BuySell/BuySell.action";

function FeelistingModal(props) {
  useEffect(() => {
    console.log("useeff", props);
  }, [props]);

  // const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [fee, setFee] = useState("");
  const [plateFormfee, setPlateFormFee] = useState("");
  const [order_list, setOrderList] = useState("");
  const dispatch = useDispatch();
  const { buyData } = props;
  const onUpdate = (id) => {
    setId(id.toString());
    let data = {
      type: buyData?.type,
      fee: fee,
      plateFormfee: buyData.platform_fee,
      order_limit: order_list,
      fee_type: buyData?.fee_type,
      coin_id: buyData?.id,
    };
    dispatch(buySellFeeListingByIdFn(data, "", id)).then((val) => {
      alert(val.data);
      props.setOpen(false);
    });
  };
  const onFeeChange = (e) => {
    setFee(e.target.value);
  };
  const onOrderListChange = (e) => {
    setOrderList(e.target.value);
  };
  const onPlateFromFeeChange = (e) => {
    setPlateFormFee(e.target.value);
  };
  console.log("mmmm", props.open);
  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      style={{
        width: "600px",
        height: "330px",
        margin: "200px 500px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <label>
          <strong>Coin</strong>
        </label>
        <p>{buyData?.token_key}</p>
        <label>
          <strong>Type</strong>
        </label>
        <p>{buyData?.fee_type}</p>
        <label>Trading Fee</label>
        <div
          class="ui focus input"
          style={{ width: "200px", margin: "10px 200px" }}
        >
          <input
            type="text"
            placeholder={buyData?.fee}
            value={fee}
            onChange={(e) => onFeeChange(e)}
          />
        </div>
        <label>Platform fee</label>
        <div
          class="ui focus input"
          style={{ width: "200px", margin: "10px 200px" }}
        >
          <input
            type="text"
            placeholder={buyData?.platform_fee}
            value={plateFormfee}
            onChange={(e) => onPlateFromFeeChange(e)}
          />
        </div>
        <label>Order Limit</label>
        <div
          class="ui focus input"
          style={{ width: "200px", margin: "10px 200px" }}
        >
          <input
            type="text"
            placeholder={buyData?.order_limit}
            value={order_list}
            onChange={(e) => onOrderListChange(e)}
          />
        </div>
        <Button
          variant="outline-purple"
          style={{ width: "100px", margin: "10px 250px" }}
          onClick={() => onUpdate(buyData?.id)}
        >
          Update
        </Button>
      </div>
    </Modal>
  );
}

export default React.memo(FeelistingModal);
