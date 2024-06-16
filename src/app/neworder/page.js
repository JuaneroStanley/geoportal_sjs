"use client";
import "./NewOrder.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  CardActionArea,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
} from "@mui/material";
import OrderBrowse from "./OrderBrowse";
import React from "react";
import mcdonalds_img from "./mcdonald.png";
import wendys_img from "./wendys.png";
import burgerking_img from "./burgerking.png";
import tacobell_img from "./tacobell.png";
import Image from "next/image";

const restaurants = [
  {
    id: 0,
    name: "McDonalds",
    address: "1234 Main St",
    location: [21.3, 52.3],
    rating: 2.5,
    desctiption: "Fast Food",
    image: mcdonalds_img,
  },
  {
    id: 1,
    name: "Burger King",
    address: "1234 Main St",
    location: [21.3, 52.4],
    rating: 1.5,
    desctiption: "Fast Food",
    image: burgerking_img,
  },
  {
    id: 2,
    name: "Wendys",
    address: "1234 Main St",
    location: [21.3, 52.5],
    rating: 3.5,
    desctiption: "Fast Food",
    image: wendys_img,
  },
  {
    id: 3,
    name: "Taco Bell",
    address: "1234 Main St",
    location: [21.3, 52.6],
    rating: 4.5,
    desctiption: "Fast Food",
    Image: tacobell_img,
  },
];

const isOrder = false;
function NewOrder() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="neworder_everything">
      <div className="neworder_topbanner">
        <GlobalTopBanner />
      </div>
      <div className="neworder_midbanner">
        <div className="neworder_map"></div>
        <div className="neworder_right">
          <div className="neworder_list_wrapper">
            <List
              sx={{
                width: "100%",
                height: "95%",
                bgcolor: "background.secondary",
              }}
            >
              {restaurants.map((restaurant, index) => (
                <ListItem alignItems="flex-start" key={restaurant.id}>
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={restaurant.name} sx={{ bgcolor: "white" }}>
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={restaurant.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {restaurant.description}
                            <Rating
                              name="read-only"
                              value={restaurant.rating}
                              precision={0.1}
                              readOnly={true}
                            />{" "}
                          </Typography>
                          <Typography>
                            {restaurant.desctiption +
                              " — " +
                              restaurant.address}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
          <Button
            className="neworder_button"
            variant="contained"
            //onClick={(event) => handleListItemClick(event, -1)}
          >
            Zamów
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
