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
            name: 'New Bail',
            url: '/accept',
            icon: 'ai-plus'
        },
        {
            name: "Scrapers",
            url: "/scraper",
            icon: "ai-android-fill"
        },
        {
            name: "Theme",
            url: "#",
            icon: "ai-flashlight"
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
                <div className="burger" onClick={() => {
                    const burger = document.querySelector<HTMLElement>('.burger');
                    if (!burger) return;
                    const ul = document.querySelector<HTMLElement>('ul');
                    if (ul) {
                        if (ul.style.transform === "translateX(-70px)") {
                            burger.style.transform = "translateX(60px)";
                            ul.style.transform = "translateX(0)";
                        } else {
                            burger.style.transform = "translateX(0)";
                            ul.style.transform = "translateX(-70px)";
                        }
                    }

                }}>
                    <i className="ai-three-line-horizontal"></i>
                </div>
                <ul>
                    {this.navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} onClick={() => {
                                if (item.name === "Theme") {
                                    if (document.body.style.backgroundColor === "black") {
                                        document.body.style.backgroundColor = "white";
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