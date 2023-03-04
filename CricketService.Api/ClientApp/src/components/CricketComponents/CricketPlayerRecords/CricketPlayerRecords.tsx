import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DropDown } from '../../common/DropDown';
import { T20IPlayersRecords } from './T20IRecords/T20IPlayersRecords';
import { ODIPlayersRecords } from './ODIRecords/ODIPlayersRecords';
import { useQuery } from 'react-query';
import { CricketFormat } from '../CricketMatchRecords/Models/Interface';
import * as players from './../../../data/StaticData/playerData.json';
import { PlayerData } from './Models/Interface';

import './CricketPlayerRecords.scss';

const fetchPlayersByTeam = (teamName: string): Promise<AxiosResponse<PlayerData[]>> => {
    return axios.get(`http://localhost:5104/cricketplayer/team/${teamName}/players?format=1`);
};

export const usePlayersByTeam = (teamName: string) => {
    const { isLoading, data } = useQuery(['cricket-player', teamName], () => fetchPlayersByTeam(teamName));

    console.log(data)

    return { data: data?.data, isLoading: false };
};

export interface CricketPlayerRecordsProps {
}

export const CricketPlayerRecords: React.FunctionComponent<CricketPlayerRecordsProps> = () => {

    const [teamNames, setTeamNames] = useState([]);
    const [currentSelectedTeamName, setSelectedTeam] = useState("Zimbabwe");
    const [selectedFormat, setSelectedFormat] = useState<CricketFormat>(CricketFormat.ODI);

    //const { isLoading, data } = usePlayersByTeam(currentSelectedTeamName);

    useEffect(() => {
        const fetchData = async () => {
            const formatId = selectedFormat === CricketFormat.ODI ? 1 : 0;
            const result = await axios(
                `http://localhost:5104/cricketteam/teams/all?format=${formatId}`,
            );
            setTeamNames(result.data);
        };
        fetchData();
    }, [selectedFormat]);

    const playersData = data;

    return (
        <>
            <div className='format-selection'>
                {
                    [CricketFormat.ODI, CricketFormat.T20I, CricketFormat.Test]
                        .map(x => <span
                            key={x}
                            style={{ backgroundColor: selectedFormat === x ? 'blue' : 'black' }}
                            onClick={() => setSelectedFormat(x)}>
                            {x}
                        </span>)
                }
            </div>
            <DropDown
                dropDownText={"Team Name"}
                dropownOptions={teamNames}
                onSelect={(o) => setSelectedTeam(o)}
                selectedValue={currentSelectedTeamName} />
            {
                selectedFormat === CricketFormat.T20I && <T20IPlayersRecords
                    isLoading={false}
                    players={playersData.filter(x => x.careerDetails.t20Career.battingStatistics !== null) as any} />
            }
            {
                selectedFormat === CricketFormat.ODI && <ODIPlayersRecords
                    isLoading={false}
                    players={playersData.filter(x => x.careerDetails.odiCareer.battingStatistics !== null) as any} />
            }
        </>
    );
};

