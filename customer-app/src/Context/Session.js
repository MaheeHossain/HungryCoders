import {useHistory} from "react-router-dom";

const Session = () => {
    const history = useHistory();

    const getUser = () => {
        if (sessionStorage.getItem("user") === null || sessionStorage.getItem("user") === 'undefined') {
            return null;
        }
        return JSON.parse(sessionStorage.getItem("user"));
    }

    const getCart = () => {
        if (cartEmpty()) {
            return null;
        }
        return JSON.parse(sessionStorage.getItem("cart"));
    }

    const getVan = () => {
        if (vanEmpty()) {
            console.log("a")
            return null;
        }
        console.log("b")
        return JSON.parse(sessionStorage.getItem("van"));
    }

    const login = u => {
        sessionStorage.setItem("currentOrders", JSON.stringify([]));
        sessionStorage.setItem("user", JSON.stringify(u));
    }

    const vendorlogin = u => {
        sessionStorage.setItem("user", JSON.stringify(u));
        //history.push('/vendorhome')
    }

    const logout = () => {
        sessionStorage.setItem("user", undefined);
        sessionStorage.setItem("van", undefined);
        history.push('/home')
    }

    const vendorlogout = () => {
        sessionStorage.setItem("user", undefined);
        sessionStorage.setItem("van", undefined);
        history.push('/vendorlogin')
    }

    const isLoggedIn = () => {
        return !(sessionStorage.getItem("user") === null || sessionStorage.getItem("user") === 'undefined');
    }

    const setCart = u => {
        sessionStorage.setItem("cart", JSON.stringify(u));
    }

    const cleanCart = () => {
        sessionStorage.setItem("cart", JSON.stringify([]));
    }

    const cartEmpty = () => {
        return (sessionStorage.getItem("cart") === null || sessionStorage.getItem("cart") === 'undefined' || sessionStorage.getItem("cart") == undefined);
    }

    const createOrder = (orderId) => {
      let orders = JSON.parse(sessionStorage.getItem("currentOrders"));
      orders.append({orderId: new Date()});
      sessionStorage.setItem("currentOrders", JSON.stringify(orders));
    }

    const getOrderTime = (orderId) => {
      let orders = JSON.parse(sessionStorage.getItem("currentOrders"));
      orders.filter(function (orders) {
        return orders[orderId] !== null || orders[orderId] !== "undefined";
      });
    }

    const setVan = u => {   
        sessionStorage.setItem("van", JSON.stringify(u));
    }

    const cleanVan = () => {
        sessionStorage.setItem("van", undefined);
    }
    const vanEmpty = () => {
        return (sessionStorage.getItem("van") === null || sessionStorage.getItem("van") === 'undefined' || sessionStorage.getItem("van") === undefined);
    }

    const values = {
        getUser,
        getCart,
        getVan,
        login,
        vendorlogin,
        logout,
        vendorlogout,
        isLoggedIn,
        setCart,
        cleanCart,
        cartEmpty,
        createOrder,
        getOrderTime,
        setVan,
        cleanVan,
        vanEmpty
    }

    return values;
}

export default Session;
