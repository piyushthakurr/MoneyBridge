import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";
import { balanceReportFn } from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";
import ImportCsv from "../../../Components/common/common";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { SMALLEST_UNIT } from "../../../Constants/constant";

const CoinProfile = () => {
  const dispatch = useDispatch();
  const balanceReports = useSelector((state) => state.withdraw.balanceReports);
  const [stateCsvData, setStateCsvData] = useState();
  const [activeCoins, setActiveCoins] = useState();

  const getWithdrawTransactions = () => {
    dispatch(activeCoinsFn()).then((val) => {
      if (val) {
        setActiveCoins(val);
        hitBalanceApiForEachCoin(val);
      }
    });

    const hitBalanceApiForEachCoin = (val) => {
      val.forEach((element, i) => {
        dispatch(balanceReportFn(element));
      });
    };
  };

  useEffect(() => {
    dispatch({ type: types.EMPTY_REPORTS });
    getWithdrawTransactions();
  }, []);

  useEffect(() => {
    let statementCsvData = [];
    if (balanceReports !== undefined && balanceReports.length > 0) {
      balanceReports.map((stateData) => {
        let data = {
          Coin:
            stateData?.coin != null ? stateData?.coin?.toUpperCase() : "N/A",
          Deposit:
            stateData?.data?.deposits[0]?.totalDeposits / SMALLEST_UNIT
              ? stateData?.data?.data[0]?.total
              : "N/A",
          Withdrawal:
            stateData?.data?.withdraw[0]?.totalWithdraw / SMALLEST_UNIT,
          Balance: stateData?.data?.data[0]?.balance / SMALLEST_UNIT,
          Locked: stateData?.data?.data[0]?.locked_balance / SMALLEST_UNIT,
        };

        statementCsvData.push(data);
      });
      setStateCsvData(statementCsvData);
    }
  }, [balanceReports]);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Coin Profile" subtitle="" />
        <ImportCsv stateCsvData={stateCsvData} file_name={"Coin_Profile"} />
        <Card>
          <Card.Body>
            {balanceReports !== undefined && balanceReports?.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Deposit</th>
                    <th>Withdrawal</th>
                    <th>Balance</th>
                    <th>Locked</th>
                  </tr>
                </thead>
                <tbody>
                  {balanceReports.map((balanceReport, i) => (
                    <tr>
                      <td>{balanceReport?.coin.toUpperCase()}</td>
                      <td>
                        {balanceReport?.data?.deposits[0]?.totalDeposits /
                          SMALLEST_UNIT}
                      </td>
                      <td>
                        {balanceReport?.data?.withdraw[0]?.totalWithdraw /
                          SMALLEST_UNIT}
                      </td>
                      <td>
                        {balanceReport?.data?.data[0]?.balance / SMALLEST_UNIT}
                      </td>
                      <td>
                        {balanceReport?.data?.data[0]?.locked_balance /
                          SMALLEST_UNIT}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Funds/Commitment</th>
                  </tr>
                </thead>
                <tbody>
                  <td colSpan="7" className="text-center">
                    No Record Found
                  </td>
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CoinProfile;