const data = [
	{
		"playerUuid": "b9185629-a53b-41c8-8366-fdba84a78cbf",
		"fullName": "Sunil Gavaskar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 108,
					"innings": 102,
					"runs": 3092,
					"ballsFaced": 4966,
					"centuries": 1,
					"halfCenturies": 27,
					"highestScore": 103,
					"fours": 234,
					"sixes": 21,
					"strikeRate": 62.263391059202576
				},
				"bowlingStatistics": {
					"matches": 108,
					"innings": 4,
					"wickets": 1,
					"overs": {
						"overs": 3.2,
						"balls": 20
					},
					"runsConceded": 25,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 7.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b8e99484-dcbe-4394-aa7a-c34aab4a5d45",
		"fullName": "Sudhir Naik",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 38,
					"ballsFaced": 68,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 20,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 55.88235294117647
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "57d4aafe-3db9-4a18-ba47-9c3fb00e74e3",
		"fullName": "Ajit Wadekar�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 73,
					"ballsFaced": 90,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 67,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 81.11111111111111
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ee44ce2f-08f2-4247-8077-d3176d62238f",
		"fullName": "Gundappa Viswanath",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 25,
					"innings": 23,
					"runs": 439,
					"ballsFaced": 830,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 75,
					"fours": 33,
					"sixes": 0,
					"strikeRate": 52.89156626506024
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "453b6e89-abca-46b0-8b0e-916f7c89e5ba",
		"fullName": "Farokh Engineer��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 4,
					"runs": 114,
					"ballsFaced": 195,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 54,
					"fours": 13,
					"sixes": 0,
					"strikeRate": 58.46153846153846
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "52a61b2f-3bf7-4f6b-a7b4-8388e1c16ab4",
		"fullName": "Brijesh Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 9,
					"runs": 243,
					"ballsFaced": 399,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 82,
					"fours": 22,
					"sixes": 3,
					"strikeRate": 60.902255639097746
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d6550be8-5bf7-4567-a04a-9e9e6db56818",
		"fullName": "Eknath Solkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 6,
					"runs": 27,
					"ballsFaced": 79,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 34.177215189873415
				},
				"bowlingStatistics": {
					"matches": 7,
					"innings": 6,
					"wickets": 4,
					"overs": {
						"overs": 38,
						"balls": 228
					},
					"runsConceded": 169,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.447368421052632
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c7c9d766-84e7-4152-9b47-f4b0ce6363ec",
		"fullName": "Syed Abid Ali",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 3,
					"runs": 93,
					"ballsFaced": 132,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 70,
					"fours": 6,
					"sixes": 1,
					"strikeRate": 70.45454545454545
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 7,
					"overs": {
						"overs": 56,
						"balls": 336
					},
					"runsConceded": 187,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 10,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.3392857142857144
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "bb887c32-91e1-4f9a-819f-fd1ee7bace86",
		"fullName": "Madan Lal",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 67,
					"innings": 35,
					"runs": 401,
					"ballsFaced": 645,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 53,
					"fours": 25,
					"sixes": 3,
					"strikeRate": 62.17054263565891
				},
				"bowlingStatistics": {
					"matches": 67,
					"innings": 64,
					"wickets": 73,
					"overs": {
						"overs": 523.4,
						"balls": 3142
					},
					"runsConceded": 2137,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 44,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.080840229153406
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "60a4a72f-a2db-4288-8bce-b2574833b7c5",
		"fullName": "Srinivas Venkataraghavan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 9,
					"runs": 54,
					"ballsFaced": 126,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 42.857142857142854
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 14,
					"wickets": 5,
					"overs": {
						"overs": 140,
						"balls": 840
					},
					"runsConceded": 542,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 7,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.8714285714285714
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d82892d1-edcb-4540-99c1-17e46bd8d6a5",
		"fullName": "Bishan Bedi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 7,
					"runs": 31,
					"ballsFaced": 70,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 44.285714285714285
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 7,
					"overs": {
						"overs": 96,
						"balls": 576
					},
					"runsConceded": 340,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 17,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.5416666666666665
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2422a661-d072-4a05-adcf-a10719267e9b",
		"fullName": "Gopal Bose",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 13,
					"ballsFaced": 18,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 72.22222222222223
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 11,
						"balls": 66
					},
					"runsConceded": 39,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 2,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.5454545454545454
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5fccc096-5030-45b7-ae84-497bb3ae26fb",
		"fullName": "Ashok Mankad",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 44,
					"ballsFaced": 61,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 44,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 72.1311475409836
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 5.5,
						"balls": 35
					},
					"runsConceded": 47,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 8.057142857142857
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a1fc6949-984e-4fa8-b4c5-531a92110741",
		"fullName": "Anshuman Gaekwad",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 14,
					"runs": 269,
					"ballsFaced": 509,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 78,
					"fours": 15,
					"sixes": 0,
					"strikeRate": 52.848722986247544
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 39,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.875
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "50403711-9f82-400a-ab70-835215f37158",
		"fullName": "Mohinder Amarnath",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 85,
					"innings": 75,
					"runs": 1924,
					"ballsFaced": 3334,
					"centuries": 2,
					"halfCenturies": 13,
					"highestScore": 102,
					"fours": 123,
					"sixes": 9,
					"strikeRate": 57.70845830833833
				},
				"bowlingStatistics": {
					"matches": 85,
					"innings": 64,
					"wickets": 46,
					"overs": {
						"overs": 450.2,
						"balls": 2702
					},
					"runsConceded": 1971,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 17,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.376757957068838
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "49fd19b9-ecb0-440e-83ec-f4da699d31e3",
		"fullName": "Srinivas Venkataraghavan�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 5,
					"runs": 50,
					"ballsFaced": 108,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 46.2962962962963
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "46160842-3245-4408-bb4c-9a8822591c6f",
		"fullName": "Karsan Ghavri",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 19,
					"innings": 16,
					"runs": 114,
					"ballsFaced": 194,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 20,
					"fours": 8,
					"sixes": 0,
					"strikeRate": 58.76288659793814
				},
				"bowlingStatistics": {
					"matches": 19,
					"innings": 19,
					"wickets": 15,
					"overs": {
						"overs": 172.1,
						"balls": 1033
					},
					"runsConceded": 708,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 12,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.112294288480155
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a47713d9-51ca-4252-844f-4a06800a7f3a",
		"fullName": "Chetan Chauhan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 7,
					"runs": 153,
					"ballsFaced": 301,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 46,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 50.83056478405316
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4a169d86-d14f-4ea1-8362-65a19cde43c2",
		"fullName": "Roger Binny",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 72,
					"innings": 49,
					"runs": 629,
					"ballsFaced": 1046,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 51,
					"sixes": 1,
					"strikeRate": 60.133843212237096
				},
				"bowlingStatistics": {
					"matches": 72,
					"innings": 67,
					"wickets": 77,
					"overs": {
						"overs": 492.5,
						"balls": 2957
					},
					"runsConceded": 2260,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 37,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.585728779168075
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "eded35cf-c249-46bb-b176-79b434594ab5",
		"fullName": "Dilip Vengsarkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 129,
					"innings": 120,
					"runs": 3508,
					"ballsFaced": 5179,
					"centuries": 1,
					"halfCenturies": 23,
					"highestScore": 105,
					"fours": 228,
					"sixes": 24,
					"strikeRate": 67.73508399304885
				},
				"bowlingStatistics": {
					"matches": 129,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 4,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "acdbd3e3-9446-4395-884f-7ff7929c4d2c",
		"fullName": "Sunil Gavaskar�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 37,
					"innings": 31,
					"runs": 702,
					"ballsFaced": 1138,
					"centuries": 0,
					"halfCenturies": 5,
					"highestScore": 80,
					"fours": 47,
					"sixes": 2,
					"strikeRate": 61.6871704745167
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7d67e9fd-0317-4b94-970b-e8184ce15a91",
		"fullName": "Yashpal Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 42,
					"innings": 40,
					"runs": 883,
					"ballsFaced": 1401,
					"centuries": 0,
					"halfCenturies": 4,
					"highestScore": 89,
					"fours": 52,
					"sixes": 10,
					"strikeRate": 63.02640970735189
				},
				"bowlingStatistics": {
					"matches": 42,
					"innings": 8,
					"wickets": 1,
					"overs": {
						"overs": 33.3,
						"balls": 201
					},
					"runsConceded": 199,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.940298507462686
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "fef1ca90-40f6-4e2e-a5d6-c383eb118d88",
		"fullName": "Kapil Dev",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 224,
					"innings": 198,
					"runs": 3783,
					"ballsFaced": 3979,
					"centuries": 1,
					"halfCenturies": 14,
					"highestScore": 175,
					"fours": 291,
					"sixes": 67,
					"strikeRate": 95.07413923096256
				},
				"bowlingStatistics": {
					"matches": 224,
					"innings": 221,
					"wickets": 253,
					"overs": {
						"overs": 1867,
						"balls": 11202
					},
					"runsConceded": 6945,
					"noBall": 11,
					"wideBall": 44,
					"maidens": 235,
					"dots": 46,
					"sixes": 0,
					"fours": 1,
					"economy": 3.719871451526513
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "18d333d3-0ae2-4b06-a7a9-7070b0e44dfc",
		"fullName": "Syed Kirmani��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 48,
					"innings": 30,
					"runs": 367,
					"ballsFaced": 608,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 48,
					"fours": 24,
					"sixes": 0,
					"strikeRate": 60.36184210526316
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "14122a49-0b46-47a1-adcb-68ff25da5736",
		"fullName": "Yograj Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 4,
					"runs": 1,
					"ballsFaced": 12,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 8.333333333333334
				},
				"bowlingStatistics": {
					"matches": 6,
					"innings": 5,
					"wickets": 4,
					"overs": {
						"overs": 40.4,
						"balls": 244
					},
					"runsConceded": 186,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.573770491803279
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c26ef182-238f-40de-8dac-18e44f70decf",
		"fullName": "Dilip Doshi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 5,
					"runs": 9,
					"ballsFaced": 20,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 45
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 15,
					"wickets": 22,
					"overs": {
						"overs": 132,
						"balls": 792
					},
					"runsConceded": 524,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 8,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.9696969696969697
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d7a04323-b702-4216-893d-4217ff09c424",
		"fullName": "Parthasarthi Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 20,
					"ballsFaced": 39,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 14,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 51.282051282051285
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7c7624ea-b00b-43c0-866f-805039ec71b8",
		"fullName": "Bishan Bedi�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 2,
					"runs": 6,
					"ballsFaced": 15,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 40
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a39b1daa-3db2-4bfd-b4e8-b5d4f33a5f02",
		"fullName": "Sudhakar Rao",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 4,
					"ballsFaced": 14,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 28.571428571428573
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "161c75d5-ec25-4f9e-8877-47e82669f7bc",
		"fullName": "Pochiah Krishnamurthy��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 6,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 46.15384615384615
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c9522b61-1a48-48a6-bbea-54348980e18c",
		"fullName": "Bhagwath Chandrasekhar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 11,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 11,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 84.61538461538461
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 3,
					"overs": {
						"overs": 7,
						"balls": 42
					},
					"runsConceded": 36,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.142857142857143
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8566f0cb-a145-4a76-aa56-86e6c138402d",
		"fullName": "Surinder Amarnath",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 100,
					"ballsFaced": 119,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 62,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 84.03361344537815
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2c3f9ba7-f6f9-46e0-96de-578fb7dbcfbd",
		"fullName": "Bharath Reddy��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 11,
					"ballsFaced": 20,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 55
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9d78a6a4-6ceb-4686-949e-cc4ca419437e",
		"fullName": "Surinder Khanna��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 10,
					"runs": 176,
					"ballsFaced": 265,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 56,
					"fours": 16,
					"sixes": 2,
					"strikeRate": 66.41509433962264
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b8271995-5dc3-4ab6-9f82-790d0118467b",
		"fullName": "Tirumalai Srinivasan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 10,
					"ballsFaced": 35,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 28.571428571428573
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6b7c475c-7f2c-4ddb-907a-cd50595bd089",
		"fullName": "Kirti Azad",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 25,
					"innings": 21,
					"runs": 269,
					"ballsFaced": 400,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 39,
					"fours": 19,
					"sixes": 9,
					"strikeRate": 67.25
				},
				"bowlingStatistics": {
					"matches": 25,
					"innings": 11,
					"wickets": 7,
					"overs": {
						"overs": 65,
						"balls": 390
					},
					"runsConceded": 273,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.2
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "99e52a32-9fd2-4c13-892b-ddbff399f659",
		"fullName": "Sandeep Patil",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 45,
					"innings": 42,
					"runs": 1005,
					"ballsFaced": 1223,
					"centuries": 0,
					"halfCenturies": 9,
					"highestScore": 84,
					"fours": 74,
					"sixes": 12,
					"strikeRate": 82.1749795584628
				},
				"bowlingStatistics": {
					"matches": 45,
					"innings": 20,
					"wickets": 15,
					"overs": {
						"overs": 144,
						"balls": 864
					},
					"runsConceded": 589,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 9,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.090277777777778
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "254aea0c-7a55-45cc-a998-f4f45d829460",
		"fullName": "Gundappa Viswanath�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 5,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 71.42857142857143
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "572336f7-6340-4954-901f-ec03247e1ead",
		"fullName": "Kris Srikkanth",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 145,
					"innings": 145,
					"runs": 4091,
					"ballsFaced": 5702,
					"centuries": 4,
					"halfCenturies": 27,
					"highestScore": 123,
					"fours": 405,
					"sixes": 41,
					"strikeRate": 71.7467555243774
				},
				"bowlingStatistics": {
					"matches": 145,
					"innings": 33,
					"wickets": 25,
					"overs": {
						"overs": 118.4,
						"balls": 712
					},
					"runsConceded": 641,
					"noBall": 1,
					"wideBall": 0,
					"maidens": 3,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.401685393258427
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6fba73d8-2aa1-47e2-ab79-e3bf5b1de942",
		"fullName": "Ravi Shastri",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 149,
					"innings": 128,
					"runs": 3108,
					"ballsFaced": 5089,
					"centuries": 4,
					"halfCenturies": 18,
					"highestScore": 109,
					"fours": 206,
					"sixes": 25,
					"strikeRate": 61.07290233837689
				},
				"bowlingStatistics": {
					"matches": 149,
					"innings": 136,
					"wickets": 129,
					"overs": {
						"overs": 1102.1,
						"balls": 6613
					},
					"runsConceded": 4650,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 56,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.218962649327083
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "223eb142-3050-489a-aebb-95121e19701c",
		"fullName": "Randhir Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 12,
						"balls": 72
					},
					"runsConceded": 48,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "318ae0eb-acf4-4f7b-b63c-c130a76c51d4",
		"fullName": "Suru Nayak",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 1,
					"runs": 3,
					"ballsFaced": 19,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 15.789473684210526
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 1,
					"overs": {
						"overs": 37,
						"balls": 222
					},
					"runsConceded": 161,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.351351351351352
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "274dd409-aa1f-47fc-b5a8-dfd4d76e2d94",
		"fullName": "Arun Lal",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 13,
					"runs": 122,
					"ballsFaced": 232,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 51,
					"fours": 10,
					"sixes": 1,
					"strikeRate": 52.58620689655172
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7d17e9a6-5cf4-42e5-ae31-a3a887aa8841",
		"fullName": "Ashok Malhotra",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 20,
					"innings": 19,
					"runs": 457,
					"ballsFaced": 645,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 65,
					"fours": 29,
					"sixes": 1,
					"strikeRate": 70.85271317829458
				},
				"bowlingStatistics": {
					"matches": 20,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 0,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 0
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e8d60f69-d55d-47ba-bb49-c49438d42023",
		"fullName": "Ghulam Parkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 10,
					"runs": 165,
					"ballsFaced": 332,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 42,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 49.69879518072289
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "14c59a30-2765-4aec-a6bd-aba042f9c1e6",
		"fullName": "Chetan Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 65,
					"innings": 35,
					"runs": 456,
					"ballsFaced": 504,
					"centuries": 1,
					"halfCenturies": 0,
					"highestScore": 101,
					"fours": 31,
					"sixes": 4,
					"strikeRate": 90.47619047619048
				},
				"bowlingStatistics": {
					"matches": 65,
					"innings": 63,
					"wickets": 67,
					"overs": {
						"overs": 472.3,
						"balls": 2835
					},
					"runsConceded": 2336,
					"noBall": 4,
					"wideBall": 2,
					"maidens": 19,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.943915343915344
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f80ba46e-d012-4e63-a638-d719979f10b1",
		"fullName": "Ashok Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 2,
					"runs": 6,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 54.54545454545455
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 6,
					"wickets": 7,
					"overs": {
						"overs": 60,
						"balls": 360
					},
					"runsConceded": 263,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.383333333333334
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e5988bc5-b215-4e07-ad91-2b591182e547",
		"fullName": "Kapil Dev�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 74,
					"innings": 67,
					"runs": 1564,
					"ballsFaced": 1479,
					"centuries": 1,
					"halfCenturies": 7,
					"highestScore": 175,
					"fours": 114,
					"sixes": 31,
					"strikeRate": 105.74712643678161
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "467fbb02-9fa4-41a7-be90-23f231e08701",
		"fullName": "Balwinder Sandhu",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 22,
					"innings": 7,
					"runs": 51,
					"ballsFaced": 97,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 52.577319587628864
				},
				"bowlingStatistics": {
					"matches": 22,
					"innings": 21,
					"wickets": 16,
					"overs": {
						"overs": 185,
						"balls": 1110
					},
					"runsConceded": 763,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 15,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.124324324324324
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3574bac2-4403-4f54-a4ca-7d99a00aa205",
		"fullName": "Maninder Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 58,
					"innings": 18,
					"runs": 49,
					"ballsFaced": 90,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 54.44444444444444
				},
				"bowlingStatistics": {
					"matches": 58,
					"innings": 57,
					"wickets": 66,
					"overs": {
						"overs": 522.1,
						"balls": 3133
					},
					"runsConceded": 2066,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 33,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.956591126715608
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0d6fc6fd-c7b1-4097-bf54-2e772f1fbb9a",
		"fullName": "Thirumalai Sekhar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 5,
					"overs": {
						"overs": 26,
						"balls": 156
					},
					"runsConceded": 128,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.923076923076923
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "21de2a8a-b6c8-46e8-8fc6-eaa5ac89c024",
		"fullName": "Syed Kirmani�(c)�",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 6,
					"ballsFaced": 8,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 75
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "03837771-26d8-40e9-821e-66231e064ac1",
		"fullName": "Raju Kulkarni",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 5,
					"runs": 33,
					"ballsFaced": 39,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 15,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 84.61538461538461
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 10,
					"overs": {
						"overs": 74,
						"balls": 444
					},
					"runsConceded": 345,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.662162162162162
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0b6a4cd8-556f-4e52-b251-5ed586f27500",
		"fullName": "Mohammad Azharuddin�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 173,
					"innings": 162,
					"runs": 5239,
					"ballsFaced": 6677,
					"centuries": 4,
					"halfCenturies": 37,
					"highestScore": 153,
					"fours": 360,
					"sixes": 51,
					"strikeRate": 78.46338175827468
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e49e03ea-60d7-4d2b-b6db-d5a63ac80995",
		"fullName": "Sachin Tendulkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 457,
					"innings": 452,
					"runs": 18426,
					"ballsFaced": 21368,
					"centuries": 49,
					"halfCenturies": 96,
					"highestScore": 200,
					"fours": 2016,
					"sixes": 195,
					"strikeRate": 86.23174840883564
				},
				"bowlingStatistics": {
					"matches": 457,
					"innings": 270,
					"wickets": 154,
					"overs": {
						"overs": 1342.2,
						"balls": 8054
					},
					"runsConceded": 6850,
					"noBall": 43,
					"wideBall": 195,
					"maidens": 24,
					"dots": 1222,
					"sixes": 26,
					"fours": 177,
					"economy": 5.103054382915322
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 10,
					"ballsFaced": 12,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 83.33333333333333
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 2.3,
						"balls": 15
					},
					"runsConceded": 12,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 8,
					"sixes": 0,
					"fours": 1,
					"economy": 4.8
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "36a47743-6a38-4ca7-81d6-8809d4fdac84",
		"fullName": "Sanjay Manjrekar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 73,
					"innings": 70,
					"runs": 1994,
					"ballsFaced": 3101,
					"centuries": 1,
					"halfCenturies": 15,
					"highestScore": 105,
					"fours": 99,
					"sixes": 10,
					"strikeRate": 64.30183811673653
				},
				"bowlingStatistics": {
					"matches": 73,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 1.2,
						"balls": 8
					},
					"runsConceded": 10,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 7.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ed1293de-b60d-4984-8716-9ab7cf0dbe1e",
		"fullName": "Vinod Kambli",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 104,
					"innings": 97,
					"runs": 2477,
					"ballsFaced": 3443,
					"centuries": 2,
					"halfCenturies": 14,
					"highestScore": 106,
					"fours": 187,
					"sixes": 20,
					"strikeRate": 71.94307290153935
				},
				"bowlingStatistics": {
					"matches": 104,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 0.4,
						"balls": 4
					},
					"runsConceded": 7,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 10.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "33d8531c-4e92-4e0b-ba9a-1829751abcbe",
		"fullName": "Ajay Jadeja",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 192,
					"innings": 179,
					"runs": 5359,
					"ballsFaced": 7678,
					"centuries": 6,
					"halfCenturies": 30,
					"highestScore": 119,
					"fours": 366,
					"sixes": 85,
					"strikeRate": 69.7968220890857
				},
				"bowlingStatistics": {
					"matches": 192,
					"innings": 52,
					"wickets": 20,
					"overs": {
						"overs": 208,
						"balls": 1248
					},
					"runsConceded": 1094,
					"noBall": 7,
					"wideBall": 28,
					"maidens": 2,
					"dots": 31,
					"sixes": 0,
					"fours": 3,
					"economy": 5.259615384615385
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c0762f33-cb5d-4057-a25a-6f2ae87ba66b",
		"fullName": "Kiran More��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 93,
					"innings": 65,
					"runs": 563,
					"ballsFaced": 808,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 42,
					"fours": 43,
					"sixes": 4,
					"strikeRate": 69.67821782178218
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "bb882ab7-4186-413c-b366-cf9c72d2d0e3",
		"fullName": "Javagal Srinath",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 228,
					"innings": 121,
					"runs": 883,
					"ballsFaced": 1109,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 53,
					"fours": 62,
					"sixes": 17,
					"strikeRate": 79.62128043282236
				},
				"bowlingStatistics": {
					"matches": 228,
					"innings": 227,
					"wickets": 315,
					"overs": {
						"overs": 1989.1,
						"balls": 11935
					},
					"runsConceded": 8847,
					"noBall": 221,
					"wideBall": 241,
					"maidens": 137,
					"dots": 2039,
					"sixes": 21,
					"fours": 233,
					"economy": 4.447591118558861
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "00d1d5f3-e1d4-4b7c-9039-35abb5dd588d",
		"fullName": "Manoj Prabhakar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 129,
					"innings": 98,
					"runs": 1858,
					"ballsFaced": 3083,
					"centuries": 2,
					"halfCenturies": 11,
					"highestScore": 106,
					"fours": 157,
					"sixes": 0,
					"strikeRate": 60.265974699967565
				},
				"bowlingStatistics": {
					"matches": 129,
					"innings": 127,
					"wickets": 157,
					"overs": {
						"overs": 1060,
						"balls": 6360
					},
					"runsConceded": 4534,
					"noBall": 37,
					"wideBall": 34,
					"maidens": 76,
					"dots": 46,
					"sixes": 0,
					"fours": 1,
					"economy": 4.277358490566038
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "32c35b7a-5a3f-457b-8e0c-ea852128b4aa",
		"fullName": "Venkatapathy Raju",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 53,
					"innings": 16,
					"runs": 32,
					"ballsFaced": 67,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 47.76119402985075
				},
				"bowlingStatistics": {
					"matches": 53,
					"innings": 52,
					"wickets": 63,
					"overs": {
						"overs": 461.4,
						"balls": 2770
					},
					"runsConceded": 2014,
					"noBall": 0,
					"wideBall": 14,
					"maidens": 16,
					"dots": 65,
					"sixes": 1,
					"fours": 5,
					"economy": 4.362454873646209
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "05fd0143-a989-4d64-99c3-c0e3b2ba860b",
		"fullName": "Mohammad Azharuddin",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 329,
					"innings": 308,
					"runs": 9378,
					"ballsFaced": 12669,
					"centuries": 7,
					"halfCenturies": 58,
					"highestScore": 153,
					"fours": 622,
					"sixes": 77,
					"strikeRate": 74.02320625147999
				},
				"bowlingStatistics": {
					"matches": 329,
					"innings": 24,
					"wickets": 12,
					"overs": {
						"overs": 92,
						"balls": 552
					},
					"runsConceded": 479,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.206521739130435
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8f0dab88-5aa9-4932-911c-4ef9bea3c393",
		"fullName": "Sadanand Viswanath��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 22,
					"innings": 12,
					"runs": 72,
					"ballsFaced": 139,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 23,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 51.798561151079134
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "54edec00-663d-476d-b684-70acbfc49c96",
		"fullName": "Gopal Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 11,
					"innings": 2,
					"runs": 11,
					"ballsFaced": 24,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 7,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 45.833333333333336
				},
				"bowlingStatistics": {
					"matches": 11,
					"innings": 10,
					"wickets": 10,
					"overs": {
						"overs": 81,
						"balls": 486
					},
					"runsConceded": 361,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.45679012345679
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1552d3ec-84e5-4114-a140-64ddcd290ec2",
		"fullName": "Mohinder Amarnath�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "deb0bfa3-31f5-4e25-8be6-70f2f6db9aca",
		"fullName": "Rajinder Singh Ghai",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 3,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 33.333333333333336
				},
				"bowlingStatistics": {
					"matches": 6,
					"innings": 6,
					"wickets": 3,
					"overs": {
						"overs": 45.5,
						"balls": 275
					},
					"runsConceded": 260,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.672727272727273
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1d1c2749-d782-4641-bde2-31d2e76f994a",
		"fullName": "Lalchand Rajput",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 4,
					"runs": 9,
					"ballsFaced": 31,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 29.032258064516128
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 7,
						"balls": 42
					},
					"runsConceded": 42,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d958e789-32ab-4bfd-a6cd-2cb1bf0a6aa4",
		"fullName": "Laxman Sivaramakrishnan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 16,
					"innings": 4,
					"runs": 5,
					"ballsFaced": 24,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 20.833333333333332
				},
				"bowlingStatistics": {
					"matches": 16,
					"innings": 16,
					"wickets": 15,
					"overs": {
						"overs": 126,
						"balls": 756
					},
					"runsConceded": 538,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 5,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.26984126984127
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "853e66ba-703c-4498-ade7-c212742dc937",
		"fullName": "Raman Lamba",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 31,
					"innings": 31,
					"runs": 783,
					"ballsFaced": 1166,
					"centuries": 1,
					"halfCenturies": 6,
					"highestScore": 102,
					"fours": 63,
					"sixes": 9,
					"strikeRate": 67.15265866209262
				},
				"bowlingStatistics": {
					"matches": 31,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 3.1,
						"balls": 19
					},
					"runsConceded": 20,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 6.315789473684211
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "96e17674-2875-4079-a299-b6e5cb82362d",
		"fullName": "Shivlal Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 2,
					"runs": 1,
					"ballsFaced": 16,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 6.25
				},
				"bowlingStatistics": {
					"matches": 7,
					"innings": 7,
					"wickets": 8,
					"overs": {
						"overs": 55,
						"balls": 330
					},
					"runsConceded": 228,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 3,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.1454545454545455
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1a035de3-46b5-4abc-8dc7-80e83203af68",
		"fullName": "Chandrakant Pandit��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 33,
					"innings": 20,
					"runs": 229,
					"ballsFaced": 310,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 33,
					"fours": 12,
					"sixes": 0,
					"strikeRate": 73.87096774193549
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a6402614-9f0f-43b9-9255-245a5aefcbcc",
		"fullName": "R.P.Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 13.4,
						"balls": 82
					},
					"runsConceded": 77,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.634146341463414
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0996ef80-00e7-419e-b144-10413ac065ca",
		"fullName": "Bharat Arun",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 3,
					"runs": 21,
					"ballsFaced": 32,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 65.625
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 1,
					"overs": {
						"overs": 17,
						"balls": 102
					},
					"runsConceded": 103,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 6.0588235294117645
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "dac04676-5571-4718-9030-727be7e7f109",
		"fullName": "Ravi Shastri�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 11,
					"innings": 11,
					"runs": 441,
					"ballsFaced": 526,
					"centuries": 1,
					"halfCenturies": 3,
					"highestScore": 109,
					"fours": 35,
					"sixes": 7,
					"strikeRate": 83.8403041825095
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "52cfd097-27e2-4429-8eaa-263aa6254e53",
		"fullName": "Deep Dasgupta��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 4,
					"runs": 51,
					"ballsFaced": 82,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 24,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 62.19512195121951
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "fcb6418a-6118-4990-8bd8-09d72e23d9ef",
		"fullName": "Virender Sehwag",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 238,
					"innings": 235,
					"runs": 7995,
					"ballsFaced": 7655,
					"centuries": 15,
					"halfCenturies": 37,
					"highestScore": 219,
					"fours": 1092,
					"sixes": 131,
					"strikeRate": 104.44154147615937
				},
				"bowlingStatistics": {
					"matches": 238,
					"innings": 142,
					"wickets": 94,
					"overs": {
						"overs": 715,
						"balls": 4290
					},
					"runsConceded": 3737,
					"noBall": 42,
					"wideBall": 71,
					"maidens": 13,
					"dots": 1951,
					"sixes": 66,
					"fours": 195,
					"economy": 5.2265734265734265
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 18,
					"runs": 394,
					"ballsFaced": 271,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 68,
					"fours": 43,
					"sixes": 16,
					"strikeRate": 145.38745387453875
				},
				"bowlingStatistics": {
					"matches": 18,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 20,
					"noBall": 1,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 2,
					"fours": 0,
					"economy": 20
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b02678ad-2772-4cc6-bfca-a9e5622c5411",
		"fullName": "Jacob Martin",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 8,
					"runs": 158,
					"ballsFaced": 331,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 39,
					"fours": 15,
					"sixes": 0,
					"strikeRate": 47.73413897280967
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a76c4dc0-a2e1-4ad3-aa11-d3aa98cf0c8e",
		"fullName": "Yuvraj Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 298,
					"innings": 275,
					"runs": 8609,
					"ballsFaced": 9846,
					"centuries": 14,
					"halfCenturies": 52,
					"highestScore": 150,
					"fours": 896,
					"sixes": 153,
					"strikeRate": 87.43652244566321
				},
				"bowlingStatistics": {
					"matches": 298,
					"innings": 158,
					"wickets": 110,
					"overs": {
						"overs": 831.2,
						"balls": 4988
					},
					"runsConceded": 4227,
					"noBall": 10,
					"wideBall": 55,
					"maidens": 18,
					"dots": 2304,
					"sixes": 71,
					"fours": 243,
					"economy": 5.084603047313553
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 57,
					"innings": 51,
					"runs": 1177,
					"ballsFaced": 863,
					"centuries": 0,
					"halfCenturies": 8,
					"highestScore": 77,
					"fours": 77,
					"sixes": 74,
					"strikeRate": 136.38470451911934
				},
				"bowlingStatistics": {
					"matches": 57,
					"innings": 31,
					"wickets": 28,
					"overs": {
						"overs": 70.4,
						"balls": 424
					},
					"runsConceded": 499,
					"noBall": 2,
					"wideBall": 5,
					"maidens": 0,
					"dots": 154,
					"sixes": 19,
					"fours": 29,
					"economy": 7.061320754716981
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "476b948e-7afc-4240-8d4c-afe9aa4c20e3",
		"fullName": "Rahul Dravid",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 335,
					"innings": 314,
					"runs": 10768,
					"ballsFaced": 15127,
					"centuries": 12,
					"halfCenturies": 82,
					"highestScore": 153,
					"fours": 942,
					"sixes": 42,
					"strikeRate": 71.18397567263833
				},
				"bowlingStatistics": {
					"matches": 335,
					"innings": 8,
					"wickets": 4,
					"overs": {
						"overs": 31,
						"balls": 186
					},
					"runsConceded": 170,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 1,
					"dots": 2,
					"sixes": 0,
					"fours": 2,
					"economy": 5.483870967741935
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 31,
					"ballsFaced": 21,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 31,
					"fours": 0,
					"sixes": 3,
					"strikeRate": 147.61904761904762
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "db3a48e1-bd63-4ce9-8217-1a9422d8689e",
		"fullName": "Sourav Ganguly�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 145,
					"innings": 142,
					"runs": 5082,
					"ballsFaced": 6658,
					"centuries": 11,
					"halfCenturies": 30,
					"highestScore": 144,
					"fours": 492,
					"sixes": 115,
					"strikeRate": 76.32922799639532
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "06662537-a0c9-4144-aa91-6729408987d7",
		"fullName": "Harbhajan Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 228,
					"innings": 126,
					"runs": 1213,
					"ballsFaced": 1502,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 49,
					"fours": 90,
					"sixes": 34,
					"strikeRate": 80.7589880159787
				},
				"bowlingStatistics": {
					"matches": 228,
					"innings": 225,
					"wickets": 265,
					"overs": {
						"overs": 2059.5,
						"balls": 12359
					},
					"runsConceded": 8872,
					"noBall": 6,
					"wideBall": 214,
					"maidens": 83,
					"dots": 6369,
					"sixes": 99,
					"fours": 523,
					"economy": 4.307144590986326
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 27,
					"innings": 13,
					"runs": 108,
					"ballsFaced": 87,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 21,
					"fours": 11,
					"sixes": 4,
					"strikeRate": 124.13793103448276
				},
				"bowlingStatistics": {
					"matches": 27,
					"innings": 27,
					"wickets": 25,
					"overs": {
						"overs": 102,
						"balls": 612
					},
					"runsConceded": 633,
					"noBall": 1,
					"wideBall": 13,
					"maidens": 5,
					"dots": 248,
					"sixes": 18,
					"fours": 26,
					"economy": 6.205882352941177
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "52b9545e-2fff-4af7-9a39-d5d044e90edc",
		"fullName": "Ajit Agarkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 189,
					"innings": 113,
					"runs": 1269,
					"ballsFaced": 1574,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 95,
					"fours": 103,
					"sixes": 22,
					"strikeRate": 80.62261753494282
				},
				"bowlingStatistics": {
					"matches": 189,
					"innings": 188,
					"wickets": 288,
					"overs": {
						"overs": 1580.4,
						"balls": 9484
					},
					"runsConceded": 8021,
					"noBall": 128,
					"wideBall": 313,
					"maidens": 100,
					"dots": 3724,
					"sixes": 31,
					"fours": 596,
					"economy": 5.074441164065795
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 15,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 14,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 136.36363636363637
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 3,
					"overs": {
						"overs": 10.3,
						"balls": 63
					},
					"runsConceded": 85,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 26,
					"sixes": 3,
					"fours": 8,
					"economy": 8.095238095238095
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a30df99c-adf5-49f2-9c6a-314f3d79b1ac",
		"fullName": "Anil Kumble",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 266,
					"innings": 134,
					"runs": 903,
					"ballsFaced": 1481,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 52,
					"sixes": 6,
					"strikeRate": 60.97231600270088
				},
				"bowlingStatistics": {
					"matches": 266,
					"innings": 263,
					"wickets": 334,
					"overs": {
						"overs": 2396,
						"balls": 14376
					},
					"runsConceded": 10300,
					"noBall": 62,
					"wideBall": 135,
					"maidens": 109,
					"dots": 2506,
					"sixes": 39,
					"fours": 262,
					"economy": 4.298831385642738
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b2f43fa9-4a46-44fe-8d14-1a0e6d16ce3f",
		"fullName": "Navjot Sidhu",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 133,
					"innings": 127,
					"runs": 4413,
					"ballsFaced": 6329,
					"centuries": 6,
					"halfCenturies": 33,
					"highestScore": 134,
					"fours": 335,
					"sixes": 44,
					"strikeRate": 69.72665507979144
				},
				"bowlingStatistics": {
					"matches": 133,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 0.4,
						"balls": 4
					},
					"runsConceded": 3,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "71868f7e-d6f9-4d71-9cd4-4045d347cb01",
		"fullName": "Chandrakant Pandit",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 36,
					"innings": 23,
					"runs": 290,
					"ballsFaced": 400,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 33,
					"fours": 16,
					"sixes": 0,
					"strikeRate": 72.5
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a9ab923b-bcaa-42fb-ace4-2acdbfd35d8b",
		"fullName": "Dilip Vengsarkar�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 17,
					"runs": 481,
					"ballsFaced": 713,
					"centuries": 0,
					"halfCenturies": 4,
					"highestScore": 88,
					"fours": 19,
					"sixes": 2,
					"strikeRate": 67.46143057503507
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f505649c-5088-4eb1-94ed-2366d022911d",
		"fullName": "Arshad Ayub",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 32,
					"innings": 17,
					"runs": 116,
					"ballsFaced": 162,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 31,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 71.60493827160494
				},
				"bowlingStatistics": {
					"matches": 32,
					"innings": 32,
					"wickets": 31,
					"overs": {
						"overs": 294.5,
						"balls": 1769
					},
					"runsConceded": 1216,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 19,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.1243640474844545
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b677010d-0e92-47a8-bc3c-77f216b7193c",
		"fullName": "Sanjeev Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 23,
					"innings": 12,
					"runs": 80,
					"ballsFaced": 135,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 28,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 59.25925925925926
				},
				"bowlingStatistics": {
					"matches": 23,
					"innings": 22,
					"wickets": 22,
					"overs": {
						"overs": 163.1,
						"balls": 979
					},
					"runsConceded": 813,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 6,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.982635342185904
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ce873959-e87b-4e4a-83f4-c049254a471a",
		"fullName": "Woorkeri Raman",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 27,
					"innings": 27,
					"runs": 617,
					"ballsFaced": 1109,
					"centuries": 1,
					"halfCenturies": 3,
					"highestScore": 114,
					"fours": 47,
					"sixes": 5,
					"strikeRate": 55.63570784490532
				},
				"bowlingStatistics": {
					"matches": 27,
					"innings": 7,
					"wickets": 2,
					"overs": {
						"overs": 27,
						"balls": 162
					},
					"runsConceded": 170,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 2,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 6.296296296296297
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8debc995-5033-48f7-9d8f-ed0265e4f24e",
		"fullName": "Ajay Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 31,
					"innings": 27,
					"runs": 424,
					"ballsFaced": 469,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 59,
					"fours": 26,
					"sixes": 9,
					"strikeRate": 90.4051172707889
				},
				"bowlingStatistics": {
					"matches": 31,
					"innings": 29,
					"wickets": 15,
					"overs": {
						"overs": 190,
						"balls": 1140
					},
					"runsConceded": 875,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 5,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.605263157894737
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "02ad074a-c7d1-4042-9360-462a6d6a2b60",
		"fullName": "Narendra Hirwani",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 7,
					"runs": 8,
					"ballsFaced": 29,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 27.586206896551722
				},
				"bowlingStatistics": {
					"matches": 18,
					"innings": 18,
					"wickets": 23,
					"overs": {
						"overs": 160,
						"balls": 960
					},
					"runsConceded": 719,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 6,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.49375
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "84f23d94-54b2-47de-b500-c2b4984ccc6f",
		"fullName": "V.B.Chandrasekhar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 7,
					"runs": 88,
					"ballsFaced": 162,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 53,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 54.32098765432099
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6cfeb82b-0c65-48ff-ad62-dfa78b771c21",
		"fullName": "Margashayam Venkataramana",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 0,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 2,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 36,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c52ba339-a013-492e-91b5-eb94e160f897",
		"fullName": "Rashid Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 58,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.8
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "67d095ed-8a6f-478f-8ea9-41aa1789771c",
		"fullName": "Robin Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 132,
					"innings": 113,
					"runs": 2336,
					"ballsFaced": 3144,
					"centuries": 1,
					"halfCenturies": 9,
					"highestScore": 100,
					"fours": 135,
					"sixes": 41,
					"strikeRate": 74.30025445292621
				},
				"bowlingStatistics": {
					"matches": 132,
					"innings": 117,
					"wickets": 69,
					"overs": {
						"overs": 622.2,
						"balls": 3734
					},
					"runsConceded": 2985,
					"noBall": 60,
					"wideBall": 45,
					"maidens": 28,
					"dots": 294,
					"sixes": 4,
					"fours": 33,
					"economy": 4.796464916979111
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "bab9ed59-b6b1-412f-bc5b-758c7430adba",
		"fullName": "Kris Srikkanth�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 340,
					"ballsFaced": 526,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 65,
					"fours": 29,
					"sixes": 1,
					"strikeRate": 64.63878326996198
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d56a6695-ea4b-4cb8-8bb5-1ecc99654691",
		"fullName": "Vivek Razdan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 23,
					"ballsFaced": 27,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 18,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 85.18518518518519
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 14,
						"balls": 84
					},
					"runsConceded": 77,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3ba2bf8d-bf25-4a38-8ea6-ef46e50de5c4",
		"fullName": "Salil Ankola",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 19,
					"innings": 13,
					"runs": 34,
					"ballsFaced": 42,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 1,
					"sixes": 1,
					"strikeRate": 80.95238095238095
				},
				"bowlingStatistics": {
					"matches": 19,
					"innings": 20,
					"wickets": 13,
					"overs": {
						"overs": 134.3,
						"balls": 807
					},
					"runsConceded": 615,
					"noBall": 9,
					"wideBall": 11,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.5724907063197024
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9f7311cb-7791-4737-827d-b56ddafe435b",
		"fullName": "Atul Wassan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 6,
					"runs": 33,
					"ballsFaced": 56,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 58.92857142857143
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 11,
					"overs": {
						"overs": 71,
						"balls": 426
					},
					"runsConceded": 283,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.9859154929577465
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4b525e69-e934-4893-8b54-1eeb7b851695",
		"fullName": "Gursharan Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 4,
					"ballsFaced": 10,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 40
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3ac25cb4-e83a-4c15-8912-a9a9d74d1ae0",
		"fullName": "Saradindu Mukherjee",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 2,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 2,
					"overs": {
						"overs": 29,
						"balls": 174
					},
					"runsConceded": 98,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 2,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 3.3793103448275863
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7416359e-65de-4a72-aa09-1d1dab143008",
		"fullName": "Pravin Amre",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 37,
					"innings": 30,
					"runs": 513,
					"ballsFaced": 799,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 84,
					"fours": 28,
					"sixes": 2,
					"strikeRate": 64.20525657071339
				},
				"bowlingStatistics": {
					"matches": 37,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 0.2,
						"balls": 2
					},
					"runsConceded": 4,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 12
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "35faaea6-7123-4df7-b8d8-c0620061cb12",
		"fullName": "Subroto Banerjee",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 5,
					"runs": 49,
					"ballsFaced": 42,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 25,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 116.66666666666667
				},
				"bowlingStatistics": {
					"matches": 6,
					"innings": 6,
					"wickets": 5,
					"overs": {
						"overs": 40,
						"balls": 240
					},
					"runsConceded": 202,
					"noBall": 1,
					"wideBall": 0,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.05
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f0b2f84c-be1b-4ae1-b72d-9ac8d6013364",
		"fullName": "Sourav Ganguly",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 302,
					"innings": 297,
					"runs": 11221,
					"ballsFaced": 15235,
					"centuries": 22,
					"halfCenturies": 71,
					"highestScore": 183,
					"fours": 1104,
					"sixes": 189,
					"strikeRate": 73.65277321956022
				},
				"bowlingStatistics": {
					"matches": 302,
					"innings": 170,
					"wickets": 100,
					"overs": {
						"overs": 757.1,
						"balls": 4543
					},
					"runsConceded": 3835,
					"noBall": 87,
					"wideBall": 67,
					"maidens": 30,
					"dots": 1424,
					"sixes": 26,
					"fours": 182,
					"economy": 5.064935064935065
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "38f5177d-7de6-4fde-8c73-f25ac500e8cf",
		"fullName": "Vijay Yadav��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 19,
					"innings": 12,
					"runs": 118,
					"ballsFaced": 116,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 34,
					"fours": 7,
					"sixes": 2,
					"strikeRate": 101.72413793103448
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c54c7eda-4478-4f75-b596-82d77d6db609",
		"fullName": "Rajesh Chauhan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 34,
					"innings": 18,
					"runs": 132,
					"ballsFaced": 171,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 32,
					"fours": 5,
					"sixes": 4,
					"strikeRate": 77.19298245614036
				},
				"bowlingStatistics": {
					"matches": 34,
					"innings": 34,
					"wickets": 29,
					"overs": {
						"overs": 272.2,
						"balls": 1634
					},
					"runsConceded": 1216,
					"noBall": 9,
					"wideBall": 10,
					"maidens": 12,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.465116279069767
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "dba1eea0-d058-4c09-a830-98808160a834",
		"fullName": "Nayan Mongia��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 138,
					"innings": 96,
					"runs": 1272,
					"ballsFaced": 1845,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 69,
					"fours": 95,
					"sixes": 8,
					"strikeRate": 68.9430894308943
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "cab2b984-2a96-4a58-a674-227750160b5a",
		"fullName": "Venkatesh Prasad",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 159,
					"innings": 63,
					"runs": 221,
					"ballsFaced": 367,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 7,
					"sixes": 5,
					"strikeRate": 60.217983651226156
				},
				"bowlingStatistics": {
					"matches": 159,
					"innings": 160,
					"wickets": 196,
					"overs": {
						"overs": 1354.5,
						"balls": 8129
					},
					"runsConceded": 6332,
					"noBall": 114,
					"wideBall": 188,
					"maidens": 79,
					"dots": 1059,
					"sixes": 9,
					"fours": 126,
					"economy": 4.673637593799976
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "79001d70-af21-41bb-a33e-3baadf1535d9",
		"fullName": "Atul Bedade",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 10,
					"runs": 158,
					"ballsFaced": 183,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 51,
					"fours": 11,
					"sixes": 5,
					"strikeRate": 86.33879781420765
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "16a7d901-18d6-4be2-943d-76bb644caaf6",
		"fullName": "Bhupinder Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 6,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 46.15384615384615
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 3,
					"overs": {
						"overs": 17,
						"balls": 102
					},
					"runsConceded": 78,
					"noBall": 0,
					"wideBall": 3,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.588235294117647
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "29c31e0f-9bc0-4298-a1d2-95fb2e79093b",
		"fullName": "Prashant Vaidya",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 2,
					"runs": 15,
					"ballsFaced": 12,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 12,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 125
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 4,
					"overs": {
						"overs": 30.4,
						"balls": 184
					},
					"runsConceded": 174,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.673913043478261
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5ae73e6f-f8f9-4aa2-adec-540d8424dc21",
		"fullName": "Aashish Kapoor",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 17,
					"innings": 6,
					"runs": 43,
					"ballsFaced": 63,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 68.25396825396825
				},
				"bowlingStatistics": {
					"matches": 17,
					"innings": 17,
					"wickets": 8,
					"overs": {
						"overs": 150,
						"balls": 900
					},
					"runsConceded": 612,
					"noBall": 2,
					"wideBall": 8,
					"maidens": 5,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.08
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "77f66d22-4b3a-4e12-99ea-5a9989b2b760",
		"fullName": "Utpal Chatterjee",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 6,
					"ballsFaced": 30,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 20
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 3,
					"overs": {
						"overs": 26.5,
						"balls": 161
					},
					"runsConceded": 117,
					"noBall": 2,
					"wideBall": 0,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.3602484472049685
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "92de1774-65a5-425c-bb88-2ecb3c6e98ee",
		"fullName": "Vikram Rathour",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 7,
					"runs": 193,
					"ballsFaced": 331,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 54,
					"fours": 16,
					"sixes": 1,
					"strikeRate": 58.30815709969789
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1e959bec-ac91-4e9b-9e30-892400a81512",
		"fullName": "Paras Mhambrey",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 7,
					"ballsFaced": 5,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 7,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 140
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 3,
					"overs": {
						"overs": 21,
						"balls": 126
					},
					"runsConceded": 120,
					"noBall": 1,
					"wideBall": 16,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.714285714285714
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a61c1a04-fcb5-4edb-9dd2-90380e77c00d",
		"fullName": "Sachin Tendulkar�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 70,
					"innings": 70,
					"runs": 2454,
					"ballsFaced": 2940,
					"centuries": 6,
					"halfCenturies": 12,
					"highestScore": 186,
					"fours": 246,
					"sixes": 26,
					"strikeRate": 83.46938775510205
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "72b22255-a5a4-46f0-bc47-efacee8d7842",
		"fullName": "Sunil Joshi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 69,
					"innings": 45,
					"runs": 584,
					"ballsFaced": 653,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 61,
					"fours": 47,
					"sixes": 17,
					"strikeRate": 89.43338437978561
				},
				"bowlingStatistics": {
					"matches": 69,
					"innings": 67,
					"wickets": 69,
					"overs": {
						"overs": 564.2,
						"balls": 3386
					},
					"runsConceded": 2509,
					"noBall": 1,
					"wideBall": 28,
					"maidens": 33,
					"dots": 362,
					"sixes": 7,
					"fours": 24,
					"economy": 4.445953927938571
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9d540676-1170-4374-b76f-e1c9334dab14",
		"fullName": "Sujith Somasunder",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 16,
					"ballsFaced": 63,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 25.396825396825395
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ed112996-1fd9-4845-bf3c-5dc594f01282",
		"fullName": "Pankaj Dharmani",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 8,
					"ballsFaced": 8,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "db1f6fc5-7ff3-4093-a686-704f6ea3a8c4",
		"fullName": "Saba Karim��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 32,
					"innings": 27,
					"runs": 362,
					"ballsFaced": 560,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 55,
					"fours": 27,
					"sixes": 2,
					"strikeRate": 64.64285714285714
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e4411ecd-c860-4605-a801-0083f5a549f2",
		"fullName": "Dodda Ganesh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 4,
					"ballsFaced": 8,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 5,
						"balls": 30
					},
					"runsConceded": 20,
					"noBall": 1,
					"wideBall": 2,
					"maidens": 0,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "cf195b4c-5711-40fb-8262-8c022df8c04a",
		"fullName": "Abey Kuruvilla",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 23,
					"innings": 11,
					"runs": 26,
					"ballsFaced": 43,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 7,
					"fours": 1,
					"sixes": 1,
					"strikeRate": 60.46511627906977
				},
				"bowlingStatistics": {
					"matches": 23,
					"innings": 25,
					"wickets": 25,
					"overs": {
						"overs": 188.3,
						"balls": 1131
					},
					"runsConceded": 890,
					"noBall": 43,
					"wideBall": 20,
					"maidens": 18,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.721485411140583
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "bb0a5e53-84b6-44b8-9c32-22458a41becc",
		"fullName": "Noel David",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 2,
					"runs": 9,
					"ballsFaced": 10,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 90
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 4,
					"overs": {
						"overs": 32,
						"balls": 192
					},
					"runsConceded": 133,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.15625
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "82268473-8bf8-4216-b3aa-772f86904fde",
		"fullName": "Nilesh Kulkarni",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 5,
					"runs": 11,
					"ballsFaced": 20,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 55
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 8,
					"wickets": 11,
					"overs": {
						"overs": 67,
						"balls": 402
					},
					"runsConceded": 357,
					"noBall": 0,
					"wideBall": 10,
					"maidens": 3,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.3283582089552235
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0b26a331-fbae-452e-98b8-66f8f5767f7f",
		"fullName": "Harvinder Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 5,
					"runs": 6,
					"ballsFaced": 19,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 31.57894736842105
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 16,
					"wickets": 24,
					"overs": {
						"overs": 114.2,
						"balls": 686
					},
					"runsConceded": 609,
					"noBall": 10,
					"wideBall": 24,
					"maidens": 6,
					"dots": 107,
					"sixes": 3,
					"fours": 6,
					"economy": 5.326530612244898
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3c6d4f6f-6a24-4070-be85-7d555e4e32b1",
		"fullName": "Debasis Mohanty",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 44,
					"innings": 11,
					"runs": 28,
					"ballsFaced": 57,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 18,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 49.12280701754386
				},
				"bowlingStatistics": {
					"matches": 44,
					"innings": 44,
					"wickets": 57,
					"overs": {
						"overs": 332.4,
						"balls": 1996
					},
					"runsConceded": 1662,
					"noBall": 30,
					"wideBall": 54,
					"maidens": 21,
					"dots": 672,
					"sixes": 12,
					"fours": 82,
					"economy": 4.995991983967936
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "48bb4a39-153b-48ce-abd5-57bb16868958",
		"fullName": "Sairaj Bahutule",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 4,
					"runs": 23,
					"ballsFaced": 29,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 11,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 79.3103448275862
				},
				"bowlingStatistics": {
					"matches": 7,
					"innings": 7,
					"wickets": 2,
					"overs": {
						"overs": 49,
						"balls": 294
					},
					"runsConceded": 283,
					"noBall": 2,
					"wideBall": 6,
					"maidens": 0,
					"dots": 6,
					"sixes": 1,
					"fours": 1,
					"economy": 5.775510204081633
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f7088e46-3628-4d06-9ab7-7a44c997bd7b",
		"fullName": "Hrishikesh Kanitkar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 32,
					"innings": 27,
					"runs": 339,
					"ballsFaced": 512,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 25,
					"sixes": 1,
					"strikeRate": 66.2109375
				},
				"bowlingStatistics": {
					"matches": 32,
					"innings": 28,
					"wickets": 17,
					"overs": {
						"overs": 167.4,
						"balls": 1006
					},
					"runsConceded": 803,
					"noBall": 7,
					"wideBall": 13,
					"maidens": 4,
					"dots": 37,
					"sixes": 0,
					"fours": 5,
					"economy": 4.789264413518887
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5eaccb1d-d95b-4f2d-be77-19484b4425e0",
		"fullName": "Rahul Sanghvi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 2,
					"runs": 8,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 72.72727272727273
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 10,
					"overs": {
						"overs": 83,
						"balls": 498
					},
					"runsConceded": 399,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 19,
					"sixes": 0,
					"fours": 0,
					"economy": 4.807228915662651
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d247b367-313a-4957-bc7e-09d86365af43",
		"fullName": "VVS Laxman",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 85,
					"innings": 83,
					"runs": 2338,
					"ballsFaced": 3282,
					"centuries": 6,
					"halfCenturies": 10,
					"highestScore": 131,
					"fours": 222,
					"sixes": 4,
					"strikeRate": 71.2370505789153
				},
				"bowlingStatistics": {
					"matches": 85,
					"innings": 4,
					"wickets": 0,
					"overs": {
						"overs": 7,
						"balls": 42
					},
					"runsConceded": 40,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 3,
					"sixes": 2,
					"fours": 0,
					"economy": 5.714285714285714
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f7a7afc1-1221-4474-b05f-bb8d78f20852",
		"fullName": "Gagan Khoda",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 115,
					"ballsFaced": 185,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 89,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 62.16216216216216
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5a7b29a0-519d-43bb-82fd-f6b7c238120d",
		"fullName": "Mannava Prasad��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 17,
					"innings": 11,
					"runs": 131,
					"ballsFaced": 225,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 63,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 58.22222222222222
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "986740e2-d77c-4e88-b4f4-6da0f8e37903",
		"fullName": "Ajay Jadeja�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 12,
					"runs": 396,
					"ballsFaced": 510,
					"centuries": 1,
					"halfCenturies": 2,
					"highestScore": 103,
					"fours": 28,
					"sixes": 8,
					"strikeRate": 77.6470588235294
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2a0cf79c-bfc5-4980-88ea-6b5caf62a5ae",
		"fullName": "Jatin Paranjape",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 4,
					"runs": 54,
					"ballsFaced": 91,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 27,
					"fours": 3,
					"sixes": 1,
					"strikeRate": 59.34065934065934
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "151094c6-e8f4-4685-bbf3-9a4f747c92a2",
		"fullName": "Nikhil Chopra",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 39,
					"innings": 26,
					"runs": 310,
					"ballsFaced": 498,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 61,
					"fours": 15,
					"sixes": 5,
					"strikeRate": 62.24899598393574
				},
				"bowlingStatistics": {
					"matches": 39,
					"innings": 37,
					"wickets": 46,
					"overs": {
						"overs": 305.5,
						"balls": 1835
					},
					"runsConceded": 1286,
					"noBall": 0,
					"wideBall": 29,
					"maidens": 21,
					"dots": 410,
					"sixes": 4,
					"fours": 33,
					"economy": 4.204904632152589
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e5233366-1834-493a-a49e-86fca9b9eac8",
		"fullName": "Sanjay Raul",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 8,
					"ballsFaced": 14,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 57.142857142857146
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 6,
						"balls": 36
					},
					"runsConceded": 27,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.5
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5b21c4b6-3cd1-48b7-b25d-443752da3a37",
		"fullName": "Laxmi Shukla",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 18,
					"ballsFaced": 19,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 94.73684210526316
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 19,
						"balls": 114
					},
					"runsConceded": 94,
					"noBall": 3,
					"wideBall": 8,
					"maidens": 0,
					"dots": 20,
					"sixes": 0,
					"fours": 4,
					"economy": 4.947368421052632
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0aee1b76-076c-4e19-9783-7d837fd53604",
		"fullName": "Gyanendra Pandey",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 4,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 36.36363636363637
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 13,
						"balls": 78
					},
					"runsConceded": 60,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 4.615384615384615
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "66798c4b-54c1-41df-bfe8-8941cb6332b3",
		"fullName": "Sadagoppan Ramesh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 24,
					"innings": 24,
					"runs": 646,
					"ballsFaced": 1092,
					"centuries": 0,
					"halfCenturies": 6,
					"highestScore": 82,
					"fours": 70,
					"sixes": 1,
					"strikeRate": 59.15750915750916
				},
				"bowlingStatistics": {
					"matches": 24,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 6,
						"balls": 36
					},
					"runsConceded": 38,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 14,
					"sixes": 2,
					"fours": 1,
					"economy": 6.333333333333333
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "de7eec9e-05cb-44bb-be64-0a65d2ba5a1f",
		"fullName": "Amay Khurasiya",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 11,
					"runs": 149,
					"ballsFaced": 188,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 14,
					"sixes": 2,
					"strikeRate": 79.25531914893617
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6a997061-da12-45ad-b056-549dd0af1c26",
		"fullName": "Rahul Dravid��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 67,
					"innings": 59,
					"runs": 2149,
					"ballsFaced": 2944,
					"centuries": 4,
					"halfCenturies": 13,
					"highestScore": 145,
					"fours": 180,
					"sixes": 9,
					"strikeRate": 72.99592391304348
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6c509e81-08ef-45b5-be7f-30ce210397ff",
		"fullName": "Vijay Bharadwaj",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 9,
					"runs": 136,
					"ballsFaced": 194,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 41,
					"fours": 15,
					"sixes": 1,
					"strikeRate": 70.10309278350516
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 9,
					"wickets": 16,
					"overs": {
						"overs": 62,
						"balls": 372
					},
					"runsConceded": 307,
					"noBall": 1,
					"wideBall": 11,
					"maidens": 3,
					"dots": 74,
					"sixes": 0,
					"fours": 8,
					"economy": 4.951612903225806
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d374c6e6-82a8-4a92-8a10-87a5b1147aac",
		"fullName": "Thirunavukkarasu Kumaran",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 3,
					"runs": 19,
					"ballsFaced": 27,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 70.37037037037037
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 9,
					"overs": {
						"overs": 63,
						"balls": 378
					},
					"runsConceded": 348,
					"noBall": 1,
					"wideBall": 8,
					"maidens": 4,
					"dots": 0,
					"sixes": 0,
					"fours": 0,
					"economy": 5.523809523809524
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "50b55544-0e0c-4de4-bcc7-1c9a06182f0e",
		"fullName": "Devang Gandhi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 49,
					"ballsFaced": 97,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 30,
					"fours": 8,
					"sixes": 0,
					"strikeRate": 50.51546391752577
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8543e7c3-f376-43ce-bf62-8e68d93afe9c",
		"fullName": "Sameer Dighe��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 23,
					"innings": 17,
					"runs": 256,
					"ballsFaced": 421,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 94,
					"fours": 11,
					"sixes": 2,
					"strikeRate": 60.80760095011876
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "af4c713c-d765-480b-b6d6-21332d718b1d",
		"fullName": "Sridharan Sriram",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 7,
					"runs": 81,
					"ballsFaced": 135,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 9,
					"sixes": 0,
					"strikeRate": 60
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 9,
					"overs": {
						"overs": 54,
						"balls": 324
					},
					"runsConceded": 274,
					"noBall": 3,
					"wideBall": 10,
					"maidens": 1,
					"dots": 66,
					"sixes": 1,
					"fours": 6,
					"economy": 5.074074074074074
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4a6cabd2-dbd3-430a-8ce3-0b16ebceb4c3",
		"fullName": "Hemang Badani",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 40,
					"innings": 36,
					"runs": 867,
					"ballsFaced": 1180,
					"centuries": 1,
					"halfCenturies": 4,
					"highestScore": 100,
					"fours": 68,
					"sixes": 10,
					"strikeRate": 73.47457627118644
				},
				"bowlingStatistics": {
					"matches": 40,
					"innings": 9,
					"wickets": 3,
					"overs": {
						"overs": 30.3,
						"balls": 183
					},
					"runsConceded": 149,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 78,
					"sixes": 0,
					"fours": 8,
					"economy": 4.885245901639344
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "93463f3d-13a8-46fe-8c5e-6a0c3efeb26d",
		"fullName": "Amit Bhandari",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 0,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 5,
					"overs": {
						"overs": 17.4,
						"balls": 106
					},
					"runsConceded": 106,
					"noBall": 2,
					"wideBall": 2,
					"maidens": 0,
					"dots": 30,
					"sixes": 0,
					"fours": 3,
					"economy": 6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "21d224df-74eb-4105-8cf5-5a6711dffc36",
		"fullName": "Vijay Dahiya��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 19,
					"innings": 15,
					"runs": 216,
					"ballsFaced": 267,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 51,
					"fours": 18,
					"sixes": 3,
					"strikeRate": 80.89887640449439
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c1ecbed4-74c4-4128-8e03-e4d8ff97d1f7",
		"fullName": "Zaheer Khan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 192,
					"innings": 96,
					"runs": 753,
					"ballsFaced": 1041,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 34,
					"fours": 65,
					"sixes": 24,
					"strikeRate": 72.3342939481268
				},
				"bowlingStatistics": {
					"matches": 192,
					"innings": 191,
					"wickets": 269,
					"overs": {
						"overs": 1635.5,
						"balls": 9815
					},
					"runsConceded": 8102,
					"noBall": 121,
					"wideBall": 311,
					"maidens": 112,
					"dots": 5380,
					"sixes": 56,
					"fours": 776,
					"economy": 4.952827305145186
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 17,
					"innings": 4,
					"runs": 13,
					"ballsFaced": 10,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 130
				},
				"bowlingStatistics": {
					"matches": 17,
					"innings": 17,
					"wickets": 17,
					"overs": {
						"overs": 58.4,
						"balls": 352
					},
					"runsConceded": 448,
					"noBall": 1,
					"wideBall": 18,
					"maidens": 0,
					"dots": 161,
					"sixes": 9,
					"fours": 51,
					"economy": 7.636363636363637
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "328e50ac-b275-4624-b443-35e299110d4a",
		"fullName": "Reetinder Sodhi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 14,
					"runs": 280,
					"ballsFaced": 381,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 67,
					"fours": 16,
					"sixes": 6,
					"strikeRate": 73.49081364829397
				},
				"bowlingStatistics": {
					"matches": 18,
					"innings": 14,
					"wickets": 5,
					"overs": {
						"overs": 77,
						"balls": 462
					},
					"runsConceded": 365,
					"noBall": 6,
					"wideBall": 6,
					"maidens": 3,
					"dots": 173,
					"sixes": 3,
					"fours": 21,
					"economy": 4.740259740259741
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b2301a16-61d8-43a8-bf4d-516214e52036",
		"fullName": "Rahul Dravid�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 78,
					"innings": 75,
					"runs": 2658,
					"ballsFaced": 3524,
					"centuries": 2,
					"halfCenturies": 25,
					"highestScore": 105,
					"fours": 275,
					"sixes": 14,
					"strikeRate": 75.42565266742338
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9ecd1b88-602c-4d44-951c-60452e06f250",
		"fullName": "Dinesh Mongia",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 57,
					"innings": 51,
					"runs": 1230,
					"ballsFaced": 1721,
					"centuries": 1,
					"halfCenturies": 4,
					"highestScore": 159,
					"fours": 122,
					"sixes": 8,
					"strikeRate": 71.47007553747821
				},
				"bowlingStatistics": {
					"matches": 57,
					"innings": 21,
					"wickets": 14,
					"overs": {
						"overs": 106.4,
						"balls": 640
					},
					"runsConceded": 571,
					"noBall": 11,
					"wideBall": 4,
					"maidens": 1,
					"dots": 309,
					"sixes": 18,
					"fours": 30,
					"economy": 5.353125
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 38,
					"ballsFaced": 45,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 38,
					"fours": 4,
					"sixes": 1,
					"strikeRate": 84.44444444444444
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "218c6660-1513-4480-9261-26f5c10780c3",
		"fullName": "Ashish Nehra",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 112,
					"innings": 45,
					"runs": 140,
					"ballsFaced": 244,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 24,
					"fours": 12,
					"sixes": 3,
					"strikeRate": 57.377049180327866
				},
				"bowlingStatistics": {
					"matches": 112,
					"innings": 117,
					"wickets": 155,
					"overs": {
						"overs": 939.3,
						"balls": 5637
					},
					"runsConceded": 4899,
					"noBall": 55,
					"wideBall": 165,
					"maidens": 53,
					"dots": 3250,
					"sixes": 39,
					"fours": 543,
					"economy": 5.214475784992017
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 27,
					"innings": 5,
					"runs": 28,
					"ballsFaced": 39,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 22,
					"fours": 1,
					"sixes": 2,
					"strikeRate": 71.7948717948718
				},
				"bowlingStatistics": {
					"matches": 27,
					"innings": 27,
					"wickets": 34,
					"overs": {
						"overs": 98,
						"balls": 588
					},
					"runsConceded": 758,
					"noBall": 2,
					"wideBall": 19,
					"maidens": 2,
					"dots": 254,
					"sixes": 16,
					"fours": 89,
					"economy": 7.73469387755102
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "cc4cab20-079d-4a43-9bd5-c299f4cdd8ef",
		"fullName": "Shiv Sunder Das",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 4,
					"runs": 39,
					"ballsFaced": 77,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 30,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 50.64935064935065
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6a369b4e-1ee1-483a-baf7-dea3b324253e",
		"fullName": "Mohammad Kaif",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 124,
					"innings": 110,
					"runs": 2753,
					"ballsFaced": 3822,
					"centuries": 2,
					"halfCenturies": 17,
					"highestScore": 111,
					"fours": 228,
					"sixes": 9,
					"strikeRate": 72.03035060177918
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8607b27e-8037-419d-ae6f-18797e08172f",
		"fullName": "Ajay Ratra��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 8,
					"runs": 90,
					"ballsFaced": 127,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 30,
					"fours": 8,
					"sixes": 0,
					"strikeRate": 70.86614173228347
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3e89c1d8-3733-442e-bbf3-f7c2f7ada7a5",
		"fullName": "Sanjay Bangar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 15,
					"runs": 180,
					"ballsFaced": 239,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 14,
					"sixes": 3,
					"strikeRate": 75.31380753138075
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 14,
					"wickets": 7,
					"overs": {
						"overs": 73.4,
						"balls": 442
					},
					"runsConceded": 384,
					"noBall": 1,
					"wideBall": 7,
					"maidens": 2,
					"dots": 212,
					"sixes": 1,
					"fours": 33,
					"economy": 5.212669683257919
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3956ba49-809f-4fcd-9589-8994231c8f17",
		"fullName": "Anil Kumble�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "fbfda1b4-1f4a-406b-b5f8-7a220fd64121",
		"fullName": "Sarandeep Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 4,
					"runs": 47,
					"ballsFaced": 73,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 64.38356164383562
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 3,
					"overs": {
						"overs": 43,
						"balls": 258
					},
					"runsConceded": 180,
					"noBall": 6,
					"wideBall": 1,
					"maidens": 1,
					"dots": 143,
					"sixes": 0,
					"fours": 15,
					"economy": 4.186046511627907
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "311b2bf3-dc67-454b-a632-4e4046db7109",
		"fullName": "Murali Kartik",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 32,
					"innings": 14,
					"runs": 126,
					"ballsFaced": 178,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 32,
					"fours": 10,
					"sixes": 1,
					"strikeRate": 70.78651685393258
				},
				"bowlingStatistics": {
					"matches": 32,
					"innings": 36,
					"wickets": 37,
					"overs": {
						"overs": 317.5,
						"balls": 1907
					},
					"runsConceded": 1612,
					"noBall": 21,
					"wideBall": 23,
					"maidens": 19,
					"dots": 980,
					"sixes": 28,
					"fours": 113,
					"economy": 5.071840587309911
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 4,
						"balls": 24
					},
					"runsConceded": 27,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 7,
					"sixes": 0,
					"fours": 2,
					"economy": 6.75
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "bfdd8bcf-6147-461a-9b77-ae14a7ac992b",
		"fullName": "Tinu Yohannan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 7,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 63.63636363636363
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 5,
					"overs": {
						"overs": 20,
						"balls": 120
					},
					"runsConceded": 122,
					"noBall": 4,
					"wideBall": 6,
					"maidens": 1,
					"dots": 75,
					"sixes": 3,
					"fours": 14,
					"economy": 6.1
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "797ecbda-b254-4b44-a504-6e4d58909353",
		"fullName": "Jai Prakash Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 11,
					"innings": 7,
					"runs": 81,
					"ballsFaced": 123,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 69,
					"fours": 11,
					"sixes": 1,
					"strikeRate": 65.85365853658537
				},
				"bowlingStatistics": {
					"matches": 11,
					"innings": 10,
					"wickets": 6,
					"overs": {
						"overs": 66,
						"balls": 396
					},
					"runsConceded": 326,
					"noBall": 1,
					"wideBall": 6,
					"maidens": 4,
					"dots": 218,
					"sixes": 3,
					"fours": 36,
					"economy": 4.9393939393939394
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9b401558-8c42-4d5e-8d66-93583ed69012",
		"fullName": "Lakshmipathy Balaji",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 29,
					"innings": 16,
					"runs": 120,
					"ballsFaced": 152,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 21,
					"fours": 8,
					"sixes": 3,
					"strikeRate": 78.94736842105263
				},
				"bowlingStatistics": {
					"matches": 29,
					"innings": 30,
					"wickets": 34,
					"overs": {
						"overs": 241.1,
						"balls": 1447
					},
					"runsConceded": 1344,
					"noBall": 20,
					"wideBall": 64,
					"maidens": 11,
					"dots": 873,
					"sixes": 15,
					"fours": 147,
					"economy": 5.572909467864547
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 10,
					"overs": {
						"overs": 16,
						"balls": 96
					},
					"runsConceded": 121,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 43,
					"sixes": 5,
					"fours": 12,
					"economy": 7.5625
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0eba7eb4-36c0-4344-9dbc-1beb13686544",
		"fullName": "Rahul Dravid�(c)�",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 5,
					"runs": 151,
					"ballsFaced": 224,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 58,
					"fours": 13,
					"sixes": 0,
					"strikeRate": 67.41071428571429
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "073ec496-7329-4ce4-85b1-f209b3430e0b",
		"fullName": "Parthiv Patel��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 27,
					"innings": 23,
					"runs": 448,
					"ballsFaced": 596,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 56,
					"fours": 47,
					"sixes": 4,
					"strikeRate": 75.16778523489933
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 26,
					"ballsFaced": 20,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 130
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "189b7d16-773e-4223-9335-c6482fe34031",
		"fullName": "Gautam Gambhir",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 144,
					"innings": 143,
					"runs": 5238,
					"ballsFaced": 6144,
					"centuries": 11,
					"halfCenturies": 34,
					"highestScore": 150,
					"fours": 561,
					"sixes": 17,
					"strikeRate": 85.25390625
				},
				"bowlingStatistics": {
					"matches": 144,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 13,
					"noBall": 1,
					"wideBall": 1,
					"maidens": 0,
					"dots": 3,
					"sixes": 0,
					"fours": 2,
					"economy": 13
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 36,
					"innings": 36,
					"runs": 932,
					"ballsFaced": 783,
					"centuries": 0,
					"halfCenturies": 7,
					"highestScore": 75,
					"fours": 109,
					"sixes": 10,
					"strikeRate": 119.02937420178799
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "72414558-ab79-41fa-90e7-d72a3f1fbfd2",
		"fullName": "Aavishkar Salvi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 3,
					"runs": 4,
					"ballsFaced": 14,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 28.571428571428573
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 4,
					"overs": {
						"overs": 28.4,
						"balls": 172
					},
					"runsConceded": 120,
					"noBall": 3,
					"wideBall": 8,
					"maidens": 3,
					"dots": 117,
					"sixes": 0,
					"fours": 15,
					"economy": 4.186046511627907
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "78f1c452-88ec-4e98-a77a-391a83efbd1f",
		"fullName": "Amit Mishra",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 35,
					"innings": 11,
					"runs": 43,
					"ballsFaced": 82,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 14,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 52.4390243902439
				},
				"bowlingStatistics": {
					"matches": 35,
					"innings": 34,
					"wickets": 64,
					"overs": {
						"overs": 319.3,
						"balls": 1917
					},
					"runsConceded": 1511,
					"noBall": 10,
					"wideBall": 25,
					"maidens": 19,
					"dots": 1080,
					"sixes": 42,
					"fours": 92,
					"economy": 4.729264475743349
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 0,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 16,
					"overs": {
						"overs": 38,
						"balls": 228
					},
					"runsConceded": 240,
					"noBall": 2,
					"wideBall": 4,
					"maidens": 1,
					"dots": 96,
					"sixes": 8,
					"fours": 15,
					"economy": 6.315789473684211
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2c38e397-fb12-4c7d-8e42-c0310b3e7af0",
		"fullName": "Virender Sehwag�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 417,
					"ballsFaced": 369,
					"centuries": 1,
					"halfCenturies": 0,
					"highestScore": 219,
					"fours": 60,
					"sixes": 7,
					"strikeRate": 113.00813008130082
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 34,
					"ballsFaced": 29,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 34,
					"fours": 5,
					"sixes": 1,
					"strikeRate": 117.24137931034483
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "81c2f2f6-9811-4d62-a437-29890bc7655c",
		"fullName": "Abhijit Kale",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 10,
					"ballsFaced": 22,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 45.45454545454545
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ec5e2a44-217f-4802-9edb-20b2ed599866",
		"fullName": "Rohit Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 238,
					"innings": 234,
					"runs": 9782,
					"ballsFaced": 10882,
					"centuries": 30,
					"halfCenturies": 48,
					"highestScore": 264,
					"fours": 896,
					"sixes": 273,
					"strikeRate": 89.89156405072598
				},
				"bowlingStatistics": {
					"matches": 238,
					"innings": 38,
					"wickets": 8,
					"overs": {
						"overs": 98.5,
						"balls": 593
					},
					"runsConceded": 515,
					"noBall": 0,
					"wideBall": 4,
					"maidens": 2,
					"dots": 233,
					"sixes": 7,
					"fours": 24,
					"economy": 5.21079258010118
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 147,
					"innings": 140,
					"runs": 3853,
					"ballsFaced": 2767,
					"centuries": 4,
					"halfCenturies": 29,
					"highestScore": 118,
					"fours": 348,
					"sixes": 182,
					"strikeRate": 139.2482833393567
				},
				"bowlingStatistics": {
					"matches": 147,
					"innings": 9,
					"wickets": 1,
					"overs": {
						"overs": 11.2,
						"balls": 68
					},
					"runsConceded": 113,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 11,
					"sixes": 4,
					"fours": 8,
					"economy": 9.970588235294118
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "58b3c9dc-3aeb-4d67-b8ec-869600a5cfe2",
		"fullName": "Shikhar Dhawan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 165,
					"innings": 164,
					"runs": 6793,
					"ballsFaced": 7436,
					"centuries": 17,
					"halfCenturies": 39,
					"highestScore": 143,
					"fours": 842,
					"sixes": 79,
					"strikeRate": 91.35287789133943
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 66,
					"innings": 66,
					"runs": 1759,
					"ballsFaced": 1392,
					"centuries": 0,
					"halfCenturies": 11,
					"highestScore": 92,
					"fours": 191,
					"sixes": 50,
					"strikeRate": 126.36494252873563
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e2d728ec-3c27-4ea4-9183-c0de2c0e0a81",
		"fullName": "Virat Kohli",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 267,
					"innings": 262,
					"runs": 12809,
					"ballsFaced": 13660,
					"centuries": 46,
					"halfCenturies": 64,
					"highestScore": 183,
					"fours": 1204,
					"sixes": 137,
					"strikeRate": 93.7701317715959
				},
				"bowlingStatistics": {
					"matches": 267,
					"innings": 48,
					"wickets": 4,
					"overs": {
						"overs": 106.5,
						"balls": 641
					},
					"runsConceded": 665,
					"noBall": 2,
					"wideBall": 7,
					"maidens": 1,
					"dots": 229,
					"sixes": 9,
					"fours": 50,
					"economy": 6.224648985959439
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 113,
					"innings": 107,
					"runs": 4008,
					"ballsFaced": 2905,
					"centuries": 1,
					"halfCenturies": 37,
					"highestScore": 122,
					"fours": 356,
					"sixes": 117,
					"strikeRate": 137.96901893287435
				},
				"bowlingStatistics": {
					"matches": 113,
					"innings": 13,
					"wickets": 4,
					"overs": {
						"overs": 25.2,
						"balls": 152
					},
					"runsConceded": 204,
					"noBall": 1,
					"wideBall": 2,
					"maidens": 0,
					"dots": 44,
					"sixes": 4,
					"fours": 18,
					"economy": 8.052631578947368
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "44711ee1-c7a4-4a81-83c7-f091d680ebb2",
		"fullName": "Manish Pandey",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 29,
					"innings": 24,
					"runs": 566,
					"ballsFaced": 625,
					"centuries": 1,
					"halfCenturies": 2,
					"highestScore": 104,
					"fours": 45,
					"sixes": 5,
					"strikeRate": 90.56
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 39,
					"innings": 33,
					"runs": 709,
					"ballsFaced": 562,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 79,
					"fours": 49,
					"sixes": 19,
					"strikeRate": 126.15658362989323
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "52361244-4604-4d2f-b8f4-5960bfdb9033",
		"fullName": "MS Dhoni�(c)�",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 196,
					"innings": 172,
					"runs": 6641,
					"ballsFaced": 7703,
					"centuries": 6,
					"halfCenturies": 47,
					"highestScore": 139,
					"fours": 499,
					"sixes": 126,
					"strikeRate": 86.21316370245358
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 71,
					"innings": 62,
					"runs": 1112,
					"ballsFaced": 907,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 48,
					"fours": 75,
					"sixes": 34,
					"strikeRate": 122.60198456449835
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6370d3cf-ba50-4af6-b4db-26e3d7a90dfc",
		"fullName": "Gurkeerat Singh Mann",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 13,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 0,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 68,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 22,
					"sixes": 2,
					"fours": 6,
					"economy": 6.8
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8129652a-bf89-4078-8afa-0fe46e3fbff3",
		"fullName": "Ravindra Jadeja",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 168,
					"innings": 115,
					"runs": 2447,
					"ballsFaced": 2828,
					"centuries": 0,
					"halfCenturies": 13,
					"highestScore": 87,
					"fours": 179,
					"sixes": 50,
					"strikeRate": 86.52758132956153
				},
				"bowlingStatistics": {
					"matches": 168,
					"innings": 166,
					"wickets": 189,
					"overs": {
						"overs": 1435.1,
						"balls": 8611
					},
					"runsConceded": 7062,
					"noBall": 15,
					"wideBall": 64,
					"maidens": 50,
					"dots": 4345,
					"sixes": 159,
					"fours": 468,
					"economy": 4.920682847520613
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 64,
					"innings": 34,
					"runs": 457,
					"ballsFaced": 367,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 46,
					"fours": 34,
					"sixes": 12,
					"strikeRate": 124.52316076294278
				},
				"bowlingStatistics": {
					"matches": 64,
					"innings": 62,
					"wickets": 51,
					"overs": {
						"overs": 206.1,
						"balls": 1237
					},
					"runsConceded": 1453,
					"noBall": 2,
					"wideBall": 28,
					"maidens": 4,
					"dots": 508,
					"sixes": 75,
					"fours": 82,
					"economy": 7.047696038803557
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0d6b7f98-b5a8-4b44-96ee-cbf1b0bda886",
		"fullName": "Rishi Dhawan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 12,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 92.3076923076923
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 25,
						"balls": 150
					},
					"runsConceded": 160,
					"noBall": 0,
					"wideBall": 5,
					"maidens": 0,
					"dots": 61,
					"sixes": 2,
					"fours": 11,
					"economy": 6.4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 4,
						"balls": 24
					},
					"runsConceded": 42,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 7,
					"sixes": 1,
					"fours": 6,
					"economy": 10.5
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4c4a9723-1bd7-4a1a-9e1b-ecfdd054cf02",
		"fullName": "Jasprit Bumrah",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 72,
					"innings": 20,
					"runs": 47,
					"ballsFaced": 93,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 14,
					"fours": 5,
					"sixes": 1,
					"strikeRate": 50.53763440860215
				},
				"bowlingStatistics": {
					"matches": 72,
					"innings": 72,
					"wickets": 121,
					"overs": {
						"overs": 634.3,
						"balls": 3807
					},
					"runsConceded": 2941,
					"noBall": 19,
					"wideBall": 84,
					"maidens": 43,
					"dots": 2276,
					"sixes": 28,
					"fours": 305,
					"economy": 4.6351457840819545
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 58,
					"innings": 7,
					"runs": 8,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 7,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 61.53846153846154
				},
				"bowlingStatistics": {
					"matches": 58,
					"innings": 59,
					"wickets": 70,
					"overs": {
						"overs": 213.5,
						"balls": 1283
					},
					"runsConceded": 1416,
					"noBall": 8,
					"wideBall": 30,
					"maidens": 9,
					"dots": 606,
					"sixes": 31,
					"fours": 147,
					"economy": 6.621979734996103
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8514d224-3968-44cb-ba9f-09e73bfecaed",
		"fullName": "Umesh Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 74,
					"innings": 24,
					"runs": 79,
					"ballsFaced": 134,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 18,
					"fours": 8,
					"sixes": 1,
					"strikeRate": 58.95522388059702
				},
				"bowlingStatistics": {
					"matches": 74,
					"innings": 73,
					"wickets": 106,
					"overs": {
						"overs": 593,
						"balls": 3558
					},
					"runsConceded": 3565,
					"noBall": 4,
					"wideBall": 138,
					"maidens": 23,
					"dots": 1938,
					"sixes": 49,
					"fours": 424,
					"economy": 6.011804384485666
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 2,
					"runs": 22,
					"ballsFaced": 21,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 20,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 104.76190476190476
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 12,
					"overs": {
						"overs": 30,
						"balls": 180
					},
					"runsConceded": 280,
					"noBall": 0,
					"wideBall": 4,
					"maidens": 0,
					"dots": 78,
					"sixes": 8,
					"fours": 42,
					"economy": 9.333333333333334
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d8365305-289d-48b8-9fb5-7c681c7c494a",
		"fullName": "Ishant Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 77,
					"innings": 28,
					"runs": 72,
					"ballsFaced": 203,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 35.467980295566505
				},
				"bowlingStatistics": {
					"matches": 77,
					"innings": 78,
					"wickets": 115,
					"overs": {
						"overs": 622.1,
						"balls": 3733
					},
					"runsConceded": 3563,
					"noBall": 35,
					"wideBall": 92,
					"maidens": 29,
					"dots": 2047,
					"sixes": 50,
					"fours": 407,
					"economy": 5.72676131797482
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 14,
					"innings": 3,
					"runs": 8,
					"ballsFaced": 9,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 88.88888888888889
				},
				"bowlingStatistics": {
					"matches": 14,
					"innings": 14,
					"wickets": 8,
					"overs": {
						"overs": 46.2,
						"balls": 278
					},
					"runsConceded": 400,
					"noBall": 4,
					"wideBall": 8,
					"maidens": 0,
					"dots": 113,
					"sixes": 14,
					"fours": 43,
					"economy": 8.633093525179856
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "aa17c843-4bd0-40de-ab18-ec63aceb435c",
		"fullName": "Ajinkya Rahane",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 90,
					"innings": 87,
					"runs": 2962,
					"ballsFaced": 3767,
					"centuries": 3,
					"halfCenturies": 24,
					"highestScore": 111,
					"fours": 293,
					"sixes": 33,
					"strikeRate": 78.63020971595434
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 20,
					"innings": 20,
					"runs": 375,
					"ballsFaced": 331,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 61,
					"fours": 32,
					"sixes": 6,
					"strikeRate": 113.29305135951661
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "83ef3700-ee3e-49fd-bc1b-96cc52b55401",
		"fullName": "Ravichandran Ashwin",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 112,
					"innings": 63,
					"runs": 707,
					"ballsFaced": 813,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 65,
					"fours": 60,
					"sixes": 7,
					"strikeRate": 86.96186961869618
				},
				"bowlingStatistics": {
					"matches": 112,
					"innings": 111,
					"wickets": 151,
					"overs": {
						"overs": 1023.3,
						"balls": 6141
					},
					"runsConceded": 5058,
					"noBall": 3,
					"wideBall": 113,
					"maidens": 36,
					"dots": 3070,
					"sixes": 114,
					"fours": 303,
					"economy": 4.941866145578896
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 65,
					"innings": 19,
					"runs": 184,
					"ballsFaced": 160,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 31,
					"fours": 17,
					"sixes": 4,
					"strikeRate": 115
				},
				"bowlingStatistics": {
					"matches": 65,
					"innings": 65,
					"wickets": 72,
					"overs": {
						"overs": 242,
						"balls": 1452
					},
					"runsConceded": 1672,
					"noBall": 4,
					"wideBall": 54,
					"maidens": 3,
					"dots": 609,
					"sixes": 76,
					"fours": 94,
					"economy": 6.909090909090909
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e92ba802-6229-43a6-99bb-fce52b80a715",
		"fullName": "Bhuvneshwar Kumar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 120,
					"innings": 55,
					"runs": 552,
					"ballsFaced": 747,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 53,
					"fours": 46,
					"sixes": 8,
					"strikeRate": 73.89558232931726
				},
				"bowlingStatistics": {
					"matches": 120,
					"innings": 120,
					"wickets": 141,
					"overs": {
						"overs": 974.3,
						"balls": 5847
					},
					"runsConceded": 4951,
					"noBall": 5,
					"wideBall": 147,
					"maidens": 68,
					"dots": 3443,
					"sixes": 83,
					"fours": 532,
					"economy": 5.080554130323243
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 86,
					"innings": 21,
					"runs": 67,
					"ballsFaced": 94,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 71.27659574468085
				},
				"bowlingStatistics": {
					"matches": 86,
					"innings": 86,
					"wickets": 90,
					"overs": {
						"overs": 298.3,
						"balls": 1791
					},
					"runsConceded": 2079,
					"noBall": 0,
					"wideBall": 76,
					"maidens": 10,
					"dots": 891,
					"sixes": 68,
					"fours": 201,
					"economy": 6.964824120603015
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0a609e0c-086d-424a-b289-a03099a97853",
		"fullName": "Barinder Sran",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 6,
					"innings": 6,
					"wickets": 7,
					"overs": {
						"overs": 50.2,
						"balls": 302
					},
					"runsConceded": 269,
					"noBall": 1,
					"wideBall": 14,
					"maidens": 2,
					"dots": 168,
					"sixes": 3,
					"fours": 24,
					"economy": 5.344370860927152
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 6,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 41,
					"noBall": 1,
					"wideBall": 4,
					"maidens": 1,
					"dots": 33,
					"sixes": 1,
					"fours": 5,
					"economy": 5.125
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "550e11a7-d5f9-4a82-af56-c7762f58701d",
		"fullName": "KL Rahul",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 51,
					"innings": 49,
					"runs": 1870,
					"ballsFaced": 2141,
					"centuries": 5,
					"halfCenturies": 12,
					"highestScore": 112,
					"fours": 142,
					"sixes": 44,
					"strikeRate": 87.34236338159738
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 70,
					"innings": 68,
					"runs": 2265,
					"ballsFaced": 1628,
					"centuries": 2,
					"halfCenturies": 22,
					"highestScore": 110,
					"fours": 191,
					"sixes": 99,
					"strikeRate": 139.12776412776412
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ee7af7be-1e84-4e9f-ae01-182b4d079803",
		"fullName": "Faiz Fazal",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 55,
					"ballsFaced": 61,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 55,
					"fours": 7,
					"sixes": 1,
					"strikeRate": 90.1639344262295
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "27b5fdd9-70c1-4db3-94c2-d9906c5332e1",
		"fullName": "Ambati Rayudu",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 55,
					"innings": 50,
					"runs": 1694,
					"ballsFaced": 2143,
					"centuries": 3,
					"halfCenturies": 10,
					"highestScore": 124,
					"fours": 145,
					"sixes": 30,
					"strikeRate": 79.04806346243583
				},
				"bowlingStatistics": {
					"matches": 55,
					"innings": 9,
					"wickets": 3,
					"overs": {
						"overs": 20.1,
						"balls": 121
					},
					"runsConceded": 124,
					"noBall": 1,
					"wideBall": 2,
					"maidens": 1,
					"dots": 53,
					"sixes": 3,
					"fours": 11,
					"economy": 6.148760330578512
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 5,
					"runs": 42,
					"ballsFaced": 50,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 20,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 84
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8b297776-362c-4503-ac90-f253174c6cee",
		"fullName": "Kedar Jadhav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 72,
					"innings": 52,
					"runs": 1389,
					"ballsFaced": 1367,
					"centuries": 2,
					"halfCenturies": 6,
					"highestScore": 120,
					"fours": 141,
					"sixes": 24,
					"strikeRate": 101.609363569861
				},
				"bowlingStatistics": {
					"matches": 72,
					"innings": 42,
					"wickets": 27,
					"overs": {
						"overs": 197.5,
						"balls": 1187
					},
					"runsConceded": 1020,
					"noBall": 0,
					"wideBall": 28,
					"maidens": 1,
					"dots": 548,
					"sixes": 17,
					"fours": 69,
					"economy": 5.155855096882898
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 6,
					"runs": 122,
					"ballsFaced": 99,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 58,
					"fours": 12,
					"sixes": 3,
					"strikeRate": 123.23232323232324
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "309f9c5b-37ab-4a0d-9c47-9b355d7ed89b",
		"fullName": "Axar Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 49,
					"innings": 29,
					"runs": 381,
					"ballsFaced": 362,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 64,
					"fours": 17,
					"sixes": 19,
					"strikeRate": 105.2486187845304
				},
				"bowlingStatistics": {
					"matches": 49,
					"innings": 45,
					"wickets": 56,
					"overs": {
						"overs": 391.3,
						"balls": 2349
					},
					"runsConceded": 1740,
					"noBall": 0,
					"wideBall": 20,
					"maidens": 18,
					"dots": 1330,
					"sixes": 30,
					"fours": 146,
					"economy": 4.444444444444445
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 40,
					"innings": 25,
					"runs": 288,
					"ballsFaced": 189,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 65,
					"fours": 24,
					"sixes": 13,
					"strikeRate": 152.38095238095238
				},
				"bowlingStatistics": {
					"matches": 40,
					"innings": 39,
					"wickets": 37,
					"overs": {
						"overs": 124.1,
						"balls": 745
					},
					"runsConceded": 929,
					"noBall": 0,
					"wideBall": 12,
					"maidens": 1,
					"dots": 288,
					"sixes": 44,
					"fours": 62,
					"economy": 7.4818791946308725
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "248e505e-1535-4ef6-ad73-7f2ad6e63ec3",
		"fullName": "Dhawal Kulkarni",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 2,
					"runs": 27,
					"ballsFaced": 28,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 25,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 96.42857142857143
				},
				"bowlingStatistics": {
					"matches": 12,
					"innings": 12,
					"wickets": 19,
					"overs": {
						"overs": 99.4,
						"balls": 598
					},
					"runsConceded": 508,
					"noBall": 1,
					"wideBall": 28,
					"maidens": 5,
					"dots": 344,
					"sixes": 2,
					"fours": 51,
					"economy": 5.096989966555184
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 3,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 55,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 25,
					"sixes": 1,
					"fours": 8,
					"economy": 6.875
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4d556015-55ec-4fda-bc15-3925011350a2",
		"fullName": "Yuzvendra Chahal",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 72,
					"innings": 14,
					"runs": 77,
					"ballsFaced": 141,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 18,
					"fours": 8,
					"sixes": 0,
					"strikeRate": 54.60992907801418
				},
				"bowlingStatistics": {
					"matches": 72,
					"innings": 69,
					"wickets": 121,
					"overs": {
						"overs": 623.1,
						"balls": 3739
					},
					"runsConceded": 3283,
					"noBall": 9,
					"wideBall": 53,
					"maidens": 14,
					"dots": 1845,
					"sixes": 111,
					"fours": 180,
					"economy": 5.268253543728269
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 74,
					"innings": 4,
					"runs": 5,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 45.45454545454545
				},
				"bowlingStatistics": {
					"matches": 74,
					"innings": 74,
					"wickets": 91,
					"overs": {
						"overs": 276,
						"balls": 1656
					},
					"runsConceded": 2246,
					"noBall": 5,
					"wideBall": 50,
					"maidens": 2,
					"dots": 570,
					"sixes": 117,
					"fours": 129,
					"economy": 8.13768115942029
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b1df1e3f-5325-4172-a1d1-ddd67c1c42e4",
		"fullName": "Karun Nair",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 46,
					"ballsFaced": 88,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 39,
					"fours": 6,
					"sixes": 0,
					"strikeRate": 52.27272727272727
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7d7e001d-7152-41ef-87f4-76673aca4f30",
		"fullName": "Hardik Pandya",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 71,
					"innings": 52,
					"runs": 1518,
					"ballsFaced": 1340,
					"centuries": 0,
					"halfCenturies": 9,
					"highestScore": 92,
					"fours": 115,
					"sixes": 58,
					"strikeRate": 113.28358208955224
				},
				"bowlingStatistics": {
					"matches": 71,
					"innings": 66,
					"wickets": 68,
					"overs": {
						"overs": 468.4,
						"balls": 2812
					},
					"runsConceded": 2620,
					"noBall": 8,
					"wideBall": 109,
					"maidens": 11,
					"dots": 1427,
					"sixes": 33,
					"fours": 258,
					"economy": 5.590327169274538
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 87,
					"innings": 67,
					"runs": 1271,
					"ballsFaced": 894,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 71,
					"fours": 92,
					"sixes": 65,
					"strikeRate": 142.17002237136467
				},
				"bowlingStatistics": {
					"matches": 87,
					"innings": 76,
					"wickets": 69,
					"overs": {
						"overs": 223.5,
						"balls": 1343
					},
					"runsConceded": 1824,
					"noBall": 2,
					"wideBall": 62,
					"maidens": 1,
					"dots": 501,
					"sixes": 71,
					"fours": 146,
					"economy": 8.14892032762472
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "29df1e17-d7f3-49f5-9130-bb12402f2dd9",
		"fullName": "Jayant Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 3,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 42.857142857142854
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 14,
						"balls": 84
					},
					"runsConceded": 61,
					"noBall": 1,
					"wideBall": 1,
					"maidens": 0,
					"dots": 48,
					"sixes": 1,
					"fours": 3,
					"economy": 4.357142857142857
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7828a564-1192-4410-ab9f-3324cb4c39b6",
		"fullName": "Suresh Raina",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 222,
					"innings": 194,
					"runs": 5615,
					"ballsFaced": 6005,
					"centuries": 5,
					"halfCenturies": 36,
					"highestScore": 116,
					"fours": 476,
					"sixes": 120,
					"strikeRate": 93.50541215653622
				},
				"bowlingStatistics": {
					"matches": 222,
					"innings": 101,
					"wickets": 36,
					"overs": {
						"overs": 354.2,
						"balls": 2126
					},
					"runsConceded": 1811,
					"noBall": 0,
					"wideBall": 23,
					"maidens": 5,
					"dots": 959,
					"sixes": 31,
					"fours": 113,
					"economy": 5.111006585136407
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 78,
					"innings": 66,
					"runs": 1605,
					"ballsFaced": 1190,
					"centuries": 1,
					"halfCenturies": 5,
					"highestScore": 101,
					"fours": 145,
					"sixes": 58,
					"strikeRate": 134.87394957983193
				},
				"bowlingStatistics": {
					"matches": 78,
					"innings": 27,
					"wickets": 13,
					"overs": {
						"overs": 58.1,
						"balls": 349
					},
					"runsConceded": 442,
					"noBall": 0,
					"wideBall": 13,
					"maidens": 0,
					"dots": 108,
					"sixes": 21,
					"fours": 18,
					"economy": 7.598853868194842
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c84e720b-c3ea-40c7-ae96-8c85f34184d2",
		"fullName": "Stuart Binny",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 14,
					"innings": 11,
					"runs": 230,
					"ballsFaced": 246,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 77,
					"fours": 23,
					"sixes": 5,
					"strikeRate": 93.4959349593496
				},
				"bowlingStatistics": {
					"matches": 14,
					"innings": 12,
					"wickets": 20,
					"overs": {
						"overs": 81.4,
						"balls": 490
					},
					"runsConceded": 439,
					"noBall": 2,
					"wideBall": 11,
					"maidens": 4,
					"dots": 265,
					"sixes": 6,
					"fours": 44,
					"economy": 5.375510204081633
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 35,
					"ballsFaced": 29,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 24,
					"fours": 2,
					"sixes": 1,
					"strikeRate": 120.6896551724138
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 1,
					"overs": {
						"overs": 5,
						"balls": 30
					},
					"runsConceded": 54,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 10,
					"sixes": 5,
					"fours": 2,
					"economy": 10.8
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6c08de19-3ef6-4363-8504-fbce6c53ac6f",
		"fullName": "Mohammed Shami",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 85,
					"innings": 41,
					"runs": 190,
					"ballsFaced": 228,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 25,
					"fours": 14,
					"sixes": 8,
					"strikeRate": 83.33333333333333
				},
				"bowlingStatistics": {
					"matches": 85,
					"innings": 86,
					"wickets": 159,
					"overs": {
						"overs": 736,
						"balls": 4416
					},
					"runsConceded": 4127,
					"noBall": 4,
					"wideBall": 140,
					"maidens": 43,
					"dots": 2532,
					"sixes": 79,
					"fours": 464,
					"economy": 5.607336956521739
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 23,
					"innings": 3,
					"runs": 0,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 23,
					"innings": 23,
					"wickets": 24,
					"overs": {
						"overs": 79.3,
						"balls": 477
					},
					"runsConceded": 711,
					"noBall": 0,
					"wideBall": 18,
					"maidens": 1,
					"dots": 196,
					"sixes": 34,
					"fours": 65,
					"economy": 8.943396226415095
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d5a10315-eb56-4953-b586-a8cd14aa9465",
		"fullName": "Mohit Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 26,
					"innings": 9,
					"runs": 31,
					"ballsFaced": 66,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 11,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 46.96969696969697
				},
				"bowlingStatistics": {
					"matches": 26,
					"innings": 25,
					"wickets": 31,
					"overs": {
						"overs": 186.5,
						"balls": 1121
					},
					"runsConceded": 1020,
					"noBall": 5,
					"wideBall": 27,
					"maidens": 12,
					"dots": 639,
					"sixes": 14,
					"fours": 120,
					"economy": 5.459411239964318
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 2,
					"runs": 3,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 42.857142857142854
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 6,
					"overs": {
						"overs": 23,
						"balls": 138
					},
					"runsConceded": 185,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 60,
					"sixes": 5,
					"fours": 23,
					"economy": 8.043478260869565
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "4e305026-2db8-46f9-9789-d13b3840d02a",
		"fullName": "Ajinkya Rahane�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 112,
					"ballsFaced": 154,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 63,
					"fours": 13,
					"sixes": 0,
					"strikeRate": 72.72727272727273
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 37,
					"ballsFaced": 35,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 33,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 105.71428571428571
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3cf2eb71-ab73-4cb0-8d2d-2cd9a1395853",
		"fullName": "Murali Vijay",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 17,
					"innings": 16,
					"runs": 339,
					"ballsFaced": 506,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 72,
					"fours": 33,
					"sixes": 3,
					"strikeRate": 66.99604743083005
				},
				"bowlingStatistics": {
					"matches": 17,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 6,
						"balls": 36
					},
					"runsConceded": 37,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 15,
					"sixes": 1,
					"fours": 2,
					"economy": 6.166666666666667
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 9,
					"runs": 169,
					"ballsFaced": 154,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 48,
					"fours": 13,
					"sixes": 8,
					"strikeRate": 109.74025974025975
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 2,
						"balls": 12
					},
					"runsConceded": 9,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 4,
					"sixes": 0,
					"fours": 0,
					"economy": 4.5
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d2ff4be9-0089-4d84-b6bc-cf36dd1eb4f8",
		"fullName": "Manoj Tiwary",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 287,
					"ballsFaced": 403,
					"centuries": 1,
					"halfCenturies": 1,
					"highestScore": 104,
					"fours": 24,
					"sixes": 3,
					"strikeRate": 71.21588089330025
				},
				"bowlingStatistics": {
					"matches": 12,
					"innings": 6,
					"wickets": 5,
					"overs": {
						"overs": 22,
						"balls": 132
					},
					"runsConceded": 150,
					"noBall": 0,
					"wideBall": 4,
					"maidens": 1,
					"dots": 64,
					"sixes": 8,
					"fours": 8,
					"economy": 6.818181818181818
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 15,
					"ballsFaced": 17,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 15,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 88.23529411764706
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2413b414-b73d-4f73-ba6e-da2aec1447a2",
		"fullName": "Robin Uthappa��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 5,
					"runs": 79,
					"ballsFaced": 95,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 31,
					"fours": 7,
					"sixes": 0,
					"strikeRate": 83.15789473684211
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 81,
					"ballsFaced": 60,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 42,
					"fours": 11,
					"sixes": 0,
					"strikeRate": 135
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c18dae68-c9a4-4959-82d6-99202467a596",
		"fullName": "Varun Aaron",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 3,
					"runs": 8,
					"ballsFaced": 15,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 53.333333333333336
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 11,
					"overs": {
						"overs": 63.2,
						"balls": 380
					},
					"runsConceded": 419,
					"noBall": 2,
					"wideBall": 23,
					"maidens": 1,
					"dots": 190,
					"sixes": 8,
					"fours": 46,
					"economy": 6.61578947368421
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a2d643ba-b5bc-4bd4-a20a-eae1df38dcaa",
		"fullName": "Dinesh Karthik��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 26,
					"innings": 21,
					"runs": 394,
					"ballsFaced": 531,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 69,
					"fours": 42,
					"sixes": 4,
					"strikeRate": 74.19962335216573
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 19,
					"innings": 16,
					"runs": 166,
					"ballsFaced": 126,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 39,
					"fours": 18,
					"sixes": 4,
					"strikeRate": 131.74603174603175
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8025f964-9f85-4cef-9f3c-55e0ef9709a2",
		"fullName": "Virat Kohli�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 94,
					"innings": 91,
					"runs": 5449,
					"ballsFaced": 5544,
					"centuries": 21,
					"halfCenturies": 27,
					"highestScore": 160,
					"fours": 520,
					"sixes": 62,
					"strikeRate": 98.28643578643579
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 48,
					"innings": 46,
					"runs": 1570,
					"ballsFaced": 1117,
					"centuries": 0,
					"halfCenturies": 13,
					"highestScore": 94,
					"fours": 114,
					"sixes": 59,
					"strikeRate": 140.5550581915846
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b4395842-f632-40e3-bcfc-fa9cc9da518c",
		"fullName": "Robin Uthappa",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 45,
					"innings": 42,
					"runs": 934,
					"ballsFaced": 1031,
					"centuries": 0,
					"halfCenturies": 6,
					"highestScore": 86,
					"fours": 107,
					"sixes": 19,
					"strikeRate": 90.59165858389913
				},
				"bowlingStatistics": {
					"matches": 45,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 0.2,
						"balls": 2
					},
					"runsConceded": 0,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 2,
					"sixes": 0,
					"fours": 0,
					"economy": 0
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 249,
					"ballsFaced": 211,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 50,
					"fours": 26,
					"sixes": 6,
					"strikeRate": 118.00947867298578
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6a03ba28-3eb9-41f6-969d-62fbcc3cebf6",
		"fullName": "Cheteshwar Pujara",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 5,
					"runs": 51,
					"ballsFaced": 130,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 27,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 39.23076923076923
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f6ab8aef-42df-4b65-8014-902052bb8119",
		"fullName": "Suresh Raina�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 232,
					"ballsFaced": 260,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 43,
					"fours": 21,
					"sixes": 1,
					"strikeRate": 89.23076923076923
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 102,
					"ballsFaced": 67,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 72,
					"fours": 9,
					"sixes": 3,
					"strikeRate": 152.23880597014926
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6de95718-9451-4fe8-bb78-a8a0e9f7b2c1",
		"fullName": "Wriddhiman Saha��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 5,
					"runs": 41,
					"ballsFaced": 56,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 73.21428571428571
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8bf5ae15-dda9-471b-920a-dc41032ed732",
		"fullName": "Parvez Rasool",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 2,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 60,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 25,
					"sixes": 1,
					"fours": 6,
					"economy": 6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 5,
					"ballsFaced": 6,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 83.33333333333333
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 4,
						"balls": 24
					},
					"runsConceded": 32,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 6,
					"sixes": 2,
					"fours": 1,
					"economy": 8
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "0271d339-3ab3-4a32-bdf7-3623706d22ee",
		"fullName": "Jaydev Unadkat",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 7,
					"innings": 7,
					"wickets": 8,
					"overs": {
						"overs": 52,
						"balls": 312
					},
					"runsConceded": 209,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 5,
					"dots": 205,
					"sixes": 3,
					"fours": 20,
					"economy": 4.019230769230769
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 14,
					"overs": {
						"overs": 34.4,
						"balls": 208
					},
					"runsConceded": 301,
					"noBall": 0,
					"wideBall": 15,
					"maidens": 0,
					"dots": 88,
					"sixes": 16,
					"fours": 22,
					"economy": 8.682692307692308
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "dcede4b9-12a2-42c8-b97f-695245ea145d",
		"fullName": "Vinay Kumar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 31,
					"innings": 13,
					"runs": 86,
					"ballsFaced": 146,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 27,
					"fours": 5,
					"sixes": 2,
					"strikeRate": 58.9041095890411
				},
				"bowlingStatistics": {
					"matches": 31,
					"innings": 31,
					"wickets": 38,
					"overs": {
						"overs": 239.2,
						"balls": 1436
					},
					"runsConceded": 1423,
					"noBall": 4,
					"wideBall": 19,
					"maidens": 19,
					"dots": 785,
					"sixes": 42,
					"fours": 145,
					"economy": 5.945682451253482
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 1,
					"runs": 2,
					"ballsFaced": 4,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 10,
					"overs": {
						"overs": 31.3,
						"balls": 189
					},
					"runsConceded": 247,
					"noBall": 0,
					"wideBall": 5,
					"maidens": 0,
					"dots": 80,
					"sixes": 9,
					"fours": 24,
					"economy": 7.841269841269841
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "465423a9-0626-4267-b085-120d55644180",
		"fullName": "Karn Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 19,
						"balls": 114
					},
					"runsConceded": 125,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 60,
					"sixes": 7,
					"fours": 9,
					"economy": 6.578947368421052
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 4,
						"balls": 24
					},
					"runsConceded": 28,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 10,
					"sixes": 2,
					"fours": 1,
					"economy": 7
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "f4a462a5-d8ad-4c5e-b0b6-5e8b64a8240c",
		"fullName": "Dinesh Karthik",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 91,
					"innings": 79,
					"runs": 1752,
					"ballsFaced": 2392,
					"centuries": 0,
					"halfCenturies": 9,
					"highestScore": 79,
					"fours": 176,
					"sixes": 15,
					"strikeRate": 73.24414715719064
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 57,
					"innings": 47,
					"runs": 686,
					"ballsFaced": 476,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 55,
					"fours": 71,
					"sixes": 28,
					"strikeRate": 144.11764705882354
				},
				"bowlingStatistics": {
					"matches": 57,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 18,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 1,
					"sixes": 2,
					"fours": 0,
					"economy": 18
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c37fb72e-0ca2-46b5-ae5c-79d2e51a4bc9",
		"fullName": "Ashok Dinda",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 5,
					"runs": 21,
					"ballsFaced": 36,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 58.333333333333336
				},
				"bowlingStatistics": {
					"matches": 13,
					"innings": 13,
					"wickets": 12,
					"overs": {
						"overs": 99,
						"balls": 594
					},
					"runsConceded": 612,
					"noBall": 3,
					"wideBall": 16,
					"maidens": 2,
					"dots": 301,
					"sixes": 7,
					"fours": 66,
					"economy": 6.181818181818182
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 2,
					"runs": 22,
					"ballsFaced": 24,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 91.66666666666667
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 17,
					"overs": {
						"overs": 30,
						"balls": 180
					},
					"runsConceded": 245,
					"noBall": 2,
					"wideBall": 4,
					"maidens": 1,
					"dots": 83,
					"sixes": 3,
					"fours": 36,
					"economy": 8.166666666666666
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "db04465a-5e10-4e40-83d0-0a3d36ca13dc",
		"fullName": "RP Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 53,
					"innings": 20,
					"runs": 104,
					"ballsFaced": 242,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 23,
					"fours": 5,
					"sixes": 1,
					"strikeRate": 42.97520661157025
				},
				"bowlingStatistics": {
					"matches": 53,
					"innings": 57,
					"wickets": 69,
					"overs": {
						"overs": 427.3,
						"balls": 2565
					},
					"runsConceded": 2343,
					"noBall": 9,
					"wideBall": 139,
					"maidens": 31,
					"dots": 1507,
					"sixes": 18,
					"fours": 283,
					"economy": 5.480701754385965
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 2,
					"runs": 3,
					"ballsFaced": 3,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 15,
					"overs": {
						"overs": 33,
						"balls": 198
					},
					"runsConceded": 225,
					"noBall": 2,
					"wideBall": 11,
					"maidens": 0,
					"dots": 106,
					"sixes": 4,
					"fours": 30,
					"economy": 6.818181818181818
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2bfebf3d-5bb3-4a63-b312-50f462e18313",
		"fullName": "Piyush Chawla",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 25,
					"innings": 12,
					"runs": 38,
					"ballsFaced": 58,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 65.51724137931035
				},
				"bowlingStatistics": {
					"matches": 25,
					"innings": 25,
					"wickets": 32,
					"overs": {
						"overs": 218.4,
						"balls": 1312
					},
					"runsConceded": 1117,
					"noBall": 3,
					"wideBall": 15,
					"maidens": 6,
					"dots": 693,
					"sixes": 27,
					"fours": 82,
					"economy": 5.108231707317073
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 7,
					"innings": 7,
					"wickets": 4,
					"overs": {
						"overs": 23,
						"balls": 138
					},
					"runsConceded": 151,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 1,
					"dots": 51,
					"sixes": 5,
					"fours": 10,
					"economy": 6.565217391304348
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "30a481f9-0d2a-426c-9efc-201ff8ea7c56",
		"fullName": "Sreesanth",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 50,
					"innings": 21,
					"runs": 44,
					"ballsFaced": 121,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 36.36363636363637
				},
				"bowlingStatistics": {
					"matches": 50,
					"innings": 52,
					"wickets": 75,
					"overs": {
						"overs": 412.4,
						"balls": 2476
					},
					"runsConceded": 2508,
					"noBall": 42,
					"wideBall": 80,
					"maidens": 16,
					"dots": 1396,
					"sixes": 22,
					"fours": 317,
					"economy": 6.077544426494346
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 3,
					"runs": 20,
					"ballsFaced": 14,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 142.85714285714286
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 9,
					"wickets": 7,
					"overs": {
						"overs": 34,
						"balls": 204
					},
					"runsConceded": 288,
					"noBall": 1,
					"wideBall": 14,
					"maidens": 2,
					"dots": 110,
					"sixes": 11,
					"fours": 32,
					"economy": 8.470588235294118
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c9c6d30e-d9c6-4d94-8b13-12eda68c86d7",
		"fullName": "MS Dhoni��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 146,
					"innings": 122,
					"runs": 3958,
					"ballsFaced": 4461,
					"centuries": 3,
					"halfCenturies": 26,
					"highestScore": 183,
					"fours": 310,
					"sixes": 96,
					"strikeRate": 88.72450123290741
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 26,
					"innings": 23,
					"runs": 505,
					"ballsFaced": 375,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 56,
					"fours": 41,
					"sixes": 18,
					"strikeRate": 134.66666666666666
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "eaed4cd3-da04-4f25-ab69-fa874ff4dca0",
		"fullName": "Rahul Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 6,
					"overs": {
						"overs": 34.2,
						"balls": 206
					},
					"runsConceded": 177,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 98,
					"sixes": 6,
					"fours": 6,
					"economy": 5.155339805825243
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 3,
					"overs": {
						"overs": 7.2,
						"balls": 44
					},
					"runsConceded": 56,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 19,
					"sixes": 3,
					"fours": 4,
					"economy": 7.636363636363637
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1a83fb96-e769-4b67-ae27-90884c28fb49",
		"fullName": "Praveen Kumar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 67,
					"innings": 33,
					"runs": 292,
					"ballsFaced": 331,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 54,
					"fours": 25,
					"sixes": 7,
					"strikeRate": 88.21752265861028
				},
				"bowlingStatistics": {
					"matches": 67,
					"innings": 67,
					"wickets": 77,
					"overs": {
						"overs": 540.2,
						"balls": 3242
					},
					"runsConceded": 2774,
					"noBall": 4,
					"wideBall": 91,
					"maidens": 45,
					"dots": 1879,
					"sixes": 35,
					"fours": 301,
					"economy": 5.133867982726712
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 3,
					"runs": 7,
					"ballsFaced": 16,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 6,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 43.75
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 8,
					"overs": {
						"overs": 26,
						"balls": 156
					},
					"runsConceded": 193,
					"noBall": 0,
					"wideBall": 3,
					"maidens": 1,
					"dots": 64,
					"sixes": 2,
					"fours": 22,
					"economy": 7.423076923076923
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d7edcb31-d594-428d-ac7d-37961d0b4774",
		"fullName": "Irfan Pathan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 119,
					"innings": 87,
					"runs": 1544,
					"ballsFaced": 1941,
					"centuries": 0,
					"halfCenturies": 5,
					"highestScore": 83,
					"fours": 142,
					"sixes": 37,
					"strikeRate": 79.54662545079856
				},
				"bowlingStatistics": {
					"matches": 119,
					"innings": 118,
					"wickets": 173,
					"overs": {
						"overs": 975.5,
						"balls": 5855
					},
					"runsConceded": 5142,
					"noBall": 21,
					"wideBall": 225,
					"maidens": 53,
					"dots": 3395,
					"sixes": 38,
					"fours": 588,
					"economy": 5.26934244235696
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 23,
					"innings": 14,
					"runs": 172,
					"ballsFaced": 144,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 33,
					"fours": 9,
					"sixes": 7,
					"strikeRate": 119.44444444444444
				},
				"bowlingStatistics": {
					"matches": 23,
					"innings": 23,
					"wickets": 28,
					"overs": {
						"overs": 77,
						"balls": 462
					},
					"runsConceded": 618,
					"noBall": 1,
					"wideBall": 19,
					"maidens": 1,
					"dots": 195,
					"sixes": 21,
					"fours": 63,
					"economy": 8.025974025974026
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1be7be5a-e7d9-4b11-a8b5-65a46343c205",
		"fullName": "Yusuf Pathan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 56,
					"innings": 41,
					"runs": 810,
					"ballsFaced": 713,
					"centuries": 2,
					"halfCenturies": 3,
					"highestScore": 123,
					"fours": 62,
					"sixes": 43,
					"strikeRate": 113.60448807854138
				},
				"bowlingStatistics": {
					"matches": 56,
					"innings": 50,
					"wickets": 33,
					"overs": {
						"overs": 248.2,
						"balls": 1490
					},
					"runsConceded": 1365,
					"noBall": 0,
					"wideBall": 27,
					"maidens": 3,
					"dots": 640,
					"sixes": 26,
					"fours": 88,
					"economy": 5.496644295302014
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 22,
					"innings": 18,
					"runs": 236,
					"ballsFaced": 161,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 37,
					"fours": 11,
					"sixes": 17,
					"strikeRate": 146.583850931677
				},
				"bowlingStatistics": {
					"matches": 22,
					"innings": 17,
					"wickets": 13,
					"overs": {
						"overs": 50.5,
						"balls": 305
					},
					"runsConceded": 438,
					"noBall": 0,
					"wideBall": 5,
					"maidens": 0,
					"dots": 94,
					"sixes": 22,
					"fours": 26,
					"economy": 8.61639344262295
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "2c9d4c4c-d689-44db-9f9d-b439cd90e700",
		"fullName": "Parthiv Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 38,
					"innings": 34,
					"runs": 736,
					"ballsFaced": 962,
					"centuries": 0,
					"halfCenturies": 4,
					"highestScore": 95,
					"fours": 79,
					"sixes": 7,
					"strikeRate": 76.5072765072765
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 36,
					"ballsFaced": 32,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 4,
					"sixes": 1,
					"strikeRate": 112.5
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6752bb05-b7a9-45a8-8c6d-d990710fa218",
		"fullName": "Munaf Patel",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 69,
					"innings": 27,
					"runs": 74,
					"ballsFaced": 112,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 15,
					"fours": 7,
					"sixes": 1,
					"strikeRate": 66.07142857142857
				},
				"bowlingStatistics": {
					"matches": 69,
					"innings": 67,
					"wickets": 86,
					"overs": {
						"overs": 525.4,
						"balls": 3154
					},
					"runsConceded": 2603,
					"noBall": 40,
					"wideBall": 52,
					"maidens": 38,
					"dots": 1878,
					"sixes": 29,
					"fours": 281,
					"economy": 4.951807228915663
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 4,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 86,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 26,
					"sixes": 4,
					"fours": 10,
					"economy": 8.6
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9042bc4c-b524-4a05-983d-2313fd7a1307",
		"fullName": "Pragyan Ojha",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 10,
					"runs": 46,
					"ballsFaced": 112,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 16,
					"fours": 3,
					"sixes": 0,
					"strikeRate": 41.07142857142857
				},
				"bowlingStatistics": {
					"matches": 18,
					"innings": 17,
					"wickets": 21,
					"overs": {
						"overs": 146,
						"balls": 876
					},
					"runsConceded": 652,
					"noBall": 0,
					"wideBall": 6,
					"maidens": 5,
					"dots": 465,
					"sixes": 11,
					"fours": 35,
					"economy": 4.465753424657534
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 1,
					"runs": 10,
					"ballsFaced": 6,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 166.66666666666666
				},
				"bowlingStatistics": {
					"matches": 6,
					"innings": 6,
					"wickets": 10,
					"overs": {
						"overs": 21,
						"balls": 126
					},
					"runsConceded": 132,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 45,
					"sixes": 4,
					"fours": 7,
					"economy": 6.285714285714286
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3d42ba60-0960-4d7d-9626-15c61e28df2a",
		"fullName": "S Badrinath",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 6,
					"runs": 79,
					"ballsFaced": 172,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 27,
					"fours": 4,
					"sixes": 0,
					"strikeRate": 45.93023255813954
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 43,
					"ballsFaced": 37,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 43,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 116.21621621621621
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "cce9662d-a392-4a2e-995e-82f301f87d2c",
		"fullName": "Abhimanyu Mithun",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 3,
					"runs": 51,
					"ballsFaced": 55,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 24,
					"fours": 2,
					"sixes": 4,
					"strikeRate": 92.72727272727273
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 3,
					"overs": {
						"overs": 30,
						"balls": 180
					},
					"runsConceded": 203,
					"noBall": 0,
					"wideBall": 8,
					"maidens": 1,
					"dots": 98,
					"sixes": 4,
					"fours": 26,
					"economy": 6.766666666666667
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8e0da92d-f12e-44ca-97fc-8aec7b7e7dfc",
		"fullName": "Gautam Gambhir�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 6,
					"runs": 360,
					"ballsFaced": 339,
					"centuries": 2,
					"halfCenturies": 0,
					"highestScore": 138,
					"fours": 46,
					"sixes": 0,
					"strikeRate": 106.19469026548673
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1e7b0965-609d-40ca-8d6f-7afe5f1345d0",
		"fullName": "Sudeep Tyagi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 4,
					"wickets": 3,
					"overs": {
						"overs": 27.3,
						"balls": 165
					},
					"runsConceded": 144,
					"noBall": 1,
					"wideBall": 3,
					"maidens": 4,
					"dots": 102,
					"sixes": 2,
					"fours": 20,
					"economy": 5.236363636363636
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 2,
						"balls": 12
					},
					"runsConceded": 21,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 5,
					"sixes": 1,
					"fours": 2,
					"economy": 10.5
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "be24b58e-e83c-4cd7-ae43-4ccf3098081c",
		"fullName": "Naman Ojha",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 14.285714285714286
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 12,
					"ballsFaced": 27,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 44.44444444444444
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7fa7703a-61f8-4fa1-b6b1-aaf83e984832",
		"fullName": "Pankaj Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 3,
					"ballsFaced": 3,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 3,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 7,
						"balls": 42
					},
					"runsConceded": 45,
					"noBall": 1,
					"wideBall": 1,
					"maidens": 0,
					"dots": 22,
					"sixes": 1,
					"fours": 5,
					"economy": 6.428571428571429
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "318fa823-6ce1-4772-9332-64547260cfa6",
		"fullName": "Saurabh Tiwary",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 49,
					"ballsFaced": 56,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 37,
					"fours": 5,
					"sixes": 1,
					"strikeRate": 87.5
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "73542422-378e-4567-9d22-5a910b16c142",
		"fullName": "Abhishek Nayar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 3,
						"balls": 18
					},
					"runsConceded": 17,
					"noBall": 1,
					"wideBall": 1,
					"maidens": 0,
					"dots": 8,
					"sixes": 0,
					"fours": 1,
					"economy": 5.666666666666667
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3f1b156a-3f32-46ce-ae53-f9bba53341af",
		"fullName": "Manpreet Gony",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 2,
					"overs": {
						"overs": 13,
						"balls": 78
					},
					"runsConceded": 76,
					"noBall": 0,
					"wideBall": 3,
					"maidens": 1,
					"dots": 44,
					"sixes": 2,
					"fours": 5,
					"economy": 5.846153846153846
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1f319ffc-c83d-40bd-b96e-ff5d10be28fd",
		"fullName": "Joginder Sharma",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 3,
					"runs": 35,
					"ballsFaced": 30,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 29,
					"fours": 5,
					"sixes": 0,
					"strikeRate": 116.66666666666667
				},
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 1,
					"overs": {
						"overs": 25,
						"balls": 150
					},
					"runsConceded": 115,
					"noBall": 3,
					"wideBall": 3,
					"maidens": 3,
					"dots": 99,
					"sixes": 2,
					"fours": 13,
					"economy": 4.6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 4,
					"overs": {
						"overs": 14.3,
						"balls": 87
					},
					"runsConceded": 138,
					"noBall": 0,
					"wideBall": 4,
					"maidens": 0,
					"dots": 31,
					"sixes": 7,
					"fours": 11,
					"economy": 9.517241379310345
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "95f72100-4ce5-443d-9a57-0cee112286c0",
		"fullName": "Ramesh Powar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 31,
					"innings": 19,
					"runs": 163,
					"ballsFaced": 260,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 54,
					"fours": 12,
					"sixes": 2,
					"strikeRate": 62.69230769230769
				},
				"bowlingStatistics": {
					"matches": 31,
					"innings": 29,
					"wickets": 34,
					"overs": {
						"overs": 256,
						"balls": 1536
					},
					"runsConceded": 1191,
					"noBall": 4,
					"wideBall": 23,
					"maidens": 6,
					"dots": 830,
					"sixes": 28,
					"fours": 65,
					"economy": 4.65234375
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "45b51925-0a59-457f-8ab1-ea94e8f291aa",
		"fullName": "Venugopal Rao",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 16,
					"innings": 11,
					"runs": 218,
					"ballsFaced": 363,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 61,
					"fours": 16,
					"sixes": 3,
					"strikeRate": 60.05509641873278
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9296aa95-c3fa-4263-b1c1-d0570aea27dd",
		"fullName": "Vikram Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 8,
					"ballsFaced": 13,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 61.53846153846154
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 12,
						"balls": 72
					},
					"runsConceded": 105,
					"noBall": 8,
					"wideBall": 1,
					"maidens": 0,
					"dots": 38,
					"sixes": 1,
					"fours": 15,
					"economy": 8.75
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9856b0f2-07c3-4278-9459-aa8cfa537a30",
		"fullName": "Wasim Jaffer",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 10,
					"ballsFaced": 23,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 43.47826086956522
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9c9f5648-c1cc-41e0-b6bc-f262b52306ac",
		"fullName": "Rohan Gavaskar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 10,
					"runs": 151,
					"ballsFaced": 234,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 54,
					"fours": 8,
					"sixes": 2,
					"strikeRate": 64.52991452991454
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 2,
					"wickets": 1,
					"overs": {
						"overs": 12,
						"balls": 72
					},
					"runsConceded": 74,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 21,
					"sixes": 0,
					"fours": 5,
					"economy": 6.166666666666667
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "65665afa-9db5-4f8b-927e-98ca22c426f7",
		"fullName": "Vijay Shankar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 8,
					"runs": 223,
					"ballsFaced": 246,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 46,
					"fours": 20,
					"sixes": 4,
					"strikeRate": 90.65040650406505
				},
				"bowlingStatistics": {
					"matches": 12,
					"innings": 9,
					"wickets": 4,
					"overs": {
						"overs": 38.5,
						"balls": 233
					},
					"runsConceded": 210,
					"noBall": 0,
					"wideBall": 8,
					"maidens": 0,
					"dots": 116,
					"sixes": 0,
					"fours": 25,
					"economy": 5.407725321888412
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 4,
					"runs": 101,
					"ballsFaced": 73,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 43,
					"fours": 11,
					"sixes": 5,
					"strikeRate": 138.35616438356163
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 6,
					"wickets": 5,
					"overs": {
						"overs": 21,
						"balls": 126
					},
					"runsConceded": 191,
					"noBall": 2,
					"wideBall": 7,
					"maidens": 0,
					"dots": 39,
					"sixes": 7,
					"fours": 14,
					"economy": 9.095238095238095
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "073d8690-66e5-4634-b79a-12c00cabf363",
		"fullName": "Kuldeep Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 77,
					"innings": 28,
					"runs": 146,
					"ballsFaced": 221,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 12,
					"sixes": 0,
					"strikeRate": 66.0633484162896
				},
				"bowlingStatistics": {
					"matches": 77,
					"innings": 76,
					"wickets": 130,
					"overs": {
						"overs": 686.4,
						"balls": 4120
					},
					"runsConceded": 3567,
					"noBall": 0,
					"wideBall": 39,
					"maidens": 18,
					"dots": 2042,
					"sixes": 103,
					"fours": 226,
					"economy": 5.194660194174757
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 26,
					"innings": 5,
					"runs": 43,
					"ballsFaced": 49,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 23,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 87.75510204081633
				},
				"bowlingStatistics": {
					"matches": 26,
					"innings": 27,
					"wickets": 46,
					"overs": {
						"overs": 98.3,
						"balls": 591
					},
					"runsConceded": 666,
					"noBall": 0,
					"wideBall": 12,
					"maidens": 2,
					"dots": 244,
					"sixes": 31,
					"fours": 34,
					"economy": 6.761421319796955
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1c3f14d2-b58a-462b-bc15-b0be33e3ac8d",
		"fullName": "Rohit Sharma�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 24,
					"innings": 24,
					"runs": 1120,
					"ballsFaced": 1086,
					"centuries": 3,
					"halfCenturies": 7,
					"highestScore": 208,
					"fours": 102,
					"sixes": 55,
					"strikeRate": 103.13075506445672
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 51,
					"innings": 51,
					"runs": 1527,
					"ballsFaced": 1036,
					"centuries": 2,
					"halfCenturies": 10,
					"highestScore": 118,
					"fours": 135,
					"sixes": 82,
					"strikeRate": 147.3938223938224
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "572d30f9-6783-4072-84a0-ea6af4bdad53",
		"fullName": "Shubman Gill",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 21,
					"innings": 21,
					"runs": 1254,
					"ballsFaced": 1142,
					"centuries": 4,
					"halfCenturies": 5,
					"highestScore": 208,
					"fours": 142,
					"sixes": 27,
					"strikeRate": 109.80735551663747
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 6,
					"runs": 202,
					"ballsFaced": 122,
					"centuries": 1,
					"halfCenturies": 0,
					"highestScore": 126,
					"fours": 19,
					"sixes": 10,
					"strikeRate": 165.5737704918033
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "dd6271eb-e7ba-4b5a-8ff3-242612242d5d",
		"fullName": "Shreyas Iyer",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 41,
					"innings": 38,
					"runs": 1631,
					"ballsFaced": 1690,
					"centuries": 2,
					"halfCenturies": 14,
					"highestScore": 113,
					"fours": 162,
					"sixes": 32,
					"strikeRate": 96.50887573964496
				},
				"bowlingStatistics": {
					"matches": 41,
					"innings": 5,
					"wickets": 0,
					"overs": {
						"overs": 6.1,
						"balls": 37
					},
					"runsConceded": 39,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 18,
					"sixes": 2,
					"fours": 2,
					"economy": 6.324324324324325
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 48,
					"innings": 45,
					"runs": 1043,
					"ballsFaced": 767,
					"centuries": 0,
					"halfCenturies": 7,
					"highestScore": 74,
					"fours": 85,
					"sixes": 42,
					"strikeRate": 135.98435462842244
				},
				"bowlingStatistics": {
					"matches": 48,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 0.2,
						"balls": 2
					},
					"runsConceded": 2,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 1,
					"sixes": 0,
					"fours": 0,
					"economy": 6
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "601f0bc0-8d15-43ee-a7f6-3f0b764f8626",
		"fullName": "KL Rahul��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 14,
					"innings": 14,
					"runs": 655,
					"ballsFaced": 635,
					"centuries": 1,
					"halfCenturies": 6,
					"highestScore": 112,
					"fours": 45,
					"sixes": 25,
					"strikeRate": 103.14960629921259
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 8,
					"runs": 305,
					"ballsFaced": 219,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 57,
					"fours": 23,
					"sixes": 12,
					"strikeRate": 139.26940639269407
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "d8b024b3-4863-4c51-907b-19838c0ea1c3",
		"fullName": "Mohammed Siraj",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 21,
					"innings": 8,
					"runs": 27,
					"ballsFaced": 56,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 48.214285714285715
				},
				"bowlingStatistics": {
					"matches": 21,
					"innings": 21,
					"wickets": 38,
					"overs": {
						"overs": 170.4,
						"balls": 1024
					},
					"runsConceded": 788,
					"noBall": 1,
					"wideBall": 43,
					"maidens": 17,
					"dots": 678,
					"sixes": 9,
					"fours": 93,
					"economy": 4.6171875
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 1,
					"runs": 5,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 71.42857142857143
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 11,
					"overs": {
						"overs": 32,
						"balls": 192
					},
					"runsConceded": 294,
					"noBall": 2,
					"wideBall": 9,
					"maidens": 1,
					"dots": 71,
					"sixes": 10,
					"fours": 32,
					"economy": 9.1875
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "9e375d6d-e37a-4099-a864-c579ec6ba193",
		"fullName": "Umran Malik",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 3,
					"runs": 2,
					"ballsFaced": 9,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 22.22222222222222
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 7,
					"wickets": 13,
					"overs": {
						"overs": 55,
						"balls": 330
					},
					"runsConceded": 355,
					"noBall": 4,
					"wideBall": 10,
					"maidens": 2,
					"dots": 173,
					"sixes": 5,
					"fours": 45,
					"economy": 6.454545454545454
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 2,
					"runs": 5,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 250
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 11,
					"overs": {
						"overs": 23.1,
						"balls": 139
					},
					"runsConceded": 243,
					"noBall": 4,
					"wideBall": 13,
					"maidens": 0,
					"dots": 55,
					"sixes": 12,
					"fours": 25,
					"economy": 10.489208633093526
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "24e918b2-e4d7-44bd-9751-e14169d88564",
		"fullName": "KL Rahul�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 7,
					"innings": 6,
					"runs": 115,
					"ballsFaced": 167,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 55,
					"fours": 8,
					"sixes": 1,
					"strikeRate": 68.8622754491018
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 62,
					"ballsFaced": 41,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 62,
					"fours": 6,
					"sixes": 2,
					"strikeRate": 151.21951219512195
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "5e2ef462-b864-48c2-b5f0-db4c0a6df9cd",
		"fullName": "Rishabh Pant��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 22,
					"innings": 20,
					"runs": 708,
					"ballsFaced": 650,
					"centuries": 1,
					"halfCenturies": 5,
					"highestScore": 125,
					"fours": 70,
					"sixes": 24,
					"strikeRate": 108.92307692307692
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 47,
					"innings": 39,
					"runs": 716,
					"ballsFaced": 548,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 65,
					"fours": 66,
					"sixes": 26,
					"strikeRate": 130.65693430656935
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "fbb0794d-166d-4644-aa8c-b379ab40787b",
		"fullName": "Venkatesh Iyer",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 24,
					"ballsFaced": 40,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 22,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 60
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 5,
						"balls": 30
					},
					"runsConceded": 28,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 10,
					"sixes": 0,
					"fours": 2,
					"economy": 5.6
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 7,
					"runs": 133,
					"ballsFaced": 82,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 35,
					"fours": 15,
					"sixes": 5,
					"strikeRate": 162.1951219512195
				},
				"bowlingStatistics": {
					"matches": 9,
					"innings": 4,
					"wickets": 5,
					"overs": {
						"overs": 9.1,
						"balls": 55
					},
					"runsConceded": 75,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 19,
					"sixes": 3,
					"fours": 6,
					"economy": 8.181818181818182
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "c54e909e-c4a6-4bde-bfd6-f9c98f8f755a",
		"fullName": "Shardul Thakur",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 34,
					"innings": 21,
					"runs": 298,
					"ballsFaced": 271,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 50,
					"fours": 29,
					"sixes": 9,
					"strikeRate": 109.96309963099631
				},
				"bowlingStatistics": {
					"matches": 34,
					"innings": 34,
					"wickets": 50,
					"overs": {
						"overs": 254.5,
						"balls": 1529
					},
					"runsConceded": 1587,
					"noBall": 14,
					"wideBall": 61,
					"maidens": 9,
					"dots": 800,
					"sixes": 42,
					"fours": 158,
					"economy": 6.227599738391105
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 24,
					"innings": 6,
					"runs": 69,
					"ballsFaced": 38,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 22,
					"fours": 5,
					"sixes": 4,
					"strikeRate": 181.57894736842104
				},
				"bowlingStatistics": {
					"matches": 24,
					"innings": 24,
					"wickets": 33,
					"overs": {
						"overs": 84.2,
						"balls": 506
					},
					"runsConceded": 772,
					"noBall": 1,
					"wideBall": 22,
					"maidens": 0,
					"dots": 191,
					"sixes": 30,
					"fours": 81,
					"economy": 9.154150197628459
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3e0a5362-3faf-4ca9-89c7-eceff1833d64",
		"fullName": "Suryakumar Yadav",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 20,
					"innings": 18,
					"runs": 433,
					"ballsFaced": 421,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 64,
					"fours": 45,
					"sixes": 8,
					"strikeRate": 102.85035629453682
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 48,
					"innings": 46,
					"runs": 1675,
					"ballsFaced": 953,
					"centuries": 3,
					"halfCenturies": 13,
					"highestScore": 117,
					"fours": 150,
					"sixes": 96,
					"strikeRate": 175.7607555089192
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3df0242e-6270-45f9-9b3e-7c11b6c9785c",
		"fullName": "Washington Sundar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 16,
					"innings": 9,
					"runs": 233,
					"ballsFaced": 272,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 51,
					"fours": 17,
					"sixes": 6,
					"strikeRate": 85.66176470588235
				},
				"bowlingStatistics": {
					"matches": 16,
					"innings": 14,
					"wickets": 16,
					"overs": {
						"overs": 86,
						"balls": 516
					},
					"runsConceded": 435,
					"noBall": 1,
					"wideBall": 7,
					"maidens": 2,
					"dots": 273,
					"sixes": 14,
					"fours": 31,
					"economy": 5.058139534883721
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 34,
					"innings": 14,
					"runs": 107,
					"ballsFaced": 70,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 50,
					"fours": 10,
					"sixes": 6,
					"strikeRate": 152.85714285714286
				},
				"bowlingStatistics": {
					"matches": 34,
					"innings": 33,
					"wickets": 29,
					"overs": {
						"overs": 112.3,
						"balls": 675
					},
					"runsConceded": 813,
					"noBall": 0,
					"wideBall": 18,
					"maidens": 1,
					"dots": 286,
					"sixes": 34,
					"fours": 60,
					"economy": 7.226666666666667
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b5c0e00c-fc82-4f8f-971e-cc8c4aeb355f",
		"fullName": "Khaleel Ahmed",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 3,
					"runs": 9,
					"ballsFaced": 17,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 52.94117647058823
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 11,
					"wickets": 15,
					"overs": {
						"overs": 80,
						"balls": 480
					},
					"runsConceded": 465,
					"noBall": 3,
					"wideBall": 13,
					"maidens": 2,
					"dots": 262,
					"sixes": 16,
					"fours": 42,
					"economy": 5.8125
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 1,
					"runs": 1,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 13,
					"innings": 14,
					"wickets": 13,
					"overs": {
						"overs": 52,
						"balls": 312
					},
					"runsConceded": 459,
					"noBall": 0,
					"wideBall": 17,
					"maidens": 1,
					"dots": 133,
					"sixes": 14,
					"fours": 58,
					"economy": 8.826923076923077
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "24e96b6e-29f9-4427-bf8a-d74dde50ffa3",
		"fullName": "Ishan Kishan��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 5,
					"runs": 90,
					"ballsFaced": 93,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 59,
					"fours": 11,
					"sixes": 3,
					"strikeRate": 96.7741935483871
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 11,
					"innings": 11,
					"runs": 226,
					"ballsFaced": 197,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 89,
					"fours": 24,
					"sixes": 6,
					"strikeRate": 114.72081218274111
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "91028ef2-5a7c-48a3-b18e-ea51ee304f50",
		"fullName": "Deepak Chahar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 9,
					"runs": 203,
					"ballsFaced": 207,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 69,
					"fours": 17,
					"sixes": 8,
					"strikeRate": 98.06763285024155
				},
				"bowlingStatistics": {
					"matches": 13,
					"innings": 12,
					"wickets": 16,
					"overs": {
						"overs": 85,
						"balls": 510
					},
					"runsConceded": 489,
					"noBall": 4,
					"wideBall": 19,
					"maidens": 5,
					"dots": 291,
					"sixes": 9,
					"fours": 55,
					"economy": 5.752941176470588
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 24,
					"innings": 6,
					"runs": 53,
					"ballsFaced": 26,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 31,
					"fours": 4,
					"sixes": 4,
					"strikeRate": 203.84615384615384
				},
				"bowlingStatistics": {
					"matches": 24,
					"innings": 24,
					"wickets": 29,
					"overs": {
						"overs": 86,
						"balls": 516
					},
					"runsConceded": 703,
					"noBall": 2,
					"wideBall": 15,
					"maidens": 2,
					"dots": 224,
					"sixes": 29,
					"fours": 66,
					"economy": 8.174418604651162
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "449f538c-1db2-4ad9-855a-a72a59abc87f",
		"fullName": "Prasidh Krishna",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 14,
					"innings": 5,
					"runs": 2,
					"ballsFaced": 12,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 16.666666666666668
				},
				"bowlingStatistics": {
					"matches": 14,
					"innings": 14,
					"wickets": 25,
					"overs": {
						"overs": 112.2,
						"balls": 674
					},
					"runsConceded": 598,
					"noBall": 3,
					"wideBall": 16,
					"maidens": 7,
					"dots": 420,
					"sixes": 13,
					"fours": 73,
					"economy": 5.3234421364985165
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "adb812aa-a273-4f0a-8ba0-c6c588ef7595",
		"fullName": "Ishan Kishan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 13,
					"innings": 12,
					"runs": 507,
					"ballsFaced": 473,
					"centuries": 1,
					"halfCenturies": 3,
					"highestScore": 210,
					"fours": 52,
					"sixes": 21,
					"strikeRate": 107.18816067653277
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 27,
					"innings": 27,
					"runs": 653,
					"ballsFaced": 532,
					"centuries": 0,
					"halfCenturies": 4,
					"highestScore": 89,
					"fours": 71,
					"sixes": 25,
					"strikeRate": 122.74436090225564
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7e64d42a-f603-4e51-ba3d-ad906d1f3802",
		"fullName": "Deepak Hooda",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 7,
					"runs": 153,
					"ballsFaced": 189,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 33,
					"fours": 10,
					"sixes": 1,
					"strikeRate": 80.95238095238095
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 6,
					"wickets": 3,
					"overs": {
						"overs": 25,
						"balls": 150
					},
					"runsConceded": 119,
					"noBall": 0,
					"wideBall": 4,
					"maidens": 1,
					"dots": 79,
					"sixes": 3,
					"fours": 8,
					"economy": 4.76
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 21,
					"innings": 17,
					"runs": 368,
					"ballsFaced": 250,
					"centuries": 1,
					"halfCenturies": 0,
					"highestScore": 104,
					"fours": 29,
					"sixes": 18,
					"strikeRate": 147.2
				},
				"bowlingStatistics": {
					"matches": 21,
					"innings": 8,
					"wickets": 6,
					"overs": {
						"overs": 15.5,
						"balls": 95
					},
					"runsConceded": 76,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 40,
					"sixes": 1,
					"fours": 3,
					"economy": 4.8
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6b995472-b163-494d-bf03-98dd68af0aa0",
		"fullName": "Shikhar Dhawan�(c)",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 12,
					"runs": 424,
					"ballsFaced": 530,
					"centuries": 0,
					"halfCenturies": 4,
					"highestScore": 97,
					"fours": 49,
					"sixes": 6,
					"strikeRate": 80
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 3,
					"runs": 86,
					"ballsFaced": 79,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 46,
					"fours": 9,
					"sixes": 1,
					"strikeRate": 108.86075949367088
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "72049441-4639-4e8b-96e8-5fd4c9034a17",
		"fullName": "Ruturaj Gaikwad",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 19,
					"ballsFaced": 42,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 19,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 45.23809523809524
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 9,
					"innings": 8,
					"runs": 135,
					"ballsFaced": 109,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 57,
					"fours": 13,
					"sixes": 5,
					"strikeRate": 123.85321100917432
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b5598f1f-c967-493f-b1df-38b51c81fd91",
		"fullName": "Sanju Samson��",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 9,
					"runs": 294,
					"ballsFaced": 277,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 86,
					"fours": 21,
					"sixes": 15,
					"strikeRate": 106.13718411552347
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 4,
					"innings": 4,
					"runs": 31,
					"ballsFaced": 30,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 18,
					"fours": 3,
					"sixes": 1,
					"strikeRate": 103.33333333333333
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ef06418f-b50f-4a7d-a701-ff8897b21d48",
		"fullName": "Avesh Khan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 2,
					"runs": 13,
					"ballsFaced": 18,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 10,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 72.22222222222223
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 3,
					"overs": {
						"overs": 35.3,
						"balls": 213
					},
					"runsConceded": 214,
					"noBall": 2,
					"wideBall": 6,
					"maidens": 2,
					"dots": 118,
					"sixes": 5,
					"fours": 24,
					"economy": 6.028169014084507
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 15,
					"innings": 3,
					"runs": 10,
					"ballsFaced": 7,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 142.85714285714286
				},
				"bowlingStatistics": {
					"matches": 15,
					"innings": 14,
					"wickets": 13,
					"overs": {
						"overs": 46.2,
						"balls": 278
					},
					"runsConceded": 422,
					"noBall": 3,
					"wideBall": 11,
					"maidens": 1,
					"dots": 125,
					"sixes": 21,
					"fours": 41,
					"economy": 9.107913669064748
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "1209a285-4c59-45f0-bce1-e9a572755e72",
		"fullName": "Ravi Bishnoi",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 4,
					"ballsFaced": 2,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 4,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 200
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 69,
					"noBall": 1,
					"wideBall": 4,
					"maidens": 0,
					"dots": 21,
					"sixes": 1,
					"fours": 7,
					"economy": 8.625
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 2,
					"runs": 10,
					"ballsFaced": 4,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 250
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 10,
					"wickets": 16,
					"overs": {
						"overs": 38.4,
						"balls": 232
					},
					"runsConceded": 274,
					"noBall": 3,
					"wideBall": 21,
					"maidens": 0,
					"dots": 110,
					"sixes": 10,
					"fours": 19,
					"economy": 7.086206896551724
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "7ce6294a-6aa0-410d-8868-2fe0cff5ce3b",
		"fullName": "Rishabh Pant",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 29,
					"innings": 26,
					"runs": 865,
					"ballsFaced": 811,
					"centuries": 1,
					"halfCenturies": 5,
					"highestScore": 125,
					"fours": 90,
					"sixes": 26,
					"strikeRate": 106.65844636251542
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 64,
					"innings": 56,
					"runs": 987,
					"ballsFaced": 781,
					"centuries": 0,
					"halfCenturies": 3,
					"highestScore": 65,
					"fours": 86,
					"sixes": 37,
					"strikeRate": 126.3764404609475
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "cda12060-b325-4421-8394-4733dd542a0f",
		"fullName": "Shahbaz Ahmed",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 4,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 3,
					"overs": {
						"overs": 26,
						"balls": 156
					},
					"runsConceded": 125,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 75,
					"sixes": 1,
					"fours": 11,
					"economy": 4.8076923076923075
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "8e0d09f6-6caf-498d-9fd2-b8af29cee25d",
		"fullName": "Sanju Samson",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 11,
					"innings": 10,
					"runs": 330,
					"ballsFaced": 315,
					"centuries": 0,
					"halfCenturies": 2,
					"highestScore": 86,
					"fours": 25,
					"sixes": 15,
					"strikeRate": 104.76190476190476
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 17,
					"innings": 16,
					"runs": 301,
					"ballsFaced": 225,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 77,
					"fours": 23,
					"sixes": 13,
					"strikeRate": 133.77777777777777
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "28f65177-a15c-47f9-89df-65d516077f91",
		"fullName": "Arshdeep Singh",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 1,
					"runs": 9,
					"ballsFaced": 9,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 0,
					"sixes": 1,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 2,
					"wickets": 0,
					"overs": {
						"overs": 13.1,
						"balls": 79
					},
					"runsConceded": 89,
					"noBall": 1,
					"wideBall": 2,
					"maidens": 1,
					"dots": 45,
					"sixes": 3,
					"fours": 10,
					"economy": 6.7594936708860756
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 26,
					"innings": 5,
					"runs": 6,
					"ballsFaced": 10,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 60
				},
				"bowlingStatistics": {
					"matches": 26,
					"innings": 26,
					"wickets": 41,
					"overs": {
						"overs": 86.5,
						"balls": 521
					},
					"runsConceded": 729,
					"noBall": 15,
					"wideBall": 24,
					"maidens": 1,
					"dots": 236,
					"sixes": 21,
					"fours": 82,
					"economy": 8.395393474088293
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "b553f59e-c63c-4b6b-a797-1f8fb32d8465",
		"fullName": "Kuldeep Sen",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 2,
					"ballsFaced": 4,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 2,
					"overs": {
						"overs": 5,
						"balls": 30
					},
					"runsConceded": 37,
					"noBall": 0,
					"wideBall": 3,
					"maidens": 0,
					"dots": 16,
					"sixes": 3,
					"fours": 1,
					"economy": 7.4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "60a32eff-c8a9-43e9-9dff-f8c84376e7fc",
		"fullName": "Prithvi Shaw",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 6,
					"runs": 189,
					"ballsFaced": 166,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 49,
					"fours": 32,
					"sixes": 2,
					"strikeRate": 113.855421686747
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "70fe45cb-250e-4ae2-86ca-0980ef78cec5",
		"fullName": "Krunal Pandya",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 4,
					"runs": 130,
					"ballsFaced": 128,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 58,
					"fours": 11,
					"sixes": 2,
					"strikeRate": 101.5625
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 5,
					"wickets": 2,
					"overs": {
						"overs": 38,
						"balls": 228
					},
					"runsConceded": 223,
					"noBall": 0,
					"wideBall": 6,
					"maidens": 1,
					"dots": 103,
					"sixes": 11,
					"fours": 8,
					"economy": 5.868421052631579
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 18,
					"innings": 10,
					"runs": 124,
					"ballsFaced": 95,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 26,
					"fours": 8,
					"sixes": 6,
					"strikeRate": 130.52631578947367
				},
				"bowlingStatistics": {
					"matches": 18,
					"innings": 19,
					"wickets": 15,
					"overs": {
						"overs": 68.2,
						"balls": 410
					},
					"runsConceded": 554,
					"noBall": 0,
					"wideBall": 22,
					"maidens": 1,
					"dots": 127,
					"sixes": 29,
					"fours": 23,
					"economy": 8.107317073170732
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "61ecc222-109f-4f4f-9484-0be228b13ce2",
		"fullName": "KL Rahul�(c)�",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 8,
					"ballsFaced": 10,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 8,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 80
				},
				"bowlingStatistics": null
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "898cea8b-a86f-462a-a7d7-92fc635bb952",
		"fullName": "T Natarajan",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 0,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 2,
					"wickets": 3,
					"overs": {
						"overs": 20,
						"balls": 120
					},
					"runsConceded": 143,
					"noBall": 1,
					"wideBall": 11,
					"maidens": 1,
					"dots": 59,
					"sixes": 4,
					"fours": 14,
					"economy": 7.15
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 4,
					"innings": 4,
					"wickets": 7,
					"overs": {
						"overs": 16,
						"balls": 96
					},
					"runsConceded": 122,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 30,
					"sixes": 2,
					"fours": 10,
					"economy": 7.625
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "3e4f910e-aa05-4165-9eae-a5aba4abf6b6",
		"fullName": "Nitish Rana",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 7,
					"ballsFaced": 14,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 7,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 50
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 3,
						"balls": 18
					},
					"runsConceded": 10,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 9,
					"sixes": 0,
					"fours": 0,
					"economy": 3.3333333333333335
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 2,
					"runs": 15,
					"ballsFaced": 27,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 55.55555555555556
				},
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "6e1d5920-cd04-4b4c-b660-0013f521ac2c",
		"fullName": "Krishnappa Gowtham",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 2,
					"ballsFaced": 3,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 2,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 66.66666666666667
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 49,
					"noBall": 0,
					"wideBall": 2,
					"maidens": 0,
					"dots": 25,
					"sixes": 0,
					"fours": 6,
					"economy": 6.125
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "a2a764ce-6bf8-4eef-bde8-0ff74a91b203",
		"fullName": "Rahul Chahar",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 13,
					"ballsFaced": 25,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 13,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 52
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 3,
					"overs": {
						"overs": 10,
						"balls": 60
					},
					"runsConceded": 54,
					"noBall": 2,
					"wideBall": 0,
					"maidens": 0,
					"dots": 31,
					"sixes": 0,
					"fours": 6,
					"economy": 5.4
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 6,
					"innings": 1,
					"runs": 5,
					"ballsFaced": 5,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 100
				},
				"bowlingStatistics": {
					"matches": 6,
					"innings": 6,
					"wickets": 7,
					"overs": {
						"overs": 22,
						"balls": 132
					},
					"runsConceded": 167,
					"noBall": 1,
					"wideBall": 4,
					"maidens": 0,
					"dots": 50,
					"sixes": 8,
					"fours": 11,
					"economy": 7.590909090909091
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "ec222714-6eb1-44d2-980c-38592b6e2da5",
		"fullName": "Navdeep Saini",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 8,
					"innings": 5,
					"runs": 107,
					"ballsFaced": 137,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 45,
					"fours": 9,
					"sixes": 3,
					"strikeRate": 78.10218978102189
				},
				"bowlingStatistics": {
					"matches": 8,
					"innings": 8,
					"wickets": 6,
					"overs": {
						"overs": 70,
						"balls": 420
					},
					"runsConceded": 481,
					"noBall": 4,
					"wideBall": 11,
					"maidens": 0,
					"dots": 203,
					"sixes": 11,
					"fours": 54,
					"economy": 6.871428571428571
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 10,
					"innings": 3,
					"runs": 12,
					"ballsFaced": 11,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 11,
					"fours": 2,
					"sixes": 0,
					"strikeRate": 109.0909090909091
				},
				"bowlingStatistics": {
					"matches": 10,
					"innings": 9,
					"wickets": 13,
					"overs": {
						"overs": 32.5,
						"balls": 197
					},
					"runsConceded": 235,
					"noBall": 1,
					"wideBall": 6,
					"maidens": 1,
					"dots": 104,
					"sixes": 10,
					"fours": 25,
					"economy": 7.157360406091371
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "85699dd2-77fe-45f8-9897-6b0501fb87a9",
		"fullName": "Chetan Sakariya",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 0,
					"ballsFaced": 1,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 0,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 0
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 2,
					"overs": {
						"overs": 8,
						"balls": 48
					},
					"runsConceded": 34,
					"noBall": 2,
					"wideBall": 1,
					"maidens": 0,
					"dots": 32,
					"sixes": 0,
					"fours": 4,
					"economy": 4.25
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 2,
					"innings": 1,
					"runs": 5,
					"ballsFaced": 9,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 5,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 55.55555555555556
				},
				"bowlingStatistics": {
					"matches": 2,
					"innings": 1,
					"wickets": 1,
					"overs": {
						"overs": 3.4,
						"balls": 22
					},
					"runsConceded": 34,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 8,
					"sixes": 0,
					"fours": 5,
					"economy": 9.272727272727273
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "e53acf48-e46f-487a-95b2-48dcb9ad9b99",
		"fullName": "Mayank Agarwal",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 5,
					"innings": 5,
					"runs": 86,
					"ballsFaced": 83,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 32,
					"fours": 12,
					"sixes": 1,
					"strikeRate": 103.6144578313253
				},
				"bowlingStatistics": {
					"matches": 5,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 1,
						"balls": 6
					},
					"runsConceded": 10,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 2,
					"sixes": 0,
					"fours": 2,
					"economy": 10
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": null
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "62daee5d-c598-4606-b98a-3977cea0b724",
		"fullName": "Shivam Dube",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 1,
					"innings": 1,
					"runs": 9,
					"ballsFaced": 6,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 9,
					"fours": 1,
					"sixes": 0,
					"strikeRate": 150
				},
				"bowlingStatistics": {
					"matches": 1,
					"innings": 1,
					"wickets": 0,
					"overs": {
						"overs": 7.5,
						"balls": 47
					},
					"runsConceded": 68,
					"noBall": 0,
					"wideBall": 0,
					"maidens": 0,
					"dots": 13,
					"sixes": 1,
					"fours": 9,
					"economy": 8.680851063829786
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 12,
					"innings": 9,
					"runs": 105,
					"ballsFaced": 77,
					"centuries": 0,
					"halfCenturies": 1,
					"highestScore": 54,
					"fours": 7,
					"sixes": 6,
					"strikeRate": 136.36363636363637
				},
				"bowlingStatistics": {
					"matches": 12,
					"innings": 11,
					"wickets": 5,
					"overs": {
						"overs": 21.3,
						"balls": 129
					},
					"runsConceded": 216,
					"noBall": 2,
					"wideBall": 2,
					"maidens": 0,
					"dots": 37,
					"sixes": 13,
					"fours": 16,
					"economy": 10.046511627906977
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	},
	{
		"playerUuid": "fdc87cb0-3978-4f7a-ad0e-891292d38aab",
		"fullName": "Siddarth Kaul",
		"dateOfBirth": "0001-01-01T00:00:00+00:00",
		"teamName": "India",
		"birthPlace": "Chennai",
		"careerDetails": {
			"testCareer": null,
			"odiCareer": {
				"debutDetails": null,
				"battingStatistics": {
					"matches": 3,
					"innings": 2,
					"runs": 1,
					"ballsFaced": 3,
					"centuries": 0,
					"halfCenturies": 0,
					"highestScore": 1,
					"fours": 0,
					"sixes": 0,
					"strikeRate": 33.333333333333336
				},
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 0,
					"overs": {
						"overs": 27,
						"balls": 162
					},
					"runsConceded": 179,
					"noBall": 0,
					"wideBall": 1,
					"maidens": 0,
					"dots": 72,
					"sixes": 6,
					"fours": 16,
					"economy": 6.62962962962963
				}
			},
			"t20Career": {
				"debutDetails": null,
				"battingStatistics": null,
				"bowlingStatistics": {
					"matches": 3,
					"innings": 3,
					"wickets": 4,
					"overs": {
						"overs": 9.4,
						"balls": 58
					},
					"runsConceded": 84,
					"noBall": 1,
					"wideBall": 1,
					"maidens": 0,
					"dots": 25,
					"sixes": 5,
					"fours": 6,
					"economy": 8.689655172413794
				}
			}
		},
		"imageSrc": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG/330px-Shri_Virat_Kohli_for_Cricket%2C_in_a_glittering_ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_September_25%2C_2018_%28cropped%29.JPG"
	}
]