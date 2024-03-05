import React from "react";


export interface NavigationItem {
    name: string;
    url: string;
    icon: string;
}


export class Navbar extends React.Component {

    navItems: NavigationItem[] = [
        {
            name: "Home",
            url: "/",
            icon: 'ai-home'
        },
        {
            name: "Location",
            url: "/location",
            icon: 'ai-location'
        },
        {
            name: "Service",
            url: "/service",
            icon: "ai-network"
        },
        {
            name: "My rentals",
            url: "/resa",
            icon: "ai-cart"
        },
        {
            name: "Theme",
            url: "#",
            icon: "ai-flashlight"
        },
        {
            name: "Log in / out",
            url: "/login",
            icon: "ai-lock-on"
        }
    ];


    render() {
        return (
            <div className="navbar">
                <ul>
                    {this.navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} onClick={() => {
                                if (item.name === "Theme") {
                                    if (document.body.style.backgroundColor === "black") {
                                        document.body.style.backgroundColor = "#e1e1ff";
                                    } else {
                                        document.body.style.backgroundColor = "black";
                                    }
                                }
                            }}>
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}