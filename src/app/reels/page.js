"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Button from "../_common/button/page";

const reelsData = [
  {
    kind: "youtube#searchListResponse",
    etag: "63ZxFDQQvkxyxk8pqWutvFljYaE",
    nextPageToken: "CAoQAA",
    regionCode: "IN",
    pageInfo: {
      totalResults: 1000000,
      resultsPerPage: 10,
    },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "bl_uvnP8-VfMt3w22Kwwf8GFuzk",
        id: {
          kind: "youtube#video",
          videoId: "pEQtg260DTY",
        },
        snippet: {
          publishedAt: "2024-09-20T08:08:54Z",
          channelId: "UCeKhznqeLcRFHqRXpcu3w3g",
          title:
            "Social test: Why is EVERYONE SO NICE in Paris?😍 LA ELVÍRA #shorts #trending",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/pEQtg260DTY/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/pEQtg260DTY/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/pEQtg260DTY/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "LA ELVÍRA",
          liveBroadcastContent: "none",
          publishTime: "2024-09-20T08:08:54Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "mJ4jVhCN6dYQvCgqs_RM9rwzHPA",
        id: {
          kind: "youtube#video",
          videoId: "gJnF0UaZoR4",
        },
        snippet: {
          publishedAt: "2024-09-16T15:28:39Z",
          channelId: "UCl4MrHzYAWb6c6Jy1lX1niw",
          title:
            "#song #rap #music #tamilsong #newsong #newvideo #shorts #shortvideo #shortsviral #trending #viral",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/gJnF0UaZoR4/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/gJnF0UaZoR4/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/gJnF0UaZoR4/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Deep k prank",
          liveBroadcastContent: "none",
          publishTime: "2024-09-16T15:28:39Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "uFIggduPxRznijDQvy-XO0rQsfI",
        id: {
          kind: "youtube#video",
          videoId: "RPMttVDdX1o",
        },
        snippet: {
          publishedAt: "2024-12-14T08:24:05Z",
          channelId: "UCvYq_GiAu_UupoP1Bd6QTAg",
          title:
            "Trending Pookie dance 🌸 #trending #pookie #college  #dragonballdance #explore #fyp #love",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/RPMttVDdX1o/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/RPMttVDdX1o/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/RPMttVDdX1o/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "3 MAC",
          liveBroadcastContent: "none",
          publishTime: "2024-12-14T08:24:05Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "3CDHJ7bNFlurSRfuua15XMxoR-g",
        id: {
          kind: "youtube#video",
          videoId: "_Va4pl3eVik",
        },
        snippet: {
          publishedAt: "2023-07-21T09:30:17Z",
          channelId: "UCX-i7kxE80whWDGaIOW1-6Q",
          title:
            "Your hardwork will answer 😎🔥 #attitude #gym #trending #shorts #fitness",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/_Va4pl3eVik/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/_Va4pl3eVik/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/_Va4pl3eVik/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Shahanwazgour",
          liveBroadcastContent: "none",
          publishTime: "2023-07-21T09:30:17Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "I8JeqHpPJX5_hB6l4e2S-NoTdxk",
        id: {
          kind: "youtube#video",
          videoId: "zVMZTuoSR1c",
        },
        snippet: {
          publishedAt: "2025-02-12T03:09:01Z",
          channelId: "UC4DYc-KJhAmdKmJG1cRUuVw",
          title:
            "Stop criticise them😢| editimax | #trending #ranveerallahbadia  #samayraina #edits #indiasgotlatent",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/zVMZTuoSR1c/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/zVMZTuoSR1c/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/zVMZTuoSR1c/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "tMaX cinema ",
          liveBroadcastContent: "none",
          publishTime: "2025-02-12T03:09:01Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "jDZequVsq2Nm_GdGA8QfHJQkVUo",
        id: {
          kind: "youtube#video",
          videoId: "n0m6O9jVDaY",
        },
        snippet: {
          publishedAt: "2025-01-21T23:33:45Z",
          channelId: "UCqnQgoqB_15D53En__eV80w",
          title:
            "Monalisa viral girl 🌹🔥💝👌 #prayagraj  #kumbh  #monalisa  #viral #trending  #kumbhmela2025",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/n0m6O9jVDaY/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/n0m6O9jVDaY/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/n0m6O9jVDaY/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Neha Yadav Official 31",
          liveBroadcastContent: "none",
          publishTime: "2025-01-21T23:33:45Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "R6cKxpVwWLvpQB9ci1a2EKgAxGk",
        id: {
          kind: "youtube#video",
          videoId: "xopmLphxn18",
        },
        snippet: {
          publishedAt: "2024-08-26T01:18:16Z",
          channelId: "UCoVm656tzLlPISfw67BRXVA",
          title:
            "💥wait for comment😂என்னவா இருக்கும்⁉️#funny #comedy #trending #shortsfeed #shorts #laugh #reaction",
          description:
            "wait for comment  என்னவா இருக்கும்⁉️ #trending #funny #viralvideo #comedy #chillpannumaapii #trollvideo ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/xopmLphxn18/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/xopmLphxn18/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/xopmLphxn18/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Chill pannu maapii",
          liveBroadcastContent: "none",
          publishTime: "2024-08-26T01:18:16Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "_KNIAitSZyRPv45OfYkc-qhYoRk",
        id: {
          kind: "youtube#video",
          videoId: "3FB46XpztCc",
        },
        snippet: {
          publishedAt: "2024-12-30T12:39:00Z",
          channelId: "UCMWv9WrCkZJcxzsOWeZfEkg",
          title:
            "New trend 🤳 that’s y we tried it with ma kutties🫂😍 #dragonball #trending #shorts",
          description:
            "withlovenagarajsangeetha #shorts #trend #newtrend #dragonball. Follow us on here - Nagaraj ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/3FB46XpztCc/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/3FB46XpztCc/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/3FB46XpztCc/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "With Love Nagaraj Sangeetha",
          liveBroadcastContent: "none",
          publishTime: "2024-12-30T12:39:00Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "CgP4OPH_1gmvROk7ydPYgz5UA9M",
        id: {
          kind: "youtube#video",
          videoId: "gLfRXvpmLYU",
        },
        snippet: {
          publishedAt: "2025-02-23T09:01:00Z",
          channelId: "UCcN7XoyZ_nnEyyOXoI2VZNQ",
          title:
            "Surajactor new shorts  / #surajactor #shorts #shortsfeed #shorts #trending #viralvideo",
          description:
            "supriti #surajactor #trending #shortsfeed #viralvideo #shortsvideo #vlog #bts #shortsviral #suprit.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/gLfRXvpmLYU/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/gLfRXvpmLYU/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/gLfRXvpmLYU/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Suraj Actor Vlog",
          liveBroadcastContent: "none",
          publishTime: "2025-02-23T09:01:00Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "MZd4P4K1o4HLp_HR40v58_CB-xg",
        id: {
          kind: "youtube#video",
          videoId: "Hf5NE-wqKBI",
        },
        snippet: {
          publishedAt: "2024-09-22T08:07:08Z",
          channelId: "UCPGctOV_F827A944gzqEe2A",
          title: "Manasilayo😍 #trending",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/Hf5NE-wqKBI/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/Hf5NE-wqKBI/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/Hf5NE-wqKBI/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Neerutty Chinnutty",
          liveBroadcastContent: "none",
          publishTime: "2024-09-22T08:07:08Z",
        },
      },
    ],
  },
];

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchReels = async (searchString) => {
    const res = await fetch(`/api/reels?searchString=${searchString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    // setReels(data.items);
  };

  const handleScroll = (direction) => {
    setCurrentReel((prev) => {
      if (direction === "up" && prev > 0) return prev - 1;
      if (direction === "down" && prev < reelsData.length - 1) return prev + 1;
      return prev;
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {reelsData.map((reel, index) => (
        <motion.video
          key={reel.id}
          src={reel.url}
          autoPlay={isPlaying}
          muted={isMuted}
          loop
          className={`absolute top-0 left-0 w-full h-full object-cover`}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentReel === index ? 1 : 0 }}
          exit={{ opacity: 0 }}
        />
      ))}
      <div className="absolute bottom-10 right-4 flex flex-col space-y-3">
        <Button value={"M"} />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        onWheel={(e) => handleScroll(e.deltaY > 0 ? "down" : "up")}
      />
    </div>
  );
};

export default Reels;
