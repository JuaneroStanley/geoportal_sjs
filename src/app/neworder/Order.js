import React from "react";
import { menu } from "../global/data";
import { IconButton, Stack } from "@mui/material";
import "./Order.css";
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
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
export default function Order({ restaurantId, onBackClick }) {
  const [menuData, setMenuData] = React.useState(null);
  const [cart, setCart] = React.useState({});
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    setMenuData(menu[restaurantId]);
  }, [restaurantId]);

  React.useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    let newTotal = 0;
    Object.entries(cart).forEach(([itemId, count]) => {
      const menuItem = menuData.find((item) => item.id === parseInt(itemId));
      if (menuItem) {
        newTotal += menuItem.price * count;
      }
    });
    setTotal(newTotal.toFixed(2));
  };
  if (!menuData) {
    return <div>Loading menu...</div>;
  }
  const addToCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId]) {
        newCart[itemId] += 1;
      } else {
        newCart[itemId] = 1;
      }
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const deleteFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  return (
    <div>
      <div className="order_new_wrapper">
        <div className="order_menu">
          <Stack spacing={2}>
            {menuData.map((item, key) => (
              <div key={key} className="menu_item">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <IconButton
                  color="primary"
                  aria-label="add to cart"
                  size="large"
                  onClick={() => addToCart(item.id)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            ))}
          </Stack>
        </div>
        <div className="order_cart">
          <div className="cart_list_wrapper">
            <List
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.secondary",
                overflow: "auto",
              }}
            >
              {Object.entries(cart).map(([itemId, count]) => {
                const menuItem = menuData.find(
                  (item) => item.id === parseInt(itemId)
                );
                if (!menuItem) return null;
                return (
                  <ListItem
                    alignItems="flex-start"
                    key={itemId}
                    sx={{
                      borderBottom: "2px solid #d2a124",
                    }}
                  >
                    <ListItemText
                      primary={menuItem.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            ${menuItem.price} x {count}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <IconButton
                      color="primary"
                      aria-label="add"
                      size="large"
                      onClick={() => addToCart(itemId)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="remove"
                      size="large"
                      onClick={() => removeFromCart(itemId)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="delete"
                      size="large"
                      onClick={() => deleteFromCart(itemId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="cart_total_wrapper">
            <div className="cart_total">Total: {total} zł</div>
          </div>
          <Button
            className="neworder_button"
            variant="contained"
            color="primary"
            style={{ fontSize: "26px" }}
          >
            Place Order
          </Button>
          <Button
            className="neworder_button"
            variant="contained"
            color="primary"
            style={{ fontSize: "26px" }}
            sx={{ marginTop: "10px" }}
            onClick={onBackClick}
          >
            Wróć
          </Button>
        </div>
      </div>
    </div>
  );
}
