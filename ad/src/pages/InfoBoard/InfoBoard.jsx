import { useEffect, useState } from "react";
import LatestTransactions from "../../components/InfoItem/LatestTransactions";
import Summary from "../../components/InfoItem/Summary";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";

function InfoBoard() {
  const { user, userAxios } = useUser();

  const [infoBoard, setInfoBoard] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get("/info-board");
        // console.log(res.data);
        setInfoBoard(res.data);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user]);

  return (
    <>
      {!infoBoard ? (
        <p>Loading data...</p>
      ) : (
        <>
          <Summary
            users={infoBoard?.totalUser}
            orders={infoBoard?.transactions?.length}
            earn={infoBoard?.totalEarning}
          />
          <LatestTransactions transactions={infoBoard?.transactions} />
        </>
      )}
    </>
  );
}

export default InfoBoard;
