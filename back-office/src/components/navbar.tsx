import React from "react";
import {UserRequest} from "../app/@types/provider";
import {DataResponse} from "../app/@types/location";


export interface NavigationItem {
    name: string;
    url: string;
    icon: string;
    notification: boolean;
}

export interface NavbarState {
    notification: number[];
}


export class Navbar extends React.Component {

    navItems: NavigationItem[] = [
        {
            name: "Home",
            url: "/",
            icon: 'ai-home',
            notification: false
        },
        {
            name: "User",
            url: "/user",
            icon: 'ai-people-multiple',
            notification: false
        },
        {
            name: "Location",
            url: "/location",
            icon: 'ai-book-close',
            notification: true
        },
        {
            name: "Provider",
            url: "/provider",
            icon: "ai-cart",
            notification: true
        },
        {
            name: "Provider Request",
            url: "/provider-request",
            icon: "ai-calendar",
            notification: true
        },
        {
            name: "Location Occupation",
            url: "/location-occupation",
            icon: "ai-clock",
            notification: true
        },
        {
            name: "Inventory",
            url: "/inventory",
            icon: "ai-map",
            notification: false
        }
        ,
        {
            name: "Add elements",
            url: 'elements',
            icon: 'ai-planet',
            notification: false
        },
        {
            name: "Langues",
            url: "/language",
            icon: "ai-language",
            notification: false
        },
        {
            name: "Messages",
            url: "/message",
            icon: "ai-chat-bubble",
            notification: false
        },
        {
            name: "Ticket",
            url: "/ticket",
            icon: "ai-ticket",
            notification: false
        },
        {
            name: "Scrapers",
            url: "/scraper",
            icon: "ai-android-fill",
            notification: false
        },
        {
            name: "Theme",
            url: "#",
            icon: "ai-flashlight",
            notification: false
        },
        {
            name: "Log out",
            url: "/login",
            icon: "ai-lock-on",
            notification: false
        }
    ];


    constructor(pos: any) {
        super(pos);
        this.getLocationsOccupationNotification();
        this.getServicesNotification();
        this.getLocationNotification();
        if (document.cookie.includes("Theme=black")) {
            this.setLightModeCookie("white");
        }
    }

    state: NavbarState = {
        notification: Array(this.navItems.length).fill(0)
    };

    private setLightModeCookie = (currentColor = document.body.style.backgroundColor) => {
        let assignColor;

        if (currentColor === "black") {
            assignColor = "#e1e1ff";
            document.body.style.color = 'black';

        } else {
            assignColor = "black";
            document.body.style.color = '#e1e1ff';
        }
        document.body.style.backgroundColor = assignColor;

        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        const expired = "It expires in =" + date.toUTCString();
        document.cookie = "Theme=" + assignColor + " : " + expired + ";path=/";
    };

    public getLocationsOccupationNotification = async () => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        let data: UserRequest[] = await response.json();
        data = data.filter((user) => user.status === 'pending');
        const stateNotifTemp = this.state.notification;
        stateNotifTemp[4] = data.length;
        stateNotifTemp[5] = data.length;
        this.setState({notification: stateNotifTemp});
    };


    private getServicesNotification = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/service", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        const notification = data.filter((service: any) => !service.is_valid);
        const stateNotifTemp = this.state.notification;
        stateNotifTemp[3] = notification.length;
        this.setState({notification: stateNotifTemp});
    };


    private getLocationNotification = async () => {
        const apiPath = process.env.API_HOST || "http://localhost:3001";
        const response = await fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        const data = await response.json();
        const notification = data.filter((location: DataResponse) => !location.is_valid);
        const stateNotifTemp = this.state.notification;
        stateNotifTemp[2] = notification.length;
        this.setState({notification: stateNotifTemp});
    };

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
                                    this.setLightModeCookie();
                                }
                            }}>
                                <i className={item.icon}></i>
                                {
                                    item.notification ? (
                                        <div className={"notification"}>{this.state.notification[index]}</div>
                                    ) : null
                                }
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}