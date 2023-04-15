import React, { Component } from "react";

import Newsitems from "./Newsitems";

export default class Newsbox extends Component {
  articles = [
    {
      source: {
        id: "the-times-of-india",
        name: "The Times of India",
      },
      author: "TIMESOFINDIA.COM",
      title:
        "IPL 2023, PBKS vs GT: I think we can take more risks in middle overs, says Hardik Pandya - Indiatimes.com",
      description:
        "Cricket News: Gujarat Titans captain Hardik Pandya on Thursday said his batters need to be a bit more aggressive in the middle overs in the upcoming Indian Premier",
      url: "https://timesofindia.indiatimes.com/sports/cricket/ipl/top-stories/ipl-2023-pbks-vs-gt-i-think-we-can-take-more-risks-in-middle-overs-says-hardik-pandya/articleshow/99480525.cms",
      urlToImage:
        "https://static.toiimg.com/thumb/msid-99480591,width-1070,height-580,imgsize-41474,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2023-04-14T03:09:00Z",
      content:
        "Kagiso Rabada scripts history, becomes fastest to take 100 IPL wicketsPunjab Kings paceman Kagiso Rabada scripted history on Thursday as he became the fastest bowler to take 100 IPL wickets during th… [+65 chars]",
    },
    {
      source: {
        id: null,
        name: "Hindustan Times",
      },
      author: "HT Sports Desk",
      title:
        "Gill's epic 'love story' remark after Tewatia's bold shot with 4 needed off 2 - Hindustan Times",
      description:
        "Bishop was mighty impressed with Gill, who dropped an epic 'love story' remark after Tewatia guided GT to a thrilling win over PBKS in IPL 2023. | Cricket",
      url: "https://www.hindustantimes.com/cricket/rahul-tewatia-and-kings-xi-is-shubman-gill-drops-epic-love-story-remark-after-gt-star-hits-winning-runs-against-punjab-kings-gt-vs-pbks-ipl-2023-ian-bishop-101681414369127.html",
      urlToImage:
        "https://www.hindustantimes.com/ht-img/img/2023/04/13/1600x900/Collage_Maker-14-Apr-2023-01-28-AM-7496_1681416016428_1681416024330_1681416024330.jpg",
      publishedAt: "2023-04-14T01:50:37Z",
      content:
        "Sam Curran's death-bowling heroics failed to produce another final-ball thriller in the Indian Premier League (IPL) 2023 on Thursday as Rahul Tewatia held his nerve and finished things off in style f… [+2494 chars]",
    },
    {
      source: {
        id: null,
        name: "NDTV News",
      },
      author: null,
      title:
        "Goa Police Notice To Arvind Kejriwal For Poll Posters On Public Property - NDTV",
      description:
        "NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News",
      url: "https://www.ndtv.com/",
      urlToImage: "https://cdn.ndtv.com/common/images/ogndtv.png",
      publishedAt: "2023-04-13T17:34:50Z",
      content: null,
    },
  ];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
    };
  }

  render() {
    return (
      <div className="container">
        <h2 className="my-3 ">Highlights</h2>
        <div className="container my-4">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title.slice(0, 40)}
                    description={element.description.slice(0, 80)}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
