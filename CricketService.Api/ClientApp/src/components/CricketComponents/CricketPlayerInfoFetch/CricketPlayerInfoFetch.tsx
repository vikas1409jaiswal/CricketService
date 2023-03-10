import { useState } from "react";
import { ProgressBar } from "../../common/ProgressBar";
import { usePlayerInfo } from "./usePlayerInfo";

import "./CricketPlayerInfoFetch.scss";

export interface CricketPlayerInfoFetchProps {
  players: string[][];
  totalFetchPlayers: number;
  setTotalFetchPlayers: (count: number) => void;
}

export const CricketPlayerInfoFetch: React.FunctionComponent<
  CricketPlayerInfoFetchProps
> = ({ players, totalFetchPlayers, setTotalFetchPlayers }) => {
  const [isEnabledInput, toggleInput] = useState(true);
  const [isFetch, toggleFetch] = useState(false);

  const playersInfo = usePlayerInfo(players, true);

  const fetchedLength = playersInfo.filter((x) => x.fullName.length > 0).length;
  const fetchedPercent = (fetchedLength * 100) / totalFetchPlayers;

  return (
    <div className="cricket-player-fetch-container">
      <h1 className="fetch-player-header">Fetch Players Info</h1>
      <div className="fetch-panel">
        <input
          type="text"
          value={totalFetchPlayers}
          disabled={isEnabledInput}
          onChange={(e: any) => setTotalFetchPlayers(e.target.value)}
        />
        <button
          onClick={() => {
            toggleFetch(false);
            toggleInput(!isEnabledInput);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            toggleFetch(!isFetch);
          }}
        >
          Fetch
        </button>
      </div>
      <div className="progress-bar-container">
        <ProgressBar percent={fetchedPercent} />
        <h1>
          {fetchedLength} out of {totalFetchPlayers}
        </h1>
      </div>
      <button
        className="download-button"
        onClick={() => downloadJsonData(playersInfo)}
        disabled={fetchedPercent !== 100}
      >
        Download
      </button>
    </div>
  );
};

const downloadJsonData = (data: any) => {
  const filepath = `playersData.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filepath;

  link.click();

  URL.revokeObjectURL(url);
};
