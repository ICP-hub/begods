import { Principal } from "@dfinity/principal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const afterPaymentFlow = async (
  backendActor,
  sendAmount,
  transationId,
  collectionId,
  subAccount,
  ledgerActor,
  metaData
) => {
  try {
    const transactionArg = {
      amount: { e8s: Number(sendAmount) },
      to: transationId,
      fee: { e8s: metaData?.["icrc1:fee"] },
      memo: 0,
      from_subaccount: [],
      created_at_time: [],
    };
    console.log(sendAmount, subAccount, metaData);
    console.log(transactionArg);
    console.log(ledgerActor);
    const sendBalanceResult = await ledgerActor.send_dfx(transactionArg);
    console.log(sendBalanceResult);
    if (BigInt(sendBalanceResult) > 0) {
      const response = await backendActor.settlepurchase(
        Principal.fromText(collectionId),
        transationId
      );

      console.log(response, "success1");
      if ("ok" in response && response.ok === null) {
        const finalResult = await backendActor.balance_nft_settelment(
          Principal.fromText(collectionId)
        );
        if (finalResult === undefined) {
          console.log("congratutation");
          return true;
        } else {
          console.log("balance settelment failed");
          return false;
        }
      }
    } else {
      console.log("no balance");
      return false;
    }
  } catch (error) {
    console.error("Error in afterPaymentFlow:", error);

    throw error;
  }
};

const formatTokenMetaData = (arr) => {
  const resultObject = {};
  arr.forEach((item) => {
    const key = item[0];
    const value = item[1][Object.keys(item[1])[0]];
    resultObject[key] = value;
  });
  return resultObject;
};

const getBalance = async (backendActor) => {
  let bal = await backendActor.get_balance();
  return parseInt(bal);
};

export const transferApprove = async (
  backendActor,
  ledgerActor,
  sendAmount,
  principal,
  transationId,
  collectionId,
  subAccount,
  setbuyPopup
) => {
  let metaData = null;
  try {
    const metadataResponse = await ledgerActor.icrc1_metadata();
    metaData = formatTokenMetaData(metadataResponse);
    console.log(sendAmount, metaData, "metaData");
    const amnt = parseInt(Number(sendAmount));
    // const ledgerBalance = await getBalance(backendActor);
    const ledgerBalance = await ledgerActor.icrc1_balance_of({
      owner: principal,
      subaccount: [],
    });
    console.log(amnt, ledgerBalance, "amount to user send");

    if (ledgerBalance >= amnt) {
      console.log(
        "ledger if condition start",
        metaData?.["icrc1:fee"],
        process.env.CANISTER_ID_BEGOD_BACKEND
      );
      const totatSendBalance = Number(amnt);
      const transaction = {
        amount: Number(amnt) + Number(metaData?.["icrc1:fee"]),
        from_subaccount: [],
        spender: {
          owner: Principal.fromText(process.env.CANISTER_ID_BEGOD_BACKEND),
          subaccount: [],
        },
        fee: [metaData?.["icrc1:fee"]],
        memo: [],
        created_at_time: [],
        expected_allowance: [],
        expires_at: [],
      };

      // const approvalResponse = await ledgerActor.icrc2_approve(transaction);
      const approvalResponse = await afterPaymentFlow(
        backendActor,
        totatSendBalance,
        transationId,
        collectionId,
        subAccount,
        ledgerActor,
        metaData
      );

      console.log(approvalResponse, "approvalResponse");
      return approvalResponse;

      // if (approvalResponse?.Err) {
      //   return approvalResponse;
      // } else {
      //   return await afterPaymentFlow(
      //     backendActor,
      //     totatSendBalance,
      //     transationId,
      //     collectionId,
      //     subAccount,
      //     ledgerActor,
      //     metaData
      //   );
      // }
    } else {
      console.log("balance is less : ", amnt, sendAmount);
      return { error: "Insufficient balance" };
    }
  } catch (error) {
    console.error("Error in transferApprove:", error);
    toast.error("Payment Cancelled!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setbuyPopup(false);
    throw error;
  }
};
