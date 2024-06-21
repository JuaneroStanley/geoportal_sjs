import "./Services.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, List } from "@mui/material";
import Link from "next/link";
import order_img from "../global/order.png";
import history_img from "../global/history.png";
import track_img from "../global/track.png";
import list_img from "../global/list.png";
import Image from "next/image";

const cardItems = [
  {
    name: "New Order",
    desctiption: "Order food from your favorite restaurant",
    image: order_img,
  },
  {
    name: "Track Order",
    desctiption: "Track your order in real time",
    image: track_img,
  },
  {
    name: "Order History",
    desctiption: "View your order history",
    image: history_img,
  },
  {
    name: "Restaurant List",
    desctiption: "View the list of restaurants",
    image: list_img,
  },
];

function Page() {
  return (
    <div className="services_everything">
      <div className="services_topbanner">
        <GlobalTopBanner />
      </div>
      <div className="services_midbanner">
        <div className="services_title">
          <div className="services_title_left">Our</div>
          <div className="services_title_right">&nbsp;Services</div>
        </div>
        <div className="services_midbanner_cards">
          {cardItems.map((cardItems, index) => (
            <Card key={index} sx={{ width: 250 }} className="services_card">
              <CardActionArea
                component={Link}
                href={"/" + cardItems.name.toLowerCase().replace(/ /g, "")}
              >
                <Image src={cardItems.image} alt="track" className="card_img" />
                <Divider color={"D2A124"} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cardItems.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cardItems.desctiption}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
