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
            name: "User",
            url: "/user",
            icon: 'ai-people-multiple'
        },
        {
            name: "Location",
            url: "/location",
            icon: 'ai-book-close'
        },
        {
            name: "Service",
            url: "/service",
            icon: "ai-cart"
        },
        {
            name: "Langues",
            url: "/language",
            icon: "ai-language"
        },
        {
            name: "Messages",
            url: "/message",
            icon: "ai-chat-bubble"
        },
        {
            name: "Ticket",
            url: "/ticket",
            icon: "ai-ticket"
        },
        {
            name: "Log out",
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
                            <a href={item.url}>
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